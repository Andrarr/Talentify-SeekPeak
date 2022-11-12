import { query } from "express"
import { ObjectId } from "mongodb"
import { Department } from "../model/departments.js"
import { Exam } from "../model/exams.js"

export class ExamService {

    static createExam = async (req) => {

        let { department, createdBy, questions, departmentsId, rightAnswer } = req.body

        // let data = departmentsId.map((dep) => {
        //     return ObjectId(dep)
        // })

        console.log(data);

        const newExam = {
            department: department,
            departmentsId: data,
            createdBy: createdBy,
            questions: questions, 
            rightAnswer: rightAnswer
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
    // static filterExamsByDep = async (query) => {
    //     console.log(query)
    //     return await Exam.aggregate([
    //         {
    //             $lookup: {
    //                 from: "departments",
    //                 localField: "department",
    //                 foreignField: "department",
    //                 as: "departments"
    //             }
    //         }, {
    //             $match:
    //                 query
    //         }]
    //     )
    // }

    static filterExamsByDep = async (query) => {
        return await Exam.aggregate([
            // {
            //     $match: { "departments" :"63568f9e929e75a4dc53369e"}
            // },

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
    }
}

//departments -- exams

//tags -- blogs