import express, { response } from "express";
import bodyParser from "body-parser";
import { User } from "../model/users.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

import { signUpValidationSchema } from "../validation/validation.js"

dotenv.config();

const router = express.Router()

const createAccessToken = (id) => {
    return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '2 days'
    })
}
router.post("/sign-up", async (req, res, next) => {
    try {

        const result = await signUpValidationSchema.validateAsync(req.body)
        console.log(result)
        const salt = await bcrypt.genSalt()
  
        const { email, name, surname, birthday, country, gender, password, confirmPassword, department } = req.body

        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt)

        const userRegistered = {
            email: email,
            name: name,
            surname: surname,
            birthday: birthday,
            country: country,
            gender: gender,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            department: department
        }

        const foundUser = await User.create(userRegistered)

        const token = createAccessToken(foundUser._id)

        return res.send({ jwt: token })
    } catch (e) {
        next(e)
    }
})

router.post("/sign-in", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ email })

        if (foundUser == undefined) {
            return res.send(`You are not registered!`)
        }
        if (!req.body.email || !req.body.password) {
            return res.send(`Email and Password are required!`)
        }
        if (await bcrypt.compare(password, foundUser.password)) {
            const roles = Object.values(foundUser.role)

            const token = createAccessToken(foundUser._id)
            // const refreshToken = createRefreshToken(foundUser._id)
            // res.cookie('jwt', token, { httpOnly: false, maxAge: 10000 * 100 })
            //res.cookie('jwtt', refreshToken, {httpOnly: true, maxAge: 24 * 60  * 60 * 1000})
            return res.send({ jwt: token })

        }
    } catch (err) {
        next(err)
        // console.log("look this " +err )
    }

})

router.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.json({ message: `Logged out successfully!` })
})



export { router }