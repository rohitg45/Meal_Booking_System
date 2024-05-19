import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
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
    <div className="App">
      <section className="login-content">
        <div className="login-content-lt"></div>
        <div className="login-content-rt">
          <div className="login-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <h3 className="login-head">Change Password</h3>
              <div className="form-group">
                <label className="control-label">Old Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label">New Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label">Confirm Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              <div className="form-group btn-container">
                <button className="btn btn-xl btn-primary"> Change Password</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangePassword;