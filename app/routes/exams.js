import { Exam } from "../model/exams.js";
import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { examSchema } from "../validation/validation.js"
import { newExam, deleteExam, allExams, oneExam, updateExam, examQuestions } from "../controllers/examsController.js";
import { validation } from '../middleware/validator.js'
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js";

const router = express.Router()

router.get("/exams", [authenticateToken, roleAuthorization], allExams);

router.get("/exam", [authenticateToken, roleAuthorization], oneExam)

router.post("/exams", [authenticateToken, roleAuthorization, validation('examSchema')], newExam)

router.patch("/updateExam", [authenticateToken, roleAuthorization], updateExam)

router.delete("/deleteExam", [authenticateToken, roleAuthorization], deleteExam)

router.get("/exam/:id", authenticateToken, examQuestions)

export { router }
