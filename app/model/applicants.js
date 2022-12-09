import mongoose, { Schema } from "mongoose"

const applicantsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    passedTest: { type: Boolean, default: null },
    approvedApplication: { type: Boolean, default: null },
    importedDocs: { type: Object }
},
    { timestamps: { createdAt: "created_at" } }
)

let Applicant = mongoose.model('Applicant', applicantsSchema)
export { Applicant }

