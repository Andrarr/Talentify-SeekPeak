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

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // referenced user with id
    email: { type: String },
    passedTest: { type: Boolean },
    approvedApplication: { type: Boolean },
    importedDocs: {type: String}
},
    { timestamps: { createdAt: "created_at" } }
)

let Applicant = mongoose.model('Applicant', applicantsSchema)
let Document = mongoose.model("Document", documentsSchema)
export { Applicant }
export { Document }