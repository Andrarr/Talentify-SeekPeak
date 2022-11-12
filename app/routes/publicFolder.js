import express from "express"
import { uploadsFolder } from "../controllers/publicFolderController.js"
const router = express.Router()

router.get("./uploads/:image", uploadsFolder)
export { router }
