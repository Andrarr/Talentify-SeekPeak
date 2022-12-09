import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ExamService } from "../services/exams.js"
import { examSchema } from "../validation/validation.js";
import { Exam } from "../model/exams.js";
import { examAnswers } from "./applicantController.js";
import bodyParser from "body-parser";
import { User } from "../model/users.js";
import { Applicant } from "../model/applicants.js";
import { Event } from "../events/events.js";

export const newExam = async (req, res) => {
    try {
        // await examSchema.validateAsync(req.body)
        await ExamService.createExam(req)
        return res.send("exam has been created")

    } catch (e) {
        console.log(e.message)
    }
}

export const informApplicant = async (req, res) => {
    let { id } = req.body

    const user = await User.findOne({ _id: ObjectId(id) })
    const applicant = await Applicant.findOne({ userId: id })
    console.log("here" + user.email)

    console.log("aplikuesiiiii " + applicant)
    if (applicant && applicant.approvedApplication == true) {

        let email = user.email
        
        let department = user.department
        Event.emit("test::ready", (email))
        return res.send({ message: "Applicant has been informed for test creation!" })
    }
    return res.send({ message: "something went wrong" })

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

export const queryDepartments = async (req, res) => {
    let query = {}
    let { department, createdBy } = req.query

    query = {
        ...query,
        ...{
            ...department ? { departmentsId: { "$in": [ObjectId(department)] } } : {}

        }
    }

    let thisHere = await ExamService.filterExamsByDep(query)


    if (!thisHere.length) {
        return res.send({ message: "No applicant found" })
    }
    res.send({ result: thisHere })


}

export const examQuestions = async (req, res) => {
    let questionsOfExam = await Exam.findOne({ _id: ObjectId(req.params.id) }, { "questions.question1.rightAnswer": 0 })

    console.log(questionsOfExam)
    let answer = questionsOfExam.questions

    // console.log(answer[0].question1['rightAnswer'])




    return res.json({ message: questionsOfExam })
}

