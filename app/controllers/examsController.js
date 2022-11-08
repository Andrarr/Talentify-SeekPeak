import mongoose from "mongoose";
import { ExamService } from "../services/exams.js"

import { Exam } from "../model/exams.js";

export const newExam = async (req, res) => {
    try {
        ExamService.createExam(req)
        return res.send("exam has been created")
    } catch (e) {
        console.log(e.message)
    }
}

export const oneExam = async (req, res, next) => {
    try {
        let exam = await ExamService.findById(req)
        return res.send({ message: exam })
    } catch (err) {
        next(err)
    }
}

export const allExams = async (req, res, next) => {
    try {
        let allExams = await ExamService.findAll()
        return res.send({ message: allExams })
    } catch (err) {
        next(err)
    }
}

export const updateExam = async (req, res, next) => {
    try {
        await ExamService.updateExam(req)
        let updatedExam = await ExamService.findById(req)
        return res.send({ updatedExam: updatedExam })
    } catch (err) {
        next(err)
        console.log(err)
    }
}

export const deleteExam = async (req, res, next) => {
    try {
        const { id } = req.body
        let exists = await ExamService.findById(req)
        if (!id) {
            res.send({ message: "Please specify Id of exam you wish to delete!" })
        }
        if (!exists) {
            res.send({ message: "There is no record of that exam" })
        }
        else {
            await ExamService.deleteExam(id)
            res.send({ message: "Exam has been deleted!" })
        }

    } catch (err) {
        next(err)
        console.log(err.message)
    }
}
