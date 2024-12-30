import React from "react";
import "../cssFiles/dashboard.css";
import SideBar from "../../component/SideBar";
import Topbar from "../../component/Topbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />

      <div className="main-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
