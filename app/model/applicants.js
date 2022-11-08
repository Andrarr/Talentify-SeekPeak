import mongoose from "mongoose";
import { Schema } from "mongoose";

const documentsSchema = new Schema({
    name: {
        type: String
    },
    cv: {
        data: Buffer,
        contentType: String
    }})

const applicantsSchema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: "User" }, 
    email: { type: String },// referenced user with id
    passedTest: { type: Boolean, default: null },
    approvedApplication: { type: Boolean, default: null },
    importedDocs: { type: Object }
},
    { timestamps: { createdAt: "created_at" } }
)

let Applicant = mongoose.model('Applicant', applicantsSchema)
let Document = mongoose.model("Document", documentsSchema)
export { Applicant }
export { Document }