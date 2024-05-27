import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    if (newPassword === confirmPassword) {
      alert("Password reset successfully");
      // Add logic to reset password in backend and navigate to login page
      navigate("/");
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <section className="login-content">
      <div className="login-content-lt"></div>
      <div className="login-content-rt">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <h3 className="login-head">Reset Password</h3>
            <div className="form-group">
            <label className="control-label">New Password</label>
              <div className="input-addon">
                <input
                  id="password-field"
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <span
                  className={showPassword ? "icon-eye-open field-icon toggle-password" : "icon-eye-close field-icon toggle-password"}
                  onClick={togglePasswordVisibility}
                ></span>
                </div>
            </div>
            <div className="form-group">
              <label className="control-label">Confirm Password</label>
              <div className="input-addon">
                <input
                  id="password-field"
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <span
                  className={showPassword ? "icon-eye-open field-icon toggle-password" : "icon-eye-close field-icon toggle-password"}
                  onClick={togglePasswordVisibility}
                ></span>
                </div>
            </div>
            <div className="form-group btn-container">
              <button className="btn btn-xl btn-primary"> New Password</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;