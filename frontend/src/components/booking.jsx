import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

const BookingContent = () => {
  const navigate = useNavigate();
  // const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    category: "Employees",
    mealType: "Lunch",
    date: "",
    deptId: -1,
    notes: "",
    bookingCount: 1,
    employees: [],
  });

  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/getUser`,
        {
          params: { departmentId: +form.deptId},
        }
      )
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.log(err));
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckBoxChange=  (e) => {
    const {value, checked } = e.target;
    if(checked)
    setForm({ ...form, employees: [...form.employees, value] });
    else
    setForm({ ...form, employees: form.employees.filter(emp => emp !== value)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      category: form.category,
      mealType: form.mealType,
      date: form.date,
      department: +form.deptId,
      notes: form.notes,
      bookingCount: +form.bookingCount,
      selectedEmployees: form.employees,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/booking/createbooking",
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res);

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      alert(res.data.message);
      navigate("/booking");
    } catch (error) {
      // console.error('Error submitting form:', error);
      // alert('Error submitting form');
      alert(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container pt-30 mb-30">
        <div className="container-head">
          <div className="container-left">
            <h3 className="container-title">Booking List</h3>
          </div>
          <div className="container-right">
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#addBookingModal"
            >
              Add Booking
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
              <th>DEPARTMENT</th>
              <th>MEAL TYPE</th>
              <th>TOTAL MEAL BOOKED</th>
              <th>MEAL DATES</th>
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
                Book a Meal
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
                <div className="form-group custom-radio">
                  <label>Select Category</label>
                  <div className="d-flex align-content-center justify-content-start">
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="employees"
                        name="category"
                        value="Employees"
                        checked={form.category === "Employees"}
                        onChange={handleChange}
                      />
                      <label for="employees" className="mr-0">
                        Employees
                      </label>
                    </div>
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="nonEmployees"
                        name="category"
                        value="Non Employees"
                        checked={form.category === "Non Employees"}
                        onChange={handleChange}
                      />
                      <label for="nonEmployees" className="mr-0">
                        Non Employees
                      </label>
                    </div>
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="customBooking"
                        name="category"
                        value="Custom Booking"
                        checked={form.category === "Custom Booking"}
                        onChange={handleChange}
                      />
                      <label for="customBooking" className="mr-0">
                        Custom Booking
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group custom-radio">
                  <label>Select Meal Type</label>
                  <div className="d-flex align-content-center justify-content-start">
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="lunch"
                        name="mealType"
                        value="Lunch"
                        checked={form.mealType === "Lunch"}
                        onChange={handleChange}
                      />
                      <label for="lunch" className="mr-0">
                        Lunch
                      </label>
                    </div>
                    <div className="radio-block">
                      <input
                        type="radio"
                        id="dinner"
                        name="mealType"
                        value="Dinner"
                        checked={form.mealType === "Dinner"}
                        onChange={handleChange}
                      />
                      <label for="dinner" className="mr-0">
                        Dinner
                      </label>
                    </div>
                  </div>
                </div>
                {/* <div className="form-group mb-30">
                  <label className="custom-checkbox mb-0"><span className="checkbox__title">Weekend</span>
                    <input className="checkbox__input" type="checkbox" name="isWeekend" checked={form.isWeekend} onChange={handleCheckboxChange} /><span className="checkbox__checkmark"></span>
                  </label>
                </div> */}
                <div className="form-group">
                  <label>Select Date(s)</label>
                  <div className="input-group date-picker-input">
                    <input
                      type="datetime-local"
                      className="form-control border-right-0"
                      placeholder="Select Date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                    <div className="input-group-append bg-transparent">
                      {/* <span className="input-group-text bg-transparent" id="basic-addon2"><i className="icon-calendar"></i></span> */}
                    </div>
                  </div>
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
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Type here.."
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Booking Count</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="100"
                    name="bookingCount"
                    value={form.bookingCount}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Select Employees</label>

                  <div className="table-responsive">
                    <table className="table table-hover responsive nowrap table-bordered">
                      <thead>
                        <tr>
                          <th>
                            <div className="form-group mb-0">
                              <label className="custom-checkbox">
                                <input
                                  className="checkbox__input" type="checkbox"/>
                                <span className="checkbox__checkmark"></span>
                              </label>
                            </div>
                          </th>
                          <th>Employee ID</th>
                          <th>Employee Name</th>
                          <th>Department</th>
                        </tr>
                      </thead>
                      <tbody>
                          
                          {users?.map((user, i) => (
                            <tr key={i}>
                              <td>
                            <div className="form-group mb-0">
                              <label className="custom-checkbox m-0">
                                <input className="checkbox__input" name="employees" value={user.userId} 
                                // checked={form.employees === user.userId}
                                onChange={handleCheckBoxChange} type="checkbox"
                                />
                                <span className="checkbox__checkmark"></span>
                              </label>
                            </div>
                          </td>
                              <td>{user.userId}</td>
                              <td>{user.firstName + " " + user.lastName}</td>
                              <td>{user.department}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
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

const Booking = () => (
  <div>
    {/* <Navbar /> */}
    <Header />
    <BookingContent />
    <Footer />
  </div>
);

export default Booking;
