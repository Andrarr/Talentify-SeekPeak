import express from "express";
import bodyParser from "body-parser";
import { Department } from "../model/departments.js";
import { authenticateToken } from "../middleware/authToken.js";
import { roleSuperAdmin } from "../middleware/roleAuth.js"
import { User } from "../model/users.js";
const router = express.Router()

export const newTeamLeader = router.post("/super-admin", [authenticateToken, roleSuperAdmin], async (req, res) => {

    let teamLead = {
        name: req.body.name,
        role: req.body.role
    }
    // to create a CTO or teamLeader as a USER model, the 'required' fields of creating a user are needed
    await User.create(teamLead)
    res.send({message:"team-leader has been created"})
})



