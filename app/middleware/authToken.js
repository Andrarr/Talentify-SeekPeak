import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from "../model/users.js";
import { ObjectId } from "mongodb"


export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, auth) => {
        if (err) {
            return res.sendStatus(401)
        }
        req.auth = await User.findOne({ _id: ObjectId(auth.id) });
        
        next()
    })
}



