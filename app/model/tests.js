import mongoose from "mongoose";

import {Department} from "./departments.js";
import { User, TeamLead, Cto } from "./users.js";

const questionsSchema = new mongoose.Schema({
    question: String,
    choices: String

})

const testSchema = new mongoose.Schema({
    department: String,
    createdBy: String, //embedded teamLeader
    questions: questionsSchema //embedded

})