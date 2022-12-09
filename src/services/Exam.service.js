import { Exam } from '../model/Exams.model.js';
import { ObjectId } from 'mongodb';
import { ok, failure } from '../utils/ServiceRespose.util.js';

export class ExamService {
    static createExam = async (req, next) => {
        try {
            const { createdBy, questions, departmentsId, rightAnswer } = req.body;
            const data = departmentsId.map((dep) => {
                return ObjectId(dep);
            });

            const newExam = {
                departmentsId: data,
                createdBy: createdBy,
                questions: questions,
                rightAnswer: rightAnswer,
            };

            await Exam.create(newExam);
            return ok('Exam has been created');
        } catch (err) {
            next(err);
        }
    };

    static findById = async (id, next) => {
        try {
            return ok(await Exam.findOne({ _id: id }));
        } catch (err) {
            next(err);
        }
    };

    static findAll = async (next) => {
        try {
            const result = await Exam.find({});
            return ok(result);
        } catch (err) {
            next(err);
        }
    };

    static updateExam = async (req, next) => {
        try {
            const { id } = req.params;
            const { questions } = req.body;
            await Exam.findOneAndReplace({ _id: id }, { questions: questions });

            return ok('Exam has been updated ');
        } catch (err) {
            next(err);
        }
    };

    static deleteExam = async (id, next) => {
        try {
            if (!id) {
                return failure('Please specify Id of exam you wish to delete!', 400);
            } else {
                await Exam.findOneAndRemove({ _id: id });
                return ok('Exam has been deleted!');
            }
        } catch (err) {
            next(err);
        }
    };

    static filterExamsByDep = async (query, next) => {
        try {
            const exams = await Exam.aggregate([
                {
                    $lookup: {
                        from: 'departments',
                        localField: 'departmentsId',
                        foreignField: '_id',
                        as: 'departments',
                    },
                },
                {
                    $match: query,
                },
            ]);
            return ok(exams);
        } catch (err) {
            next(err);
        }
    };
    static queryExam = async (req, next) => {
        let query = {};
        const { department } = req.query;

        query = {
            ...query,
            ...{
                ...(department ? { departmentsId: { $in: [ObjectId(department)] } } : {}),
            },
        };

        const filteredExams = await ExamService.filterExamsByDep(query);

        if (!filteredExams.length) {
            return failure('No applicant found', 404);
        }
        return ok(filteredExams);
    };
    static getExamQuestions = async (req) => {
        const questionsOfExam = await Exam.findOne({ _id: ObjectId(req.params.id) });

        const result = {};
        for (const [key, value] of Object.entries(questionsOfExam.questions)) {
            const filtered = value;
            delete filtered.rightAnswer;
            result[`${key}`] = {
                ...filtered,
            };
        }

        let allQuestions = questionsOfExam;
        allQuestions.question = result;

        return ok(allQuestions);
    };
}
