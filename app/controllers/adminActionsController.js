import { UserService } from "../services/userService.js"
import { ApplicantService } from "../services/applicant.js"
import { Applicant } from "../model/applicants.js"
import bcrypt from "bcrypt"
import { User } from "../model/users.js"
import jwt from "jsonwebtoken"
import { examAnswers } from "./applicantController.js"
import { ExamAnswers } from "../model/examAnswers.js"
import { Exam } from "../model/exams.js"
import { Event } from "../events/events.js"
import { passed, failed } from "../events/testResult.event.js"

import { ObjectId } from "mongodb"

export const updateRole = async (req, res, next) => {
    try {
        if (!req.body.role || !req.body.name) {
            res.send({ message: `Name of user & update role must be provided` })
        }
        if (req.params.id && req.body.role && req.body.name) {
            let id = req.params.id

            let user = await UserService.findUserById(id);

            if (req.body.name != user.name) {
                return res.send({ message: "Name and id of user do not match to an existing user!" })
            }
            if (!user) {
                console.log("No user found")
                res.send({ message: "No user found!" })
            }
            else {
                await UserService.updateUserRole(req.body.role)
                return res.send({ message: `"${user.name}" role has been updated to "${req.body.role}"!` })
            }
        }
    } catch (err) {
        next(err)
    }
}

export const createAdmin = async (req, res, next) => {
    try {
        const createAccessToken = (id) => {
            return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
                expiresIn: "1d"
            })
        }
        const salt = await bcrypt.genSalt()
        const { email, name, surname, birthday, country, gender, password, "confirm-password": confirmPassword, department, role } = req.body
        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt)

        const adminRegistered = {
            email: email,
            name: name,
            surname: surname,
            birthday: birthday,
            country: country,
            gender: gender,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            department: department,
            role: role
        }

        const admin = await User.create(adminRegistered)

        const token = createAccessToken(admin._id)

        return res.send({ message: "A team-leader has been created" })
    } catch (e) {
        next(e)
    }
}

export const oneApplicant = async (req, res, next) => {
    try {
        let applicant = await ApplicantService.findByEmail(req.body.email)
        return res.json(applicant)
    } catch (err) {
        next(err)
    }
}

export const allApplicants = async (req, res, next) => {
    try {
        let allApplicants = await ApplicantService.findAll()
        return res.json({ applicants: allApplicants })
    } catch (err) {
        next(err)
    }
}

export const queryApplicants = async (req, res, next) => {
    try {
        let query = {}
        let { email, department, gender, approvedApplication } = req.query
        query = {
            ...query,
            ...{
                ...email ? { "user.email": email } : {},
                ...department ? { "user.department": department } : {},
                ...gender ? { "user.gender": gender } : {},
                ...approvedApplication ? { approvedApplication: Boolean(approvedApplication) } : {}
            }
        }
        if (approvedApplication == "") {
            query = { ...query, approvedApplication: null }
        }

        const applicants = await ApplicantService.filterApplicants(query);

        if (!applicants.length) {
            return res.send({ message: "No Applicant found!" })
        }
        return res.send({ applicants })
    } catch (err) {
        next(err)
    }
}

export const approvedApplication = async (req, res, next) => {
    try {

        const { id, isApproved } = req.body;

        const thisApplicant = await ApplicantService.findByIdAndUpdateApproved(id, isApproved);

        if (thisApplicant && isApproved) {
            return res.send({ message: "approved application email has been sent!" })
        } else if (thisApplicant && !isApproved) {
            return res.send({ message: "not approved application email has been sent!" })
        } else {
            return res.json({ message: "Wrong credentials of applicant!" })
        }
    } catch (err) {
        next(err)
    }
}

export const scoreApplicants = async (req, res, next) => {
    try {
        let { id } = req.body

        let answersOfUser = await ExamAnswers.find({ userId: ObjectId(id) })

        let testTook = await Exam.findOne({ _id: answersOfUser[0].examId })

        let applicant = await User.findOne({ userId: ObjectId(id) })

        let applicantsAnswers = answersOfUser[0].answers

        let correctAnswers = [];
        let givenAnswers = [];

        for (let i in testTook.questions) {
            const answersOfTest = Object.values(testTook.questions[i].rightAnswer)
            correctAnswers.push(answersOfTest.toString())
        }

        applicantsAnswers.forEach(answer => {
            givenAnswers.push(answer.answer)
        });

        let count = 0;
        let points = 0;

        for (let p = 0; p < correctAnswers.length; p++) {
            if (correctAnswers[p] === givenAnswers[p]) {
                count++
                break;
            }
        }

        points += count * 10

        if ((points * 0.1) >= ((correctAnswers.length) / 2)) {
            await Applicant.findOneAndUpdate({ userId: req.body.id }, { passedTest: true })
            let email = applicant.email
            Event.emit("passedTest::true", (email))
        }
        else {
            await Applicant.findOneAndUpdate({ userId: req.body.id }, { passedTest: false })
            let email = applicant.email
            console.log(email)
            Event.emit("passedTest::false", (email))
        }
        return res.send({ message: `This applicants result is '${points}' points ` })
    } catch (err) {
        next(err)
    }
}
