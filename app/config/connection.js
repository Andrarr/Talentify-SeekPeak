
import mongoose from "mongoose";

const db = mongoose.connect("mongodb://localhost:27017/SeekPeak", () => {
    console.log("Database is connected!")
},
    err => console.error(err))



