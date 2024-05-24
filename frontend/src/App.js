import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import ChangePassword from "./components/changePassword";
import ResetPassword from "./components/resetPassword";
import AddEmployee from "./components/addEmployee";
import Calendar from "./components/calendar";
import Booking from "./components/booking.jsx";
// import Header from "../src/components/header.jsx";
// import Footer from "../src/components/footer.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/booking" element={<Booking />} />

          {/* <Route
            path="/booking"
            element={
              <>
                <Header />
                <Booking />
                <Footer />
              </>
            }
          /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
