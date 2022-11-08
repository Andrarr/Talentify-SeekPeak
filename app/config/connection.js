import mongoose from "mongoose";
import {} from "dotenv";
export const db = mongoose.connect(`${process.env.URI}`, () => {
    console.log("Database is connected!")
},
    err => console.error(err))
