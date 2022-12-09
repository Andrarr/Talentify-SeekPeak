import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { newApplicants } from "../controllers/applicantController.js";
import { examAnswers } from "../controllers/applicantController.js";
const router = express.Router()

router.post("/applicants", authenticateToken, newApplicants)

router.post("/exams/:examId", authenticateToken, examAnswers)

export { router }