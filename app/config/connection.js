import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

export const db = mongoose.connect(`${process.env.URI}`, () => {
    console.log("Database is connected!")
}, err => console.error(err))
