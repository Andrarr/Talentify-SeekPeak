import mongoose from "mongoose";
import { Cto, TeamLead, User } from "../model/users.js";

const db = mongoose.connect("mongodb://localhost:27017/SeekPeak", () => {
    console.log("Database is connected!")
},
    err => console.error(err))

async function newUser() {
    try {
        const user = await User.create({

            email: "Johndoe@gmail.com",
            name: "John",
            surname: "Doe",
            role: "User"
        })
        console.log(user)
    } catch (err) {
        console.log(err.message)
    }
}

newUser()