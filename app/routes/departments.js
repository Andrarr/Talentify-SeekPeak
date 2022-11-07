import express from "express";
import bodyParser from "body-parser";
import { Department } from "../model/departments.js";
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { allDepartments, createDepartments, deleteDepartment, oneDepartment, updateDepartment } from "../controllers/departmentController.js";

const router = express.Router()

router.post("/departments", [authenticateToken, roleAuthorization], createDepartments)

router.get("/departments", authenticateToken, allDepartments)

router.get("/departments/:depId", roleAuthorization, oneDepartment)

router.patch("/departments/:depId", updateDepartment)

router.delete("/departments/:depId", authenticateToken, roleAuthorization, deleteDepartment)

export { router }