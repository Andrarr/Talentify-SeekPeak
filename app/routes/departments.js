import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { allDepartments, createDepartments, deleteDepartment, oneDepartment, updateDepartment } from "../controllers/departmentController.js";
import { validation } from "../middleware/validator.js";


const router = express.Router()

router.post("/departments", [authenticateToken, roleAuthorization, validation("departmentValidation")], createDepartments)

router.get("/departments", authenticateToken, allDepartments)

router.get("/departments/:depId", authenticateToken, oneDepartment)

router.patch("/departments/:depId", [authenticateToken, roleAuthorization, validation("departmentUpdateValidation")], updateDepartment)

router.delete("/departments/:depId", [authenticateToken, roleAuthorization], deleteDepartment)

export { router }
