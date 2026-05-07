import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

const NavbarFarmer = () => {
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
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onStorage);
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Logout?',
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    });
    if (!result.isConfirmed) return;
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName(null);
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/farmerupload">
          <span>
            <b className="single">F</b>arm<b className="single">H</b>ub
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#farmerNavbar"
          aria-controls="farmerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="farmerNavbar">

          <div className="d-flex navbar-nav ms-auto align-items-center">
            {token ? (
              <>
                <Link className="nav-link me-2" to="/farmerupload">
                  <i className="bi bi-house-door me-1"></i> Home
                </Link>
                <Link className="nav-link me-2" to="/askfarmer">
                  <i className="bi bi-question-circle me-1"></i> Ask Doubt
                </Link>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle fw-semibold"
                    type="button"
                    id="farmerUserMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {userName || "Farmer"}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="farmerUserMenu"
                  >
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link
                to="/login/farmer"
                className="btn btn-primary fw-semibold pe-4 ps-4 fs-6"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarFarmer;
