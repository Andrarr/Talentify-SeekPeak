import { User } from "../model/users.js";
import { Applicant } from "../model/applicants.js";
import { ObjectId } from "mongodb";

export const updateRole = async (req, res) => {
    try {
        if (!req.body.role || !req.body.name) {
            res.send({ message: `Name of user & update role must be provided` })
        }
        if (req.params.id && req.body.role && req.body.name) {
            let id = req.params.id
            let toBeUpdated = await User.findOne({ _id: id });
            if (req.body.name != toBeUpdated.name) {
                return res.send({ message: "Name and id of user do not match to an existing user!" })
            }
            if (!toBeUpdated) {
                console.log("No user found")
                res.send({ message: "No user found!" })
            }
            else {
                console.log(toBeUpdated.role)
                console.log(req.body.role)
                let updated = await toBeUpdated.updateOne({ role: req.body.role })
                return res.send({ message: `'${toBeUpdated.name}' role has been updated to '${req.body.role}'!` })
            }
        }
    } catch (err) {
        res.send({ message: err.message })
        console.log(err.message)
    }
}

export const oneApplicant = async (req, res) => {
    try {
        let wantedApplicant = await Applicant.findOne({ email: req.body.email })
        res.json(wantedApplicant)
    } catch (err) {
        res.send({ message: err.message })
    }
}

export const allApplicants = async (req, res) => {
    try {
        let allApplicants = await Applicant.find({})
        return res.json({ applicants: allApplicants })
    } catch (err) {
        return res.send({ message: err.message })
    }
}

export const queryApplicants = async (req, res) => {
    try {
        let { email, department } = req.query
        console.log('email here', email)

        let result = [];
        Applicant.find({ email }).populate('email').then(function (applicants) {
            console.log('result', result)

            if (department) {
                const filteredArray = applicants.filter(x => x.email.department === department);
                result = filteredArray;
                console.log(filteredArray)

                let applicantWithThisEmail = Applicant.findOne({ email: req.auth.email })
                console.log(applicantWithThisEmail)
                let usersDepartment = User.findOne({ email: applicantWithThisEmail.email })
                console.log(usersDepartment.department)
            } else {
                result = applicants
            }
            if (result.length < 1) {
                return res.send({ message: "No Applicant found!" })
            }
            res.send({ message: result })
        })
    } catch (err) {
        console.log(err)
        res.send({ message: err.message })
    }
}

export const approvedApplication = async (req, res) => {
    try {
        let thisApplicant = await Applicant.findOne({ _id: ObjectId(req.body._id) })

        if (thisApplicant) {
            let approved = await thisApplicant.updateOne({ approvedApplication: req.body.isApproved })
            return res.send({ message: thisApplicant })
        }
    } catch (err) {
        res.send({ message: err.message })
        console.log(err.message)
    }

}