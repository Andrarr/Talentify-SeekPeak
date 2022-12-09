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

export const signUp = async (req, res, next) => {
    try {
        await signUpValidation.validateAsync(req.body)

        const salt = await bcrypt.genSalt()

        const { email, name, surname, birthday, country, gender, password, 'confirm-password': confirmPassword, department } = req.body

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

        const user = await User.create(userRegistered)

        const token = createAccessToken(user._id)

        return res.send({ jwt: token })
    } catch (e) {
        return res.json({ message: e.message })
    }
}
