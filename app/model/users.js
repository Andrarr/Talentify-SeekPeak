import mongoose from "mongoose"
import { Department } from "./departments.js"

const usersSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    department: {
        type: String
        // required: true
    },

    role: {
        type: String,
        enums: ['User', 'TeamLeader', 'CTO'],
        default: 'User'
    }

})


let User = mongoose.model('User', usersSchema)


export { User }