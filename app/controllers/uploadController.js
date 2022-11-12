import { v4 as uuidv4 } from "uuid"
import multer from "multer"
import { ApplicantService } from "../services/applicant.js";

export const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
        callback(null, uuidv4())
        req.body = file
    }
})

export const upload = multer({
    storage: Storage,
    filefilter: (req, file, callback) => {
        if (file.mimetype == "application/pdf", file.mimetype == "application/x-pdf", file.mimetype == "application/msword", file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            callback(null, true)
        }
        if (file.mimetype == "image/png") {
            callback(null, false);
            return cb(new Error("Invalid upload: fieldname should be different type! "));
        }
    }
}).array("document", 2)

//  .fields([{ name: "cv", maxCount: 1 },
// { name: "motivationalLetter", maxCount: 1 }
// ])

export const uploader = async function (req, res, next) {
    try {
        upload(req, res, async (err) => {
            console.log(req.body);


            await ApplicantService.createApplicant({
                userId: req.auth.id,
                pathCV: req.files[0].path,
                pathML: req.files[1].path
            })
        })
    } catch (err) {
        next(err)
    }
}
