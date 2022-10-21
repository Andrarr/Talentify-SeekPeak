import mongoose from "mongoose";
const { Schema } = mongoose

const departmentSchema = new Schema({
    department: String,
    name: String
})

const Department = mongoose.model('Department', departmentSchema);
export  { Department }

    