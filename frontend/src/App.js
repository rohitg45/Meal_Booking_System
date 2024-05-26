import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import ChangePassword from "./components/changePassword";
import ResetPassword from "./components/resetPassword";
import Calendar from "./components/calendar";
import Booking from "./components/booking.jsx";
import Userlist from "./components/userList.jsx";

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
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/userlist" element={<Userlist />} />

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
