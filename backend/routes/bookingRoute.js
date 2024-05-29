import { Router } from "express";
import { createBooking, getBookingList} from "../controller/bookingController.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router()

router.get('/getBookings', getBookingList);
router.post('/createbooking', createBooking);

export default router;