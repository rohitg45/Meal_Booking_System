import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from './header';
import Footer from './footer';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const getCircles = (employees, nonEmployees, customBooking )=>{
return <>
<span className='circle emp'>{employees}</span>
<span className='circle nemp'>{nonEmployees}</span>
<span className='circle cb'>{customBooking}</span>
</>
}
const Calendar = () => {
  // Sample events for the calendar
  const [events, setEvents] = useState([
    {
      id: 0,
      title: getCircles(100,130, 50),
      start: new Date(2024, 4, 29, 10, 0), // June 29, 2023, 10:00 AM
      end: new Date(2024, 4, 29, 12, 0),   // June 29, 2023, 12:00 PM
    },
    {
      id: 1,
      title: getCircles(111, 453, 33),
      start: new Date(2024, 4, 31, 19, 0), // June 30, 2023, 7:00 PM
      end: new Date(2024, 4, 31, 21, 0),   // June 30, 2023, 9:00 PM
    },
    // Add more events here
  ]);

  return (
    <>
      {/* Navbar */}
      <Header />
      {/* Navbar End */}

      <div className="container-fluid">
        <div className="calendar-wrapper">
          <div className="container">
            <h3 className="main-title">Calendar</h3>
            <div className="row">
              <div className="col-lg-9">
                <div className="tile">
                  <BigCalendar
                    localizer={localizer}
                    events={events}
                    defaultDate={new Date()}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="tile">
                  <h3 className="tile-title">Saturday, 19 Dec 2022</h3>
                  <div className="booking-wrapper">
                    <div className="booking-block">
                      <h5>Bookings</h5>
                      <Link to="#" aria-label="Add Employees"><img src="../images/add-btn-1.svg" alt="Add" /></Link>
                    </div>
                    <div className="booking-block employees">
                      <div className="booking-block-lt">
                        <div className="icon-block"><i className="icon-employees"></i></div>
                        <div className="info-block">
                          <h5>Employees</h5>
                          <h3>200</h3>
                        </div>
                      </div>
                      <Link to="#" aria-label="Add Employees"><img src="images/add-btn-2.svg" alt="Add" /></Link>
                    </div>
                    <div className="booking-block non-employees">
                      <div className="booking-block-lt">
                        <div className="icon-block"><i className="icon-employees"></i></div>
                        <div className="info-block">
                          <h5>Non Employees</h5>
                          <h3>160</h3>
                        </div>
                      </div>
                      <Link to="#" aria-label="Add Employees"><img src="images/add-btn-2.svg" alt="Add" /></Link>
                    </div>
                    <div className="booking-block buffer">
                      <div className="booking-block-lt">
                        <div className="icon-block"><i className="icon-buffer"></i></div>
                        <div className="info-block">
                          <h5>Buffer</h5>
                          <h3>180</h3>
                        </div>
                      </div>
                      <Link to="#" aria-label="Add Buffer"><img src="images/add-btn-2.svg" alt="Add" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      {/* Footer End */}
    </>
  );
}

export default Calendar;
