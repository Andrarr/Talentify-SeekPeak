import mongoose from "mongoose";
import { Schema } from "mongoose";

// const questionsSchema = new Schema({
//     question: String,
//     choices: JSON
// })

const examsSchema = new Schema({
    department: String,
    createdBy: String, //embedded teamLeader
    questions:  {
        type: Object,
        question: String, 
        choices: JSON
    } //embedded

})

const Exam = new mongoose.model("Exam", examsSchema)
export {  Exam }