import bodyParser from "body-parser"
import express from "express"
import {router as depRouter} from "./routes/departments.js"
import { db } from "./config/connection.js"
import {router as userRouter} from "./routes/users.js"
import {addRole } from "./routes/admin.js"
const app = express()
const PORT = process.env.PORT || 4000
import { roleAuthorization } from "./middleware/roleAuth.js"
import {router as refresh} from "./routes/refreshToken.js"
import cookieParser  from 'cookie-parser'

app.use(bodyParser.json())

app.use(cookieParser());
app.use("/refresh-token", refresh)
app.use("/api", depRouter)
app.use("/api", userRouter)
app.use("/api", addRole)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))