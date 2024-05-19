import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../utils/SendMail.js";

const registerUser = async (req, res) => {

    const { firstName, lastName, email, mobileNumber } = req.body
    //console.log("email: ", email);

    if (
        [firstName, lastName, email, mobileNumber].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json(
            new ApiResponse(400, {}, "All fields are required")
        )
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        return res.status(409).json(
            new ApiResponse(409, {}, "User with email already existsd")
        )
    }

    const user = new User({
        firstName,
        lastName,
        email,
        mobileNumber,
        password: generatePassword()
    })

    let registeredUser = await user.save();

    if (!registeredUser) {
        return res.status(500).json(
            new ApiResponse(500, {}, "Something went wrong while registering the user")
        )
    }

    const subject="Employee Register Successfull"
    const body = `Hi ${user.firstName}<br/>
     Here is the your cedientials for login<br/>
     email: ${user.email}<br/>
     password: ${user.password}<br/>
    click here to login: <a href="http://localhost:3000">http://localhost:3000</a>`;

    sendMail(registeredUser.email,subject,body)
    return res.status(201).json(
        new ApiResponse(201, registeredUser, "User registered Successfully")
    )


};

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const generateAccessToken = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()

        return {accessToken}


    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, {}, "Something went wrong while generating referesh and access token")
        )
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res.status(400).json(
            new ApiResponse(400, {}, "Email and password is required")
        )
    }


    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json(
            new ApiResponse(404, {}, "User does not exist")
        )
    }

    if (password !== user.password) {
        return res.status(401).json(
            new ApiResponse(401, {}, "Invalid user credentials")
        )
    }

    const { accessToken } = await generateAccessToken(user._id)

    const loggedInUser = await User.findById(user._id);

    const options = {
        domain: "localhost",
        sameSite: "none",
        secure: true,
        maxAge: 1*24*60*60*1000
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken,
                },
                "User logged In Successfully"
            )
        )
}

const logoutUser = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
}

const forgotPassword = async(req,res)=>{
    const { email } = req.body;

    if (!email) {
        return res.status(400).json(
            new ApiResponse(400, {}, "Email is required")
        )
    }


    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json(
            new ApiResponse(404, {}, "User does not exist")
        )
    }

    const subject="Forgot Password"
    const body = `Hi ${user.firstName}<br/>
     email: ${user.email}<br/>
     you have requested for reset password<br/>
    click here to create a new password: <a href="http://localhost:3000/resetPassword">http://localhost:3000/resetPassword</a>`;

    sendMail(user.email,subject,body)
    return res.status(201).json(
        new ApiResponse(201,{}, "Email Send Successfully")
    )
}
export { registerUser, loginUser, logoutUser,forgotPassword };