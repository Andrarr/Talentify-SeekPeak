import { uploader } from "./uploadController.js";
import { ApplicantService } from "../services/applicant.js";
import { ExamAnswers } from "../model/examAnswers.js";

export const newApplicants = async (req, res, next) => {
    try {
        let applicantWithThisId = await ApplicantService.findById(req.auth.id)

        if (applicantWithThisId) {
            return res.json({ message: "This user has already applied once!" })
        } else {
            uploader(req, res)
            return res.json({ message: "Application went successfully!" })
        }
    } catch (err) {
        next(err)
    }
}

export const applicantsDepartment = async (req, res, next) => {
    try {
        let filteredByDepartment = await ApplicantService.filterByDepartment(req.body.department)

        if (filteredByDepartment) {
            res.send({ message: filteredByDepartment })
        }
        else {
            res.send({ message: "No applicant was found related to that department!" })
        }
    } catch (err) {
        next(err)
    }
}

export const examAnswers = async (req, res, next) => {
    try {
        let applicantAnswers = {
            userId: req.auth.id,
            examId: req.body.examId,
            answers: req.body.answers
        }

        await ExamAnswers.create(applicantAnswers)
        return res.json({ message: "Your answers have been saved!" })
    } catch (err) {
        next(err)
    }
}
