import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    // // if (!users) return alert("Invalid username and password");
    //   if (username === "rohit" && password === "rohit123") {
    //     alert("login successfully");
    //     navigate("/calendar");
    //     return;
    //   }
    // alert("Invalid username and password");


    const res = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials:'include',
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if(!data.success){
      alert("Invalid username and password");
      return;
    }
    
    alert("login successfully");
    navigate("/calendar");
  };

  return (
    <div className="App">
      <section className="login-content">
        <div className="login-content-lt"></div>
        <div className="login-content-rt">
          <div className="login-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="logo-wrapper">
                <img src="/images/logo.svg" alt="Rishabh Software" />
                <span>Meal Facility</span>
              </div>
              <h3 className="login-head">Sign in to your account</h3>
              <p className="login-text">Enter your credentials to access your account.</p>
              <div className="form-group">
                <label className="control-label">User Name</label>
                <div className="input-addon">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Robert Smith"
                    autoFocus
                    value={email}
                    onChange={handleemailChange}
                  />
                  <div className="icon-after icon-green"><i className="icon-check"></i></div>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label">Password</label>
                <div className="input-addon">
                  <input
                    id="password-field"
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span
                    className={showPassword ? "icon-eye-open field-icon toggle-password" : "icon-eye-close field-icon toggle-password"}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="form-group mb-0">
                  <label className="custom-checkbox mb-0"><span className="checkbox__title">Remember Me</span>
                    <input
                      className="checkbox__input"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <span className="checkbox__checkmark"></span>
                  </label>
                </div>
                <div className="form-group mb-0">
                  <div className="utility">
                    <p><a href="#" className="form-link" onClick={handleForgotPassword}>Forgot Password?</a></p>
                  </div>
                </div>
              </div>
              <div className="form-group btn-container">
                <button className="btn btn-xl btn-primary">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
