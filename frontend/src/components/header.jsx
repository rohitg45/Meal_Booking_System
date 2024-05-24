import { Link, useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logOut =async()=>{
    const res = await fetch('http://localhost:8000/api/user/logout', {
      method: 'delete',
      withCredentials: true,
      credentials:'include',
    });

    const data = await res.json();

    if(data.success){
      alert("logout successfully");
       navigate("/");
      return;
    }
    
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <div className="container head">
            <Link to="/" className="navbar-brand">
              <div className="logoW-wrapper">
                <img src="../images/logo-white.svg" alt="Rishabh Software" />
                <span>Meal Facility</span>
              </div>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/calendar">Calendar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/booking">Booking List</Link>
                </li>
                <li className="nav-item"> 
                  <Link className="nav-link" to="/addEmployee">Add User</Link>
                </li>
              </ul>
              <div className="h-100 d-lg-inline-flex align-items-center">
                <ul className="app-nav">
                  {/* Notification Menu */}
                  <li className="dropdown">
                    <Link className="app-nav__item notification-num" to="#" data-toggle="dropdown" aria-label="Show notifications"><i className="icon-bell"></i>
                      <span className="num">5</span>
                    </Link>
                  </li>
                  {/* User Menu */}
                  <li className="dropdown">
                    <Link className="app-nav__item dropdown-toggle" to="#" data-toggle="dropdown" aria-label="Open Profile Menu">Admin</Link>
                    <ul className="dropdown-menu settings-menu dropdown-menu-right">
                      <li><Link className="dropdown-item" to="#" data-toggle="modal" data-target="#changepwdModal">Change Password</Link></li>
                      <li><Link className="dropdown-item" onClick={logOut}>Logout</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Header