import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


      // Send email with random password
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNumber: formData.phone
      };

      const res = await fetch('http://localhost:8000/api/user/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials:'include',
      body: JSON.stringify(newUser)
    });

    const data = await res.json();

    if(!data.success){
      alert(data.message);
      return;
    }
    
    alert("User created successfully! check your mail!");
    navigate("/calendar");
      // await axios.post('/employees', formData);
      // await axios.post('/send-email', emailData);

  };

  return (
    <div className="App">
      <section className="login-content">
        <div className="login-content-lt"></div>
        <div className="login-content-rt">
          <div className="login-box">
            <form className="login-form" onSubmit={handleSubmit}>
              <h3 className="login-head">Add Employee</h3>
              <div className="form-group">
                <label className="control-label">First Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label">Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="control-label">Phone</label>
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                  required
                />
              </div>
              <div className="form-group btn-container">
                <button className="btn btn-xl btn-primary">Add Employee</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddEmployee;
