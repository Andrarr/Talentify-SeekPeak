import { UserService } from '../services/userService.js'
import { ApplicantService } from '../services/applicant.js'

export const updateRole = async (req, res) => {
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
            return res.send({ message: `'${user.name}' role has been updated to '${req.body.role}'!` })
        }
    }

}

export const oneApplicant = async (req, res) => {
    let applicant = await ApplicantService.findByEmail(req.body.email)
    return res.json(applicant)
}

export const allApplicants = async (req, res) => {
    let allApplicants = await ApplicantService.findAll()
    return res.json({ applicants: allApplicants })
}

export const queryApplicants = async (req, res) => {
    let { email, department } = req.query
    const applicants = await ApplicantService.findByEmailAndPopulateByUser(email, department);
    if (!applicants.length) {
        return res.send({ message: "No Applicant found!" })
    }

    return res.send({ applicants })
}

export const approvedApplication = async (req, res) => {
    const { _id, isApproved } = req.body;

    const thisApplicant = await ApplicantService.findByIdAndUpdateApproved(_id, isApproved);

    if (thisApplicant && isApproved) {
        return res.send({ message: "approved application email has been sent!" })
    } else if (thisApplicant && !isApproved) {
        return res.send({ message: "not approved application email has been sent!" })
    } else {
        return res.json({ message: "Wrong credentials of applicant!" })
    }
}