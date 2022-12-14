import express from "express";
import bodyParser from "body-parser";
import { User } from "../model/users.js";
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { signUpValidation } from "../validation/validation.js"

const createAccessToken = (id) => {
    return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: '1 d'
    })

}

export const signIn = async (req, res, next) => {
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
            //  res.header("auth-token", token).send(token)
            // const refreshToken = createRefreshToken(foundUser._id)
            return res.send({ jwt: token })

        }
    } catch (err) {
        next(err)
    }

}