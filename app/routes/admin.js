import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { signUpAdmin, oneApplicant, queryApplicants, approvedApplication, scoreApplicants } from "../controllers/adminActionsController.js";
import { applicantsDepartment } from "../controllers/applicantController.js";
import { queryDepartments, informApplicant } from "../controllers/examsController.js";
import { validation } from "../middleware/validator.js";


const router = express.Router()

router.post("/users", [authenticateToken, roleAuthorization, validation("signUpAdminValidation")], signUpAdmin)

router.get("/applicant", [authenticateToken, roleAuthorization], oneApplicant)

router.get("/exams", authenticateToken, queryDepartments)

router.get("/applicants", [authenticateToken, roleAuthorization], queryApplicants)

router.post("/applicants/approve", [authenticateToken, roleAuthorization, validation("approvedApplication")], approvedApplication)

router.get("/applicants", [authenticateToken, roleAuthorization], applicantsDepartment)

router.get("/evaluate-test", [authenticateToken, roleAuthorization], scoreApplicants)

router.get("/inform-applicant", [authenticateToken, roleAuthorization], informApplicant)

export { router }
