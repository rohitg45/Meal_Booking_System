// const express = require('express');
// const appRoute = require('./routes/route.js');
// const userRoute = require('./routes/UserRoute.js');
import express from "express";
import connectDB from "./db/connection.js";
// import appRoute from "./routes/route.js"
import userRoute from "./routes/UserRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())


const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

/** routes */
// app.use('/api', appRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
