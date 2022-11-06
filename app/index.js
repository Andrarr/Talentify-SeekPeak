import bodyParser from "body-parser"
import express, { query } from "express"
import { router as depRouter } from "./routes/departments.js"
import { router as userRouter } from "./routes/users.js"
import { router as refresh } from "./routes/refreshToken.js"
import { router as applicantRouter } from "./routes/applicants.js"
import { user } from "./routes/super-admin.js"
import { router as adminRouter } from "./routes/admin.js"
const app = express()
const PORT = process.env.PORT || 4000
import cookieParser from "cookie-parser"
import { errorHandler } from "./middleware/errorHandler.js"
import { db } from "./config/connection.js"
import * as eventIndex from "./events/index.js"

app.use(bodyParser.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/uploads', express.static('uploads'))
app.get("/uploads/:img", (req, res) => {
    const { img } = req.params;
    try {
        res.render(img)
    }
    catch (err) {
        throw { message: "File not found!" }
    }
})

app.use(cookieParser());
app.use("/refresh-token", refresh)
app.use("/api", depRouter)
app.use("/api", userRouter)
app.use("/api", applicantRouter)
app.use("/api", user)
app.use("/api", adminRouter)
app.use("/uploads", express.static('upload'))

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })