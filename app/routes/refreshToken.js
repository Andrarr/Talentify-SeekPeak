import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { refreshToken } from "../controllers/refreshTokenController.js";

const router = express.Router();

router.get("/", authenticateToken, refreshToken)

export { router }
