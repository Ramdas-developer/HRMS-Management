import React from "react";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="logo-container">
        <h1 className="topbar-title">HRMS Management</h1>
      </div>
      <div className="topbar-icons">
        <button className="icon-btn">📧</button>
        <button className="icon-btn">🔔</button>
        <div className="user-profile">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="profile-pic"
          />
          <button className="dropdown-btn">▼</button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;