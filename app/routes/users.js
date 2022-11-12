import express from "express";
import bodyParser from "body-parser";

import bcrypt from "bcrypt"

import { signUpValidation } from "../validation/validation.js"
import { authenticateToken } from "../middleware/authToken.js";
import { signIn } from "../controllers/signInController.js";
import { signUp } from "../controllers/signUpController.js"
import { logOut } from "../controllers/logOutController.js"

 //TODO: validation in form of middleware


const router = express.Router()

router.post("/sign-up", signUp)

router.post("/sign-in", signIn)

router.post("/logout", authenticateToken, logOut)

export { router }

