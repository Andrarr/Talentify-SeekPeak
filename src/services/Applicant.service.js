import { Applicant } from '../model/Applicants.model.js';
import { ObjectId } from 'mongodb';
import { Event } from '../events/Events.js';
import { uploader } from '../services/Upload.service.js';

import { Exam } from '../model/Exams.model.js';
import { ExamAnswers } from '../model/ExamAnswers.model.js';
import { User } from '../model/Users.model.js';
import { failure, ok } from '../utils/ServiceRespose.util.js';

export class ApplicantService {
    static findByEmail = async (email) => {
        const applicant = await Applicant.findOne({ email: email });
        if (!applicant) return failure('No Applicant was found', 404);
        return ok({ applicant });
    };

    static findById = async (id) => {
        const thisApplicant = await Applicant.findOne({ userId: id });
        if (!thisApplicant) return failure('No Applicant was found', 404);
        return ok({ thisApplicant });
    };

    static findAll = async () => {
        return await Applicant.find({});
    };

    static findByEmailAndPopulateByUser = async (email, department) => {
        return await Applicant.find({ email })
            .populate('userId')
            .then(function (applicants) {
                let result = [];

                if (department) {
                    const filteredArray = applicants.filter((x) => x.userId.department === department);
                    result = filteredArray;
                } else {
                    result = applicants;
                }
                if (result.length < 1) {
                    return [];
                }
                return result;
            });
    };

    static filterApplicants = async (query) => {
        return await Applicant.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $match: query,
            },
        ]);
    };

    static approveApplicant = async (id, isApproved) => {
        const applicant = await Applicant.findOneAndUpdate({ id: ObjectId(id) }, { approvedApplication: isApproved });
        const user = await User.findOne({ id: ObjectId(applicant.userId) });
        const { email } = user;

        if (applicant && isApproved) {
            Event.emit('approved::user', email);
            return ok('approved application email has been sent!');
        } else if (applicant && !isApproved) {
            Event.emit('declined::user', email);
            return ok('not approved application email has been sent!');
        } else {
            return failure('Wrong credentials of applicant!', 403);
        }
    };

    static createApplicant = async (data) => {
        const { userId, pathCV, pathML } = data;
        const applicant = new Applicant({
            userId,
            importedDocs: [
                {
                    document: 'cv',
                    data: pathCV,
                    contentType: 'application/pdf',
                },
                {
                    document: 'motivationalLetter',
                    data: pathML,
                    contentType: 'application/pdf',
                },
            ],
        });

        return await applicant.save();
    };

    static newApplicant = async (req) => {
        const applicantWithThisId = await ApplicantService.findById(req.auth.id);
        if (applicantWithThisId) {
            return failure({ mesage: 'This user has already applied once!' }, 403);
        } else {
            uploader(req);
            return ok('Application went successfully!');
        }
    };
    static filterByDepartment = async (department) => {
        const filteredByDepartment = await Applicant.find({ department: department });

        if (filteredByDepartment) return ok(filteredByDepartment);
        else return failure('No applicant was found related to that department!', 404);
    };

    static testEvaluation = async (id) => {
        const answersOfUser = await ExamAnswers.find({ userId: ObjectId(id) });

        const testTook = await Exam.findOne({ _id: answersOfUser[0].examId });

        const applicant = await User.findOne({ userId: ObjectId(id) });

        let applicantsAnswers = answersOfUser[0].answers;

        const correctAnswers = [];
        const givenAnswers = [];

        for (let i in testTook.questions) {
            const answersOfTest = Object.values(testTook.questions[i].rightAnswer);
            correctAnswers.push(answersOfTest.toString());
        }

        applicantsAnswers.forEach((answer) => {
            givenAnswers.push(answer.answer);
        });

        let count = 0;
        let points = 0;

        for (let p = 0; p < correctAnswers.length; p++) {
            if (correctAnswers[p] === givenAnswers[p]) {
                count++;
                break;
            }
        }

        points += count * 10;

        if (points * 0.1 >= correctAnswers.length / 2) {
            await Applicant.findOneAndUpdate({ userId: id }, { passedTest: true });
            const email = applicant.email;
            Event.emit('passedTest::true', email);
        } else {
            await Applicant.findOneAndUpdate({ userId: id }, { passedTest: false });
            const email = applicant.email;
            Event.emit('passedTest::false', email);
        }
        return ok(`This applicants result is '${points}' points `);
    };

    static queryApplicant = async (data) => {
        let query = {};
        let { email, department, gender, approvedApplication } = data;
        query = {
            ...query,
            ...{
                ...(email ? { 'user.email': email } : {}),
                ...(department ? { 'user.department': department } : {}),
                ...(gender ? { 'user.gender': gender } : {}),
                ...(approvedApplication ? { approvedApplication: Boolean(approvedApplication) } : {}),
            },
        };
        if (approvedApplication == '') {
            query = { ...query, approvedApplication: null };
        }

        const applicants = await ApplicantService.filterApplicants(query);

        if (!applicants.length) {
            return failure('No Applicant found!', 404);
        }
        return ok(applicants);
    };

    static informApplicant = async () => {
        const user = await User.findOne({ _id: ObjectId(id) });
        const applicant = await Applicant.findOne({ userId: id });
        if (applicant && applicant.approvedApplication == true) {
            const email = user.email;

            Event.emit('test::ready', email);
            return ok('Applicant has been informed for test creation!');
        } else {
            return ok(`Applicant's application has not been approved yet!`);
        }
    };
    static applicantsAnswers = async (req) => {
        const applicantAnswers = {
            userId: req.auth.id,
            examId: req.body.examId,
            answers: req.body.answers,
        };

        await ExamAnswers.create(applicantAnswers);

        return ok('Your answers have been saved!');
    };
}
