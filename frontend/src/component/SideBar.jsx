import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoClick = () => {
    if (location.pathname !== "/dashboard") {
      navigate("/dashboard");
    }
  };

  const handleLogoutConfirm = () => {
    navigate("/login");
    setShowLogoutModal(false);
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
          <li>
            <Link to="leave" style={{ textDecoration: "none", color: "black" }}>
              Leaves
            </Link>
          </li>
        </ul>
        <p>Others</p>
        <ul>
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none", color: "black" }}
              onClick={() => setShowLogoutModal(true)}
            >
              Log out
            </Link>
          </li>
        </ul>
      </nav>

      {/* logout modal confirmation */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        dialogClassName="custom-modal-width"
      >
        <Modal.Header
          style={{
            backgroundColor: "#4A0072",
            color: "white",
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Modal.Title className="w-100 text-center">Log Out</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <p style={{ fontWeight: "400", color: "black" }}>
            Are you sure you want to log out?
          </p>
          <div className="d-flex justify-content-center">
            <Button
              variant="dark"
              onClick={() => setShowLogoutModal(false)}
              className="me-3"
              style={{
                borderRadius: "20px",
                padding: "8px 20px",
                backgroundColor: "#4A0072",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleLogoutConfirm}
              style={{
                borderRadius: "20px",
                padding: "8px 20px",
                fontWeight: "700",
                border: "2px solid red",
              }}
            >
              Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <style>
        {`
          .custom-modal-width .modal-dialog {
               max-width: 700px;
          }
        `}
      </style>
    </aside>
  );
};

export default SideBar;
