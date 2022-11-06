import express, { response } from "express";
import bodyParser from "body-parser";
import { User } from "../model/users.js";
import bcrypt, { hash } from "bcrypt"
import dotenv from 'dotenv';
import { } from "cookie-parser";
import jwt from "jsonwebtoken"
import { authenticateToken } from '../middleware/authToken.js'
import { roleAuthorization } from "../middleware/roleAuth.js"
import { body, validationResult } from "express-validator"

dotenv.config();

const router = express.Router()

const createAccessToken = (id) => {
    return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '2 days'
    })
}
router.post("/sign-up", body("email").isEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        // const emailRegEx = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
        const errors = validationResult(req)
        const { email, name, surname, birthday, country, gender, password, confirmPassword, department } = req.body

        if (!errors.isEmpty() && errors.errors[0].param == "email") {
          return  res.status(400).send("Invalid email Address. Try again!")
        }
        else if (!errors.isEmpty() && errors.errors[0].param == "password") {
           return res.status(400).send("Password must be longer than 6 characters")
        }
        if (password !== confirmPassword) {
           return res.send("Passwords do not match!")
        }

        // let valid = emailRegEx.test(email)
        // if (!valid) {
        //     return res.send("Invalid email format!")
        // }
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
    } catch (err) {
       return res.send({message: err.message})
    }
}
)

router.post("/sign-in",  async (req, res) => {
    try {
        const { email, password } = req.body
        const foundUser = await User.findOne({ email })

        if (foundUser == undefined) {
           return res.send(`You are not registered!`)
        }
        if (!req.body.email || !req.body.password) {
           return  res.send(`Email and Password are required!`)
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
        res.send(err.message)
        console.log(err.message)
    }

})

router.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.json({ message: `Logged out successfully!` })
})



export { router }