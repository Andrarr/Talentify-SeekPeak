import mongoose from "mongoose";


const questionsSchema = new mongoose.Schema({
    question: String,
    choices: JSON
})

const testSchema = new mongoose.Schema({
    department: String,
    createdBy: String, //embedded teamLeader
    questions: questionsSchema //embedded

})