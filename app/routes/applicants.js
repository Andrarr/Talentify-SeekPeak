import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { newApplicants } from "../controllers/applicantController.js";

const router = express.Router()

router.post("/applicants", authenticateToken, newApplicants)

export { router }