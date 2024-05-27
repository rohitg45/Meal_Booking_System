import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

const Userdata = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deptId: "",
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/department`)
      .then((response) => setDepartments(response.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8000/api/user/getUser`)
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.log(err));
  }, []);

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
      mobileNumber: formData.phone,
      departmentId: +formData.deptId,
    };

    // console.log(newUser);
    // return;

    const res = await fetch("http://localhost:8000/api/user/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("User created successfully! check your mail!");
    navigate("/userList");
    // await axios.post('/employees', formData);
    // await axios.post('/send-email', emailData);

  };

  return (
    <div className="container-fluid">
      <div className="container pt-30 mb-30">
        <div className="container-head">
          <div className="container-left">
            <h3 className="container-title">User List</h3>
          </div>
          <div className="container-right">
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#addBookingModal"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="content-tab">
          <a className="content-tab_link active" href="#">
            Rishabh Employees
          </a>
          <a className="content-tab_link" href="#">
            Others
          </a>
        </div>
      </div>

      {/* User table list */}
      <div className="container">
        <table className="table table-hover responsive nowrap table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, i) => (
              <tr key={i}>
                <td>{user.userId}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* user form */}
      <div
        className="modal fade side-modal"
        id="addBookingModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
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
                <div className="form-group custom-radio">
                  <label>Select Department</label>
                  <select
                    className="form-control"
                    name="deptId"
                    onChange={handleChange}
                    required
                  >
                    <option value="" selected disabled>
                      Select
                    </option>
                    {departments?.map((dept, index) => (
                      <option value={dept.deptId} key={index}>
                        {dept.deptName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-primary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Userlist = () => (
  <div>
    {/* <Navbar /> */}
    <Header />
    <Userdata />
    <Footer />
  </div>
);

export default Userlist;
