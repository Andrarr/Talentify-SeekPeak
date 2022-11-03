import express from "express";
import bodyParser from "body-parser";
import { Department } from "../model/departments.js";
import { authenticateToken } from "../middleware/authToken.js";
import { roleSuperAdmin } from "../middleware/roleAuth.js"
import { User } from "../model/users.js";

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//can manage teamLeaders, in future phases of the project
const router = express.Router()
let user = router.post("/super-admin", roleSuperAdmin, async (req, res) => {

    let teamLeadToBe = {
        name: req.body.name,
        role: req.body.role
    }
    // to create a CTO or teamLeader as a USER model, the 'required' fields of sign up as user had to be commented
    await User.create(teamLeadToBe)
    res.send({message:"team-leader has been created"})
})
 export { user }


