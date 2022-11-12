import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { newApplicants } from "../controllers/applicantController.js";
import { examAnswers } from "../controllers/applicantController.js";
import { validation } from "../middleware/validator.js";
const router = express.Router()

router.post("/applicants", [authenticateToken, validation("applicantValidation")], newApplicants)

router.post("/exams/:id", authenticateToken, examAnswers)

export { router }