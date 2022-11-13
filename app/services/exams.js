import { Exam } from "../model/exams.js"
import { ObjectId } from "mongodb"

export class ExamService {

    static createExam = async (req, next) => {
        try {
            let { createdBy, questions, departmentsId, rightAnswer } = req.body

            let data = departmentsId.map((dep) => {
                return ObjectId(dep)
            })

            const newExam = {
                departmentsId: data,
                createdBy: createdBy,
                questions: questions,
                rightAnswer: rightAnswer
            }

            return await Exam.create(newExam)
        }
        catch (err) {
            next(err)
        }
    }

    static findById = async (id) => {
        try {
            return await Exam.findOne({ _id: id })
        } catch (err) {
            console.log(err.message)
        }
    }
    
    static findAll = async (req, next) => {
        try {
            return await Exam.find({})
        } catch (err) {
            next(err)
        }
    }

    static updateExam = async (req, next) => {
        try {
            const { id, questions } = req.body

            return await Exam.findOneAndReplace({ _id: id }, { questions: questions })
        } catch (err) {
            next(err)
        }
    }

    static deleteExam = async (id, next) => {
        try {
            return await Exam.findOneAndRemove({ _id: id })
        } catch (err) {
            next(err)
        }

    }

    static filterExamsByDep = async (query, next) => {
        try {
            return await Exam.aggregate([

                {
                    $lookup: {
                        from: "departments",
                        localField: "departmentsId",
                        foreignField: "_id",
                        as: "departments"
                    }
                }, {
                    $match: query
                }
            ])
        } catch (err) {
            next(err)
        }
    }
}
