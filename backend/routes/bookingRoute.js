import { Router } from "express";
import { createBooking, getBookingList} from "../controller/bookingController.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router()

router.get('/getBookings',verifyJWT, getBookingList);
router.post('/createbooking',verifyJWT, createBooking);

export default router;