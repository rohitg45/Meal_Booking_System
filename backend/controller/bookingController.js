import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBooking = async (req, res) => {
  const {  category, mealType, date, department, notes, bookingCount, selectedEmployees } = req.body;

  const booking = new Booking({
    category,
    mealType,
    date,
    department,
    notes,
    bookingCount,
    selectedEmployees
  });

  try {
    const newBooking = await booking.save();
    return res.status(201).json(new ApiResponse(201, {}, "Booking Successfully"));
  } catch (err) {
    return res.status(500).json(new ApiResponse(500, {}, "Error while Booking"));
  }
};

const getBookingList = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createBooking, getBookingList};
