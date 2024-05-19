import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    const res = await fetch('http://localhost:8000/api/user/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials:'include',
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if(!data.success){
      alert(data.message);
      return;
    }
    
    alert("Email send successfully");
    navigate("/");
    
  };

  return (
    <section className="login-content">
      <div className="login-content-lt"></div>
      <div className="login-content-rt">
        <div className="login-box">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="logo-wrapper">
              <img src="../images/logo.svg" alt="Rishabh Software" />
              <span>Meal Facility</span>
            </div>
            <h3 className="login-head">Forgot Password?</h3>
            <p className="login-text">Enter the email below to continue.</p>
            <div className="form-group">
              <label className="control-label">Email</label>
              <div className="input-addon">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Robert Smith"
                    autoFocus
                    value={email}
                    onChange={handleemailChange}
                  />
                <div className="icon-after icon-green"><i className="las la-check"></i></div>
              </div>
              {/* <div className="error-block">Error display here</div> */}
            </div>
            <div className="form-group btn-container">
              <button className="btn btn-xl btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
