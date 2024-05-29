import { Router } from "express";
import { registerUser, loginUser, logoutUser,forgotPassword, getAllUsers, deleteUser, updateUser } from "../controller/userController.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router()

router.post('/addUser', registerUser);
router.get('/getUser', getAllUsers);
router.post('/login',loginUser);
router.post('/forgotpassword',forgotPassword);
router.delete('/logout',verifyJWT, logoutUser);
router.delete('/deleteUser/:userId', deleteUser);
router.put('/updateUser/:userId', updateUser);

export default router;