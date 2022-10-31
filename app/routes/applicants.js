import express from "express";
import bodyParser from "body-parser";
import multer from "multer"
import ObjectId from "mongoose";
import { Applicant } from "../model/applicants.js"
import { Document } from "../model/applicants.js";
import { User } from "../model/users.js";
//import { roleAuthorization } from "../middleware/roleAuth.js";
import { authenticateToken } from "../middleware/authToken.js";
//import { fileUpload } from "./fileManaging.js";
//import { file_upload } from "../middleware/fileManaging.js";
// import { upload } from "../middleware/fileManaging.js";
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const router = express.Router()

const Storage = multer.diskStorage({
    destination: "upload",
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})
//export const upload = multer({ storage: Storage })

const newApplicants = router.post("/applicants", async (req, res) => {

    try {
        if (req.body.email) {
            let registeredEmail = await User.findOne({ email: req.body.email })
            console.log(registeredEmail)
            let existsApplicant = Applicant.findOne({userId: req.body.userId})
            if(existsApplicant){
                return res.send({message: `this email has already applied`})
            }
            if (!registeredEmail) {
                return res.send({ message: "This email is not registered as a user!" })
            }
            if (registeredEmail) {
                const newApplicant = {
                    userId: req.body.userId,
                    email: req.body.email,
                    approvedApplication: req.body.approvedApplication,
                    passedTest: req.body.passedTest
                }
                Applicant.create(newApplicant)
                return res.send({ message: "Application has been sent!" })
            }
        }
    } catch (err) {
        res.send({ message: err.message })
    }
})

export { newApplicants }