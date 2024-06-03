import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

const BookingContent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "Employees",
    mealType: "Lunch",
    startDate: "",
    endDate: "",
    deptId: "",
    notes: "",
    bookingCount: 1,
    employees: [],
  });

  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeesBookings, setEmployeesBookings] = useState([]);
  const [nonEmployeesBookings, setNonEmployeesBookings] = useState([]);
  const [customBookings, setCustomBookings] = useState([]);

  //To set department and get users
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/department`)
      .then((response) => setDepartments(response.data.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8000/api/user/getUser`, { withCredentials: true })
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.log(err));

    getBookings();
  }, []);


  //To show booked list details differently
  const getBookings = async () => {
    try {
      let response = await axios.get(
        "http://localhost:8000/api/booking/getBookings",
        {
          params: { category: "Employees" },
          withCredentials: true 
        }
      );
      setEmployeesBookings(response.data.data);

      response = await axios.get(
        "http://localhost:8000/api/booking/getBookings?category=Non Employees",
        { withCredentials: true }
      );
      setNonEmployeesBookings(response.data.data);

      response = await axios.get(
        "http://localhost:8000/api/booking/getBookings?category=Custom Booking",
        { withCredentials: true }
      );
      setCustomBookings(response.data.data);
    } catch (error) {
      console.log("Error while getting bookings: ", error);
    }
  };

  // It shows checkbox to show employees based on filletered department 
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/getUser`, {
        params: { departmentId: +form.deptId },
        withCredentials: true 
      })
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.log(err));
  }, [form]);

  const [categoryType, setCategoryType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (
      name === "category" &&
      (value === "Non Employees" || value === "Custom Booking")
    ) {
      setCategoryType(value);
    }

    // if(form.category=="Employees" && form.employees.length && (name=="startDate" || name=="endDate")){
    //   setBookingCountForEmployess();
    // }
  };

  //used for check or unchecked of employees in form
  const handleCheckBoxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) 
      setForm({ ...form, employees: [...form.employees, value] });
    else
      setForm({
        ...form,
        employees: form.employees.filter((emp) => emp !== value),
      });
    // setBookingCountForEmployess();
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.category === "Employees" && form.employees.length == 0) {
      alert("Please select employees");
      return;
    }

    const newBooking = {
      category: form.category,
      mealType: form.mealType,
      startDate: form.startDate,
      endDate: form.endDate,
      notes: form.notes,
      bookingCount: +form.bookingCount,
    };

    //If employee is selected then added two properties in booking employee list and note deleted.
    if (form.category === "Employees") {
      newBooking.department = +form.deptId;
      newBooking.selectedEmployees = form.employees;
      delete newBooking.notes;

      const date1 = new Date(form.startDate);
      const date2 = new Date(form.endDate);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      newBooking.bookingCount = (diffDays+1) * form.employees.length;
    }

    //To book the meal
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

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      alert(res.data.message);
      getBookings();
      resetForm();
    } catch (error) {
      // console.error('Error submitting form:', error);
      // alert('Error submitting form');
      alert(error);
    }
  };

  // To reset the form
  const resetForm = () => {
    setForm({
      category: "Employees",
      mealType: "Lunch",
      startDate: "",
      endDate: "",
      deptId: "",
      notes: "",
      bookingCount: 1,
      employees: [],
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      // weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // timeZone: "UTC",
    });
  };

  const cD = new Date();
  cD.setMonth(cD.getMonth() + 3);
  const maxDate = cD.toISOString().split("T")[0];

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
        {/* <div className="content-tab">
          <a className="content-tab_link active" href="#">
            Rishabh Employees
          </a>
          <a className="content-tab_link" href="#">
            Others
          </a>
        </div> */}
        <div className="content-tab d-inline">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#employees"
                type="button"
                role="tab"
                aria-controls="employees"
                aria-selected="true"
              >
                Employees
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#others"
                type="button"
                role="tab"
                aria-controls="others"
                aria-selected="false"
              >
                others
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="employees"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
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
                  {employeesBookings?.map((booking, i) => (
                    <tr key={i}>
                      <td>
                        {booking.selectedEmployees.map((empId) => (
                          <div>{empId}</div>
                        ))}
                      </td>
                      <td>
                        {booking.users.map((user) => (
                          <div>{user.firstName + " " + user.lastName}</div>
                        ))}
                      </td>
                      <td>{booking.department.deptName}</td>
                      <td>{booking.mealType}</td>
                      <td>{booking.bookingCount}</td>
                      <td>
                        {formatDate(booking.startDate) +
                          " - " +
                          formatDate(booking.endDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="others"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <table className="table table-hover responsive nowrap table-bordered">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Meal type</th>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Booking Count</th>
                  </tr>
                </thead>
                <tbody>
                  {[...nonEmployeesBookings, ...customBookings].map((i) => (
                    <tr key={i._id}>
                      <td>{i.category}</td>
                      <td>{i.mealType}</td>
                      <td>
                        {formatDate(i.startDate) +
                          " - " +
                          formatDate(i.endDate)}
                      </td>
                      <td>{i.notes}</td>
                      <td>{i.bookingCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                <span aria-hidden="true" onClick={resetForm}>
                  ×
                </span>
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
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Select Start Date</label>
                      <div className="input-group date-picker-input">
                        <input
                          type="date"
                          className="form-control border-right-0"
                          placeholder="Select Date"
                          name="startDate"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.startDate}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-group-append bg-transparent">
                          {/* <span className="input-group-text bg-transparent" id="basic-addon2"><i className="icon-calendar"></i></span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Select End Date</label>
                      <div className="input-group date-picker-input">
                        <input
                          type="date"
                          className="form-control border-right-0"
                          placeholder="Select Date"
                          name="endDate"
                          max={ maxDate}
                          value={form.endDate}
                          onChange={handleChange}
                          required
                        />
                        <div className="input-group-append bg-transparent">
                          {/* <span className="input-group-text bg-transparent" id="basic-addon2"><i className="icon-calendar"></i></span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {!(
                  form.category === "Non Employees" ||
                  form.category === "Custom Booking"
                ) && (
                  <div className="form-group custom-radio">
                    <label>Select Department</label>
                    <select
                      className="form-control"
                      name="deptId"
                      onChange={handleChange}
                      required
                      value={form.deptId}
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
                )}
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
                    disabled={form.category == "Employees" ? true : false}
                  />
                </div>

                {!(
                  form.category === "Non Employees" ||
                  form.category === "Custom Booking"
                ) && (
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
                                    className="checkbox__input"
                                    type="checkbox"
                                  />
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
                                    <input
                                      className="checkbox__input"
                                      name="employees"
                                      value={user.userId}
                                      // checked={form.employees === user.userId}
                                      onChange={handleCheckBoxChange}
                                      type="checkbox"
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
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={resetForm}
                  >
                    Reset
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
