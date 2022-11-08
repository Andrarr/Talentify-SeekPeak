import mongoose from "mongoose"
import { uploader } from "../controllers/uploadController.js";
import { ApplicantService } from "../services/applicant.js";

export const newApplicants = async function (req, res) {
    let applicantWithThisEmail = await ApplicantService.findByEmail(req.auth.email)
    console.log("sent applicant: " + applicantWithThisEmail)
    if (applicantWithThisEmail) {
        return res.json({ message: "This user has already applied once!" })
    } else {
        uploader(req, res)
        return res.json({ message: "Application went successfully!" })
    }
}
