import mongoose, { Schema } from "mongoose";

const examsAnswersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    examId: { type: Schema.Types.ObjectId, ref: "Exam" },
    answers: [{
        questionNr: Number,
        answer: String
    }]

})

const ExamAnswers = new mongoose.model("ExamAnswers", examsAnswersSchema)
export { ExamAnswers }
