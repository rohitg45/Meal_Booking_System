import { Router } from "express";
import { registerUser, loginUser, logoutUser,forgotPassword,resetPassword, getAllUsers, deleteUser, updateUser } from "../controller/userController.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router()

router.post('/addUser', registerUser);
router.get('/getUser',verifyJWT, getAllUsers);
router.delete('/deleteUser/:userId',verifyJWT, deleteUser);
router.put('/updateUser/:userId',verifyJWT, updateUser);

router.post('/login',loginUser);
router.post('/forgotpassword',forgotPassword);
router.post('/resetPassword',verifyJWT,resetPassword);
router.delete('/logout', logoutUser);

export default router;