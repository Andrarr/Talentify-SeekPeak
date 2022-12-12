import mongoose, { Schema } from 'mongoose';

const departmentSchema = new Schema({
    department: {
        type: String,
        required: [true, 'Department field is required!'],
    },
});

export const Department = mongoose.model('Department', departmentSchema);
