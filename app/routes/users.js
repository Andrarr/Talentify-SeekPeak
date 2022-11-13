import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { signIn } from "../controllers/signInController.js";
import { signUp } from "../controllers/signUpController.js"
import { validation } from "../middleware/validator.js"
import { logOut } from "../controllers/logOutController.js"

const router = express.Router()

router.post("/sign-up", validation("signUpValidation"), signUp)

router.post("/sign-in", validation("signInValidation"), signIn)

router.post("/logout", authenticateToken, logOut)

export { router }

