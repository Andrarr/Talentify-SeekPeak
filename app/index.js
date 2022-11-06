import bodyParser from "body-parser"
import express, { query } from "express"
import { router as depRouter } from "./routes/departments.js"
import { db } from "./config/connection.js"
import { router as userRouter } from "./routes/users.js"
//import { addRole } from "./routes/admin.js"
const app = express()
const PORT = process.env.PORT || 4000
import { roleAuthorization } from "./middleware/roleAuth.js"
import { router as refresh } from "./routes/refreshToken.js"
import {router as adminRouter} from "./routes/admin.js"
import cookieParser from 'cookie-parser'
import { user } from "./routes/super-admin.js"
//import { getApplicant } from "./routes/admin.js"
import { router as newApplicantRouter } from "./routes/applicants.js"
//import { getAllApplicants } from "./routes/admin.js"
// import { fileUpload } from "./routes/fileManaging.js"
// import { queryApplicants } from "./routes/admin.js"
//import {fileServer} from "./controllers/uploadController.js"
app.use(bodyParser.json())
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
        console.log(err.message)
        res.send({ message: "File not found!" })
    }
})

app.use(cookieParser());
app.use("/refresh-token", refresh)
app.use("/api", depRouter)
app.use("/api", userRouter)
app.use("/api", adminRouter)

app.use("/api", user)

// app.use("/api", getApplicant)
app.use("/api", newApplicantRouter);
// app.use("/upload", fileUpload)
app.use("/uploads", express.static('upload'))
app.listen(PORT, (req, res) => { console.log(`Server started on port ${PORT}`) })