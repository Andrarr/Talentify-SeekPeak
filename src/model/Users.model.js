import mongoose, { Schema } from 'mongoose'
import { roles } from '../utils/inputs.js'

const usersSchema = new Schema({

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
    department: {
        departmentId: { type: Schema.Types.ObjectId, ref: 'Department' }
    },

    role: {
        type: String,
        enum: [roles],
        default: 'user'
    }

})

export let User = mongoose.model('User', usersSchema)
