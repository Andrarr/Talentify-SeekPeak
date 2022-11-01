import mongoose from "mongoose";
import { Schema } from "mongoose";

import { ObjectId } from "mongoose";
import { User } from "./users.js";


const documentsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    cv: {
        data: Buffer,
        contentType: String
    }
    // motivationalLetter: {
    //     data:
    // }
})

const applicantsSchema = new mongoose.Schema({

    //userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    email:{type: String, ref: "User"},// referenced user with id
    passedTest: { type: Boolean, default: null },
    approvedApplication: { type: Boolean, default: null },
    importedDocs: {type: Object}
},
    { timestamps: { createdAt: "created_at" } }
)

let Applicant = mongoose.model('Applicant', applicantsSchema)
let Document = mongoose.model("Document", documentsSchema)
export { Applicant }
export { Document }