import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
    department: {
        type: String,
        required: [true, "Department field is required!"]
    }
})

const Department = mongoose.model("Department", departmentSchema);
export { Department }
