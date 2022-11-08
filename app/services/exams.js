import { Exam } from "../model/exams.js"

export class ExamService {

    static createExam = async (req) => {
        const { department, createdBy, questions } = req.body
        console.log(questions.choices)
        const newExam = {
            department: department,
            createdBy: createdBy,
            questions: questions
        }
        return await Exam.create(newExam)
    }

    static findById = async (req) => {
        const { id } = req.body
        return await Exam.findOne({ _id: id })
    }
    static findAll = async (req) => {
        return await Exam.find({})
    }

    static updateExam = async (req) => {
        const { id, questions } = req.body

        return await Exam.findOneAndReplace({ _id: id }, { questions: questions })
    }

    static deleteExam = async (id) => {
        return await Exam.findOneAndRemove({ _id: id })

    }
}