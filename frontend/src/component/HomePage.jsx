import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/cssFiles/home.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to the HRMS Dashboard pleas continue</h1>
      <button className="homebtn" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default HomePage;
