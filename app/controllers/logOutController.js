import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const logOut = async (req, res, next) => {
    try {
        let id = req.auth._id;
        jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: "1" })
        return res.send({ message: "Logged out successfully" })
    }
    catch (e) {
        next(e)
        return res.send({ message: e.message })
    }
}
