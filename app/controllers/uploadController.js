import { v4 as uuidv4 } from "uuid"
import multer from "multer"
import { ApplicantService } from "../services/applicant.js";

export const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        callback(null, uuidv4() + ".jpg")
    }
})

export const upload = multer({
    storage: Storage
}).array('document', 2)

export const uploader = function (req, res) {
    upload(req, res, async (err) => {
        await ApplicantService.createApplicant({
            email: req.auth.email,
            name: req.body.name,
            pathCV: req.files[0].path,
            pathML: req.files[1].path,
            userId: req.body.userId
        })
    })
}
