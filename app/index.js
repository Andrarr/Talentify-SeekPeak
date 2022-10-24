import bodyParser from "body-parser"
import express from "express"
import {router} from "./routes/departments.js"
import { db } from "./config/connection.js"
const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json())

app.use("/api", router)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))