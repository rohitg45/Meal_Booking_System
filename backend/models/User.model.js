import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import {configDotenv} from "dotenv";
configDotenv();
// import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true, 
        },
        lastName: {
            type: String,
            required: true,
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        mobileNumber: {
            type: Number,
            required: true,
            trim: true, 
            index: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        },
        departmentId: {
            type: Number,
            required: true
        }
    }
)

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            mobileNumber: this.mobileNumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
            
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }

export const User = mongoose.model("User", userSchema)