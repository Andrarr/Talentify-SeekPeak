import { ObjectId } from "mongodb";
import { ExamService } from "../services/exams.js"
import { Exam } from "../model/exams.js";
import { User } from "../model/users.js";
import { Applicant } from "../model/applicants.js";
import { Event } from "../events/events.js";

export const newExam = async (req, res, next) => {
    try {
        await ExamService.createExam(req)
        return res.send("exam has been created")
    } catch (err) {
        next(err)
    }
}

export const queryDepartments = async (req, res, next) => {
    try {
        let query = {}
        let { department } = req.query

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
    } catch (err) {
        next(err)
    }

}

export const informApplicant = async (req, res, next) => {
    try {
        let { id } = req.body

        const user = await User.findOne({ _id: ObjectId(id) })
        const applicant = await Applicant.findOne({ userId: id })
        if (applicant && applicant.approvedApplication == true) {

            let email = user.email

            Event.emit("test::ready", (email))
            return res.send({ message: "Applicant has been informed for test creation!" })
        }
        return res.send({ message: "something went wrong" })
    } catch (err) {
        next(err)
    }
}

export const oneExam = async (req, res, next) => {
    try {
        const id = req.params.id
        let exam = await ExamService.findById(id)
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
        const id = req.params.id
        let updatedExam = await ExamService.findById(id)
        return res.send({ updatedExam: "Exam has been updated " })
    } catch (err) {
        next(err)
        console.log(err)
    }
}

export const deleteExam = async (req, res, next) => {
    try {
        const id = req.params.id
        await ExamService.findById(id)
        if (!id) {
            res.send({ message: "Please specify Id of exam you wish to delete!" })
        }
        else {
            await ExamService.deleteExam(id)
            res.send({ message: "Exam has been deleted!" })
        }

    } catch (err) {
        next(err)
    }
}

export const examQuestions = async (req, res, next) => {
    try {
        let questionsOfExam = await Exam.findOne({ _id: ObjectId(req.params.id) });

        const result = {};
        for (const [key, value] of Object.entries(questionsOfExam.questions)) {
            const filtered = value
            delete filtered.rightAnswer
            result[`${key}`] = {
                ...filtered
            }
        }
        let payload = questionsOfExam;
        payload.question = result;

        return res.json({ message: payload })
    } catch (err) {
        next(err)
    }
}
