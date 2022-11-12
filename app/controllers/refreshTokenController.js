import jwt from "jsonwebtoken";
import { User } from "../model/users.js";

const createRefreshToken = (id) => jwt.sign({ id }, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: "1d" });


export const refreshToken = async (req, res) => {
    try {
        const { email } = req.body
        const foundUser = await User.findOne({ email: email })
        if (foundUser == null) {
            return res.send({ message: "User with that email not found" })
        }
        if (foundUser) {
            const refreshToken = createRefreshToken(foundUser._id)
            return res.send({ jwt: refreshToken })
        }
    } catch (err) {
        return res.send({ message: err.message })
    }
}