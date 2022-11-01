import express from "express";
import bodyParser from "body-parser";
import { User } from "../model/users.js";
import { ObjectId } from "mongodb"
import { } from "cookie-parser";
import jwt from "jsonwebtoken"
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"
import { Applicant } from "../model/applicants.js";

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const router = express.Router()

const addRole = router.put("/users/:id", roleAuthorization, async (req, res) => {
    // update another users role

    try {
        if (!req.body.role || !req.body.name) {
            res.send({ message: `Name of user & update role must be provided` })
        }
        //do id of user and name of user match to the same user?
        if (req.params.id && req.body.role && req.body.name) {
            let id = req.params.id
            let toBeUpdated = await User.findOne({ _id: id });
            if (req.body.name != toBeUpdated.name) {
                return res.send({ message: "Name and id of user do not match to an existing user!" })
            }

            if (!toBeUpdated) {
                console.log("No user found")
                res.send({ message: "No user found!" })
            }
            else {
                console.log(toBeUpdated.role)
                console.log(req.body.role)
                let updated = await toBeUpdated.updateOne({ role: req.body.role })
                return res.send({ message: `'${toBeUpdated.name}' role has been updated to '${req.body.role}'!` })
            }
        }
    } catch (err) {
        res.send({ message: err.message })
        console.log(err.message)
    }
})

const getApplicant = router.get("/applicant", roleAuthorization, async (req, res) => {
    try {
        let wantedApplicant = await Applicant.findOne({ email: req.body.email })
        res.json(wantedApplicant)
    } catch (err) {
        res.send({ message: err.message })
    }
})

const getAllApplicants = router.get("/applicants", roleAuthorization, async (req, res) => {
    try {
        let allApplicants = await Applicant.find({})
        return res.json({ applicants: allApplicants })
    } catch (err) {
        return res.send({ message: err.message })
    }
})

const queryApplicants = router.get("/", roleAuthorization, async (req, res) => {
    try {
        let { email, department } = req.query
        console.log('email here', email)
        let result = [];
        Applicant.find({ email }).populate('userId').then(function (applicants) {
            console.log('result', result)

            if (department) {
                const filteredArray = applicants.filter(x => x.userId.department === department);
                result = filteredArray;
            } else {
                result = applicants
            }
            if (result.length < 1) {
                return res.send({ message: "No Applicant found!" })
            }
            res.send({ message: result })
        })

    } catch (err) {
        res.send({ message: err.message })
    }
})



export { addRole }
export { getApplicant }
export { getAllApplicants }
export { queryApplicants }