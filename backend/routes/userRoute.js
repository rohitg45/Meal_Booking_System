import { Router } from "express";
import { registerUser, loginUser, logoutUser,forgotPassword, getAllUsers } from "../controller/userController.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router()

router.post('/addUser', registerUser);
router.get('/getUser', getAllUsers);
router.post('/login',loginUser);
router.post('/forgotpassword',forgotPassword);
router.delete('/logout',verifyJWT, logoutUser);

export default router;