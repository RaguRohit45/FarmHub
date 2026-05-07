import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css"
const NavbarHome = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserName(localStorage.getItem("userName"));
    const onStorage = () => {
      setToken(localStorage.getItem("token"));
      setUserName(localStorage.getItem("userName"));
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('auth-changed', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('auth-changed', onStorage);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      setToken(null);
      setUserName(null);
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                  <span><b className="single">F</b>arm<b className="single">H</b>ub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#farmhubNavbar"
          aria-controls="farmhubNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="farmhubNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
            <li className="nav-item ms-3">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="nav-link" to="/about">
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>
            {token && (
              <>
                <li className="nav-item ms-3">
                  <Link className="nav-link" to="/ask">
                    <i className="bi bi-question-circle me-1"></i> Ask Doubt
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link className="nav-link" to="/learn">
                    <i className="bi bi-lightbulb me-1"></i> Learn
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex">
            {token ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle fw-semibold"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2"></i>{userName || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary fw-semibold pe-4 ps-4 fs-6">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
