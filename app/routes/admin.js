import express from "express";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb"
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { updateRole, allApplicants, oneApplicant, queryApplicants, approvedApplication } from "../controllers/adminActionsController.js";


const router = express.Router()

//const addRole = 
router.put("/users/:id", authenticateToken, roleAuthorization, updateRole)

//const getApplicant = 
router.get("/applicant", authenticateToken, roleAuthorization, oneApplicant)

//const getAllApplicants = 
router.get("/applicants", authenticateToken, roleAuthorization, allApplicants)

//const queryApplicants = 
router.get("/query", authenticateToken, roleAuthorization, queryApplicants )


router.post("/applicants/approve", authenticateToken, roleAuthorization, approvedApplication)

export {router}