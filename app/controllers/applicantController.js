import mongoose from "mongoose"
import { Applicant } from "../model/applicants.js"
import { uploader } from "../controllers/uploadController.js";


export const newApplicants = async function (req, res) {
    try {

        let applicantWithThisEmail = await Applicant.findOne({ email: req.auth.email })
        console.log("sent applicant: "+ applicantWithThisEmail)
        if (applicantWithThisEmail) {
            return res.json({ message: "This user has already applied once!" })
        } else {
            uploader(req, res)
            return res.json({ message: "Application went successfully!" })
        }
    } catch (err) {
        res.json({ message: err.message })
    }
}



