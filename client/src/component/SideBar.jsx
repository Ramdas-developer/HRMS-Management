import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    if (location.pathname !== "/login") {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        navigate("/login");
      } else return;
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img
          src="/Hrms logo.webp"
          alt="logo"
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <nav>
        <p>Recruitment</p>
        <ul>
          <li>
            <Link
              to="candidate"
              style={{ textDecoration: "none", color: "black" }}
            >
              Candidates
            </Link>
          </li>
        </ul>
        <p>Organization</p>
        <ul>
          <li>
            <Link
              to="employees"
              style={{ textDecoration: "none", color: "black" }}
            >
              Employees
            </Link>
          </li>
          <li>
            <Link
              to="attendance"
              style={{ textDecoration: "none", color: "black" }}
            >
              Attendance
            </Link>
          </li>
          <li>Leaves</li>
        </ul>
        <p>Others</p>
        <ul>
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleLogout}
            >
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
