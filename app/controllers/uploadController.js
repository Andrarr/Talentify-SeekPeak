import express from "express";
import bodyParser from "body-parser";
// import {uuid} from "uuidv4"
import { v4 as uuidv4 } from "uuid"
import fs from "fs"
import multer from "multer"
import { Applicant, Document } from "../model/applicants.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authToken.js";
import nodestatic from "node-static"

//export let fileServer = new nodestatic.Server('./upload');



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
    try {

        upload(req, res, async (err) => {
            const applicant = new Applicant(
                {
                    email: req.auth.email,
                    name: req.body.name,
                    importedDocs: [{
                        document: "cv",
                        data: req.files[0].path,
                        contentType: "application/pdf"
                    },
                    {
                        document: "motivationalLetter",
                        data: req.files[1].path,
                        contentType: "application/pdf"

                    }]
                })

            await applicant.save()
        }) 
    } catch (err) {
            console.log(err.message)
            return res.sendStatus().send({message: err.message})
        }
}