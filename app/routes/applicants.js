import express from "express";
import bodyParser from "body-parser";
import multer from "multer"
import ObjectId from "mongoose";
import { Applicant } from "../model/applicants.js"
import { Document } from "../model/applicants.js";
import { User } from "../model/users.js";
import { authenticateToken } from "../middleware/authToken.js";
import { uploader } from "../controllers/uploadController.js";



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const router = express.Router()


const newApplicants = router.post("/applicants", authenticateToken, async (req, res) => {

    try {
        // console.log("from here" + req.auth)
        let applicantWithThisEmail = await Applicant.findOne({ email: req.auth.email })
        if (applicantWithThisEmail) {
            return res.json({ message: "this user has already applied" })
        } else {
            uploader(req, res)
          return res.json({message: "Application went successfullly!"})
        }
    } catch (err) {
        res.json({ message: err.message })
    }

})

export { newApplicants }