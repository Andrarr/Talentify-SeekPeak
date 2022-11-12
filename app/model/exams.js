import mongoose, { Schema } from "mongoose";

const examsSchema = new Schema({
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    departmentsId: [],
    createdBy: String,
    type: Object,
    questions: {
        type: Object,
        question: {
            type: Object,
            questionNr: Number,
            question: String,
            choices: Object,
            rightAnswer: String
        }
    }
})

const Exam = new mongoose.model("Exam", examsSchema)
export { Exam }
