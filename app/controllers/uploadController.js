import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import multer from "multer"
import { Applicant, Document } from "../model/applicants.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authToken.js";
import nodestatic from "node-static"
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