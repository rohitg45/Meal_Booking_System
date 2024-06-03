
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyJWT = async(req,res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json(
                new ApiResponse(401,{}, "Unauthorised user")
            )
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id);
    
        if (!user) {
            return res.status(404).json(
                new ApiResponse(404,{}, "User Not found")
            )
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json(
            new ApiResponse(401,{}, "Invalid Access Token")
        )
    }
    
}
export default verifyJWT;