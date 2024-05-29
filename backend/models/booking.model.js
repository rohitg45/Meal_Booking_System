import mongoose, {Schema} from "mongoose";
import {configDotenv} from "dotenv";
configDotenv();

const BookingSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  department: {
    type: Number,
  },
  notes: {
    type: String,
  },
  bookingCount: {
    type: Number,
    required: true,
    trim: true, 
  },
  selectedEmployees: [
    {
      type: String
    },
  ],
});

export const Booking = mongoose.model("Booking", BookingSchema)
