import mongoose, { Schema } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const DepartmentSchema = new Schema({
    deptId: {
        type: Number,
        required: true,
    },
    deptName: {
        type: String,
        required: true,
    }
});

export const Department = mongoose.model("Department", DepartmentSchema)
