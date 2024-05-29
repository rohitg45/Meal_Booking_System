import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBooking = async (req, res) => {
  const { category, mealType, date, department, notes, bookingCount, selectedEmployees } = req.body;

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
  const category = req.query.category;
  if(!category){
    return res.status(401).json(
        new ApiResponse(401, {}, "Booking Category is required")
    )
  }
  const conditionArr = [{ $match: { category } }];

  if (category === "Employees") {
    conditionArr.push({
      $lookup:
      {
        from: "users",
        localField: "selectedEmployees",
        foreignField: "userId",
        as: "users"
      }
    },
    {
      $lookup:
      {
        from: "departments",
        localField: "department",
        foreignField: "deptId",
        as: "department"
      }
    },
    {
      $unwind: "$department"
    });
  }

  try {
    const bookings = await Booking.aggregate(conditionArr);
    return res.status(201).json(
      new ApiResponse(201, bookings, "Bookings fetched Successfully")
    )
  } catch (err) {
    return res.status(500).json(
      new ApiResponse(500, {}, "Error! while fetching Bookings.")
    )
  }
};

export { createBooking, getBookingList };
