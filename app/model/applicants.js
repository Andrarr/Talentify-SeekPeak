import mongoose, { mongo } from "mongoose";


const documentsSchema = new mongoose.Schema({
    cv: String, //file name
    motivationalLetter: String
})

const applicantsSchema = new mongoose.Schema({
    passedTest: Boolean,
    approvedApplication: Boolean,
    importedDocs: documentsSchema
})

let Applicant = mongoose.model('Applicant', applicantsSchema)

export default Applicant