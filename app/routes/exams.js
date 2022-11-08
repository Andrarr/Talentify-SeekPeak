import { Exam } from "../model/exams.js";
import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { newExam, deleteExam, allExams, oneExam, updateExam } from "../controllers/examsController.js";

import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js";

const router = express.Router()

router.get("/exams", [authenticateToken, roleAuthorization], allExams);

router.get("/exam",[authenticateToken, roleAuthorization], oneExam)

router.post("/exams", [authenticateToken, roleAuthorization], newExam)

router.patch("/updateExam", [authenticateToken, roleAuthorization], updateExam)

router.delete("/deleteExam", [authenticateToken, roleAuthorization], deleteExam)
export { router }