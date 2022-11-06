import express from "express";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb"
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { updateRole, allApplicants, oneApplicant, queryApplicants, approvedApplication } from "../controllers/adminActionsController.js";


const router = express.Router()


router.put("/users/:id", [authenticateToken, roleAuthorization], updateRole)

router.get("/applicant", [authenticateToken, roleAuthorization], oneApplicant)

router.get("/applicants", [authenticateToken, roleAuthorization], allApplicants)

router.get("/query", [authenticateToken, roleAuthorization], queryApplicants )

router.post("/applicants/approve", [authenticateToken, roleAuthorization], approvedApplication)

export {router}