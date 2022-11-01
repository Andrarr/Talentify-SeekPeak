import express from "express"
import mongoose from "mongoose"
import { Applicant } from "../model/applicants.js"
import { newApplicants } from "../routes/applicants.js"
import { uploader } from "../controllers/uploadController.js"

const approveApplicant = async (req, res, next) => {

    try {
    
    } catch (err) {
        res.send({
            message: err.message
        })
    }

}
