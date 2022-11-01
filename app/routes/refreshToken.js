import express from "express";
const router = express.Router()
import jwt from "jsonwebtoken";
import { User } from "../model/users.js";
import { authenticateToken } from "../middleware/authToken.js";



const createRefreshToken = (id) => {
    return jwt.sign({ id }, `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: '1d' })
}
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { email } = req.body
        const foundUser =  await User.findOne({ email: email })
        console.log(foundUser)
        console.log(foundUser._id)
        // with the existing accessToken from sign in
        if(foundUser == undefined ){
          return  res.send({message: "User with that email not found"})
        }   
        if(foundUser){
        const refreshToken = createRefreshToken(foundUser._id)
        res.send({ jwt: refreshToken })
        }
    } catch (err) {
        res.send({ message: err.message })
    }
})

export { router }