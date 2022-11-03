import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from "../model/users.js";
import { ObjectId } from "mongodb"

export const roleAuthorization = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        return res.sendStatus(401)
    }
    try {
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, auth) => {
            if (err) {
                return res.sendStatus(403)
            }
            const thisUser = await User.findOne({ _id: ObjectId(auth.id) })
           // console.log(thisUser)
            if (thisUser.role == "admin" || thisUser.role == "teamLeader" || thisUser.role == "super-admin" || thisUser.role == "CTO") {
                next()
            } else {
                res.status(403).send({ message: "You don't have authority for this action!" })
            }

        })
    }
    catch (err) {
        res.send({ message: err.message })
    }

}

export const roleSuperAdmin = function(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        return res.sendStatus(401)
    }
    try {
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, async (err, auth) => {
            if (err) {
                return res.sendStatus(403)
            }
            const thisUser = await User.findOne({ _id: ObjectId(auth.id) })
           // console.log(thisUser)
            if (thisUser.role == "super-admin" || thisUser.role == "CTO") {
                next()
            } else {
                res.status(403).send({ message: "Only a super-admin/ CTO has access!" })
            }

        })
    }
    catch (err) {
        res.send({ message: err.message })
    }
}
