import { Booking } from "../models/booking.model.js";

const createBooking = async (req, res) => {
  const {  category, mealType, date, department, notes, bookingCount, selectedEmployees, weekend } = req.body;

  const booking = new Booking({
    category,
    mealType,
    date,
    department,
    notes,
    bookingCount,
    selectedEmployees,
    weekend
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
