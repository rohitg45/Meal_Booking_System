import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";
import Calendar from "./components/calendar";
import './App.css'; // Assuming your CSS file is named App.css

const App = () => {
  return (
      <>
         <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/calendar" element={<Calendar />} />
          </Routes>
          </Router>
      </>
  )
}

export default App;