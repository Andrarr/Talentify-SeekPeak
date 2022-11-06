import express from "express";
import bodyParser from "body-parser";
import { Department } from "../model/departments.js";
import { authenticateToken } from "../middleware/authToken.js";
import { roleAuthorization } from "../middleware/roleAuth.js"

const router = express.Router()

router.post("/departments", [authenticateToken, roleAuthorization], async (req, res) => {

    if (req.body.department) {

        await Department.create(req.body)
        res.send({ message: `Department has been created!` })
        console.log(`Department has been created!`)

    }
    else {
        res.status(422).send({ message: `Department field is required!` })
    }
})

router.get("/departments", authenticateToken, (req, res) => {

    Department.find({}).then((function (department) {
        res.send(department)
    }))


})

router.get("/departments/:depId", roleAuthorization, (req, res) => {
    Department.findById({ _id: req.params.depId }).then((department) => res.send(department)).catch(err => console.log(err.message))
})

router.patch("/departments/:depId", async (req, res) => {
    try {
        await Department.findByIdAndUpdate({ _id: req.params.depId }, req.body)
        Department.findOne({ _id: req.params.depId }).then(function (department) {
            res.send(department)
            console.log(`Department with id: ${req.params.depId} has been updated!`)

        })
    } catch (err) {
        res.json({ message: err.message })
        console.log(err.message)

    }
})

router.delete("/departments/:depId", authenticateToken, async (req, res) => {
    try {
        await Department.findByIdAndRemove({ _id: req.params.depId })
        res.json({ message: `Department with id: ${req.params.depId} has been deleted!` })

    } catch (err) {
        res.json({ message: err.message })
        console.log(err.message)

    }
})

export { router }