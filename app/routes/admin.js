import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { signUpAdmin, allApplicants, oneApplicant, queryApplicants, approvedApplication, filterApplicants, scoreApplicants } from "../controllers/adminActionsController.js";
import { applicantsDepartment } from "../controllers/applicantController.js";
import { queryDepartments, informApplicant } from "../controllers/examsController.js";


const router = express.Router()

router.post("/users", [authenticateToken, roleAuthorization], signUpAdmin)

router.get("/applicant", [authenticateToken, roleAuthorization], oneApplicant)

// router.get("/applicants", [authenticateToken, roleAuthorization], allApplicants)
router.get("/exams", authenticateToken, queryDepartments)

router.get("/applicants", [authenticateToken, roleAuthorization], queryApplicants)

router.post("/applicants/approve", [authenticateToken, roleAuthorization], approvedApplication)

router.get("/filter-applicants", [authenticateToken, roleAuthorization], filterApplicants)

router.get("/filter-by-department", [authenticateToken, roleAuthorization], applicantsDepartment)

router.get("/evaluateTest", [authenticateToken, roleAuthorization], scoreApplicants)

router.get("/informApplicant", [authenticateToken, roleAuthorization], informApplicant)

export { router }
