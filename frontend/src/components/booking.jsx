import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
// import { Booking } from '../../../backend/models/booking.model';

const BookingContent = () => {
  const navigate = useNavigate();
  // const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    category: 'Employees',
    mealType: 'Lunch',
    // isWeekend: false,
    date: '',
    account: '',
    notes: '',
    bookingCount: 1,
    employees: '664f023785d6d91948977a80',
  });

  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  // const fetchBookings = async () => {
  //   const snapshot = await db.collection('bookings').get();
  //   const bookingsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //   setBookings(bookingsList);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setForm(prevState => ({ ...prevState, [name]: checked }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      category: form.category,
        mealType: form.mealType,
        date: form.date,
        department: form.account,
        notes: form.notes,
        bookingCount: form.bookingCount,
        selectedEmployees: form.employees
    };

    try {
      const res = await axios.post(
        'http://localhost:8000/api/booking/createbooking',
        newBooking,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

    const data = res.data;

    if(!data.success){
      alert(data.message);
      return;
    }
    
    alert("Form submitted successfully!");
    navigate("/calendar");
    
    } catch (error) {
      // console.error('Error submitting form:', error);
      // alert('Error submitting form');
      alert(error);
    }
    // await db.collection('bookings').add(form);
    // fetchBookings();
    // Reset form or handle as needed
  };

  return (
    <div className="py-5 my-5  ">
    <div className="container-fluid">
      <div className="container pt-30 mb-30">
        <div className="container-head">
          <div className="container-left">
            <h3 className="container-title">Booking List</h3>
          </div>
          <div className="container-right">
            <button className="btn btn-primary" data-toggle="modal" data-target="#addBookingModal">Add Booking</button>
          </div>
        </div>
        <div className="content-tab">
          <a className="content-tab_link active" href="#">Rishabh Employees</a>
          <a className="content-tab_link" href="#">Others</a>
        </div>
      </div>
      <div className="modal fade side-modal" id="addBookingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Book a Meal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group custom-radio">
                  <label>Select Category</label>
                  <div className="d-flex align-content-center justify-content-start">
                    <div className="radio-block">
                      <input type="radio" id="employees" name="category" value="Employees" checked={form.category === 'Employees'} onChange={handleChange} />
                      <label for="employees" className="mr-0">Employees</label>
                    </div>
                    <div className="radio-block">
                      <input type="radio" id="nonEmployees" name="category" value="Non Employees" checked={form.category === 'Non Employees'} onChange={handleChange} />
                      <label for="nonEmployees" className="mr-0">Non Employees</label>
                    </div>
                    <div className="radio-block">
                      <input type="radio" id="customBooking" name="category" value="Custom Booking" checked={form.category === 'Custom Booking'} onChange={handleChange} />
                      <label for="customBooking" className="mr-0">Custom Booking</label>
                    </div>
                  </div>
                </div>
                <div className="form-group custom-radio">
                  <label>Select Meal Type</label>
                  <div className="d-flex align-content-center justify-content-start">
                    <div className="radio-block">
                      <input type="radio" id="lunch" name="mealType" value="Lunch" checked={form.mealType === 'Lunch'} onChange={handleChange} />
                      <label for="lunch" className="mr-0">Lunch</label>
                    </div>
                    <div className="radio-block">
                      <input type="radio" id="dinner" name="mealType" value="Dinner" checked={form.mealType === 'Dinner'} onChange={handleChange} />
                      <label for="dinner" className="mr-0">Dinner</label>
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
                    <input type="text" className="form-control border-right-0" placeholder="Select Date" name="date" value={form.date} onChange={handleChange} />
                    <div className="input-group-append bg-transparent">
                      <span className="input-group-text bg-transparent" id="basic-addon2"><i className="icon-calendar"></i></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Select Account</label>
                  <div className="search-wrapper">
                    <input type="text" className="form-control" placeholder="Search Department.." name="account" value={form.account} onChange={handleChange} />
                    <i className="icon-search search-icon"></i>
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea className="form-control" rows="4" placeholder="Type here.." name="notes" value={form.notes} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                  <label>Booking Count</label>
                  <input type="text" className="form-control" placeholder="100" name="bookingCount" value={form.bookingCount} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Select Employees</label>
                </div>
                {/* <div className="table-responsive">
                  <table className="table table-hover responsive nowrap table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <div className="form-group mb-0">
                            <label className="custom-checkbox">
                              <input className="checkbox__input" type="checkbox" /><span className="checkbox__checkmark"></span>
                            </label>
                          </div>
                        </th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Placeholder data, replace with dynamic content if needed */}
                      {/* <tr>
                        <td>
                          <div className="form-group mb-0">
                            <label className="custom-checkbox m-0">
                              <input className="checkbox__input" type="checkbox" /><span className="checkbox__checkmark"></span>
                            </label>
                          </div>
                        </td>
                        <td>2001</td>
                        <td>Thomas</td>
                        <td>Analytics</td>
                      </tr>

                     
                    </tbody>
                  </table>
                </div> */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-primary">Cancel</button>
                  <button type="submit" className="btn btn-primary">Book</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="table-responsive">
        <table className="table table-hover responsive nowrap table-bordered">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.employeeId}</td>
                <td>{booking.employeeName}</td>
                <td>{booking.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
    </div>
  );
};


const Booking = () => (
  <div>
    {/* <Navbar /> */}
    <Header/>
    <BookingContent />
    <Footer />
  </div>
);

export default Booking;
