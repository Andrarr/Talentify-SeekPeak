import bodyParser from "body-parser"
import express from "express"
import { router as depRouter } from "./routes/departments.js"
import { router as userRouter } from "./routes/users.js"
import { router as refresh } from "./routes/refreshToken.js"
import { router as applicantRouter } from "./routes/applicants.js"
import { router as adminRouter } from "./routes/admin.js"
import { router as examsRouter } from "./routes/exams.js"
import { router as publicRouter } from "./routes/publicFolder.js"
const app = express()
import { db } from "./config/connection.js"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.js"
import * as eventIndex from "./events/index.js"
import dotenv from "dotenv"

dotenv.config()
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/uploads", express.static("uploads"))
app.get("/public", publicRouter)


app.use("/refresh-token", refresh)
app.use("/api", depRouter)
app.use("/api", userRouter)
app.use("/api", applicantRouter)
app.use("/api", adminRouter)
app.use("/api", examsRouter)
app.get("/public", publicRouter)
app.use("/uploads", express.static("upload"))

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Server started on port ${PORT} `) })
