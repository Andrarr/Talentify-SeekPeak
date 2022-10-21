import mongoose from "mongoose"
import {Department} from "./departments.js"

const ctoSchema = new mongoose.Schema({

})

const teamLeadSchema = new mongoose.Schema({

})

const usersSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    name: String,
    surname: String,
    birthday: Date,
    country: String,
    gender: Boolean,
    password: String,
    department: String, //referenced
    confirmPassword: String,
    role: String // save as array the roles, default user

})

let User = mongoose.model('User', usersSchema)
let TeamLead = mongoose.model('TeamLead', teamLeadSchema)
let Cto = mongoose.model('Cto', ctoSchema)

export  { User, TeamLead, Cto }