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

      getUser();
  }, []);

  const getUser = ()=>{
    axios
      .get(`http://localhost:8000/api/user/getUser`, { withCredentials: true })
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.log(err));
  }

  const [editUserID, setEditUserID] = useState(null);

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

    // Update User
    if(editUserID){
      axios.put(`http://localhost:8000/api/user/updateUser/${editUserID}`, newUser, { 
        headers: {'Content-Type': 'application/json'} ,
        withCredentials: true 
      })
      .then(res=> getUser())
      .catch(err => alert(err))
    }
    // Add User
    else{
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
      getUser();
      alert("User created successfully! check your mail!");
    }

    resetForm();
  };

  const deleteUser = (userId)=>{
    if(window.confirm("Do you want to delete this User with ID: "+userId)){ 
    axios
      .delete(`http://localhost:8000/api/user/deleteUser/${userId}`,{ withCredentials: true })
      .then((response) => {
        getUser();
        alert(response.data.message)
      })
      .catch((err) => console.log(err));
    }
  }
  const editUser = (editUserId)=>{
    for(const user of users){
      if(user.userId === editUserId){
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.mobileNumber,
          deptId: user.departmentId
        });
        break;
      }
    }
    setEditUserID(editUserId);
  }
  const resetForm = ()=>{
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      deptId: "",
    });
  }
  
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
              onClick={()=> setEditUserID(null)}
            >
              Add User
            </button>
          </div>
        </div>
        {/* <div className="content-tab">
          <a className="content-tab_link active" href="#">
            Rishabh Employees
          </a>
          <a className="content-tab_link" href="#">
            Others
          </a>
        </div> */}
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
              <th>Action</th>
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
                <td>
                  <button data-toggle="modal" data-target="#addBookingModal" 
                  onClick={()=> editUser(user.userId)}>Edit</button>
                  <button onClick={()=> deleteUser(user.userId)}>Delete</button>
                </td>
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
                { editUserID ? "Edit User" : "Add User"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={resetForm}>×</span>
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
                    value={formData.deptId}
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
                  <button type="reset" className="btn btn-outline-primary" data-dismiss="modal"
                  onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    { editUserID ? "Edit User" : "Add User"}
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
