import mongoose, { Schema } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const CounterSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    sequence_value: {
        type: Number,
        required: true,
    },
});

export const Counter = mongoose.model("Counter", CounterSchema);
