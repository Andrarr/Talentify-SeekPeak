import bodyParser from "body-parser"
import express, { query } from "express"
import { router as depRouter } from "./routes/departments.js"
import { db } from "./config/connection.js"
import { router as userRouter } from "./routes/users.js"
const app = express()
const PORT = process.env.PORT || 4000
import { roleAuthorization } from "./middleware/roleAuth.js"
import { router as refresh } from "./routes/refreshToken.js"
import { router as applicantRouter } from "./routes/applicants.js"
import { user } from "./routes/super-admin.js"
import { router as adminRouter } from "./routes/admin.js"
// import { fileUpload } from "./routes/fileManaging.js"
// import { router as mailRouter } from "./routes/emails.js"

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
        console.log(err.message)
        res.send({ message: "File not found!" })
    }
})

app.use("/refresh-token", refresh)
app.use("/api", depRouter)
app.use("/api", userRouter)
app.use("/api", applicantRouter)
app.use("/api", user)
app.use("/api", adminRouter)
// app.use("/api", getAllApplicants)
// app.use("/upload", fileUpload)
// app.use("/api", mailRouter)

app.use("/uploads", express.static('upload'))



app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })