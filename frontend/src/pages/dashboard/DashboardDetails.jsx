import React, { useEffect, useState } from 'react'
import "../cssFiles/dashboard.css";
import axios from 'axios';

const DashboardDetails = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [totalEmployees, setTotalEmployees] = useState([]); 
    const [newCandidates, setNewCandidates] = useState([]); 
    
    const BackendUrl = process.env.REACT_APP_BACKEND_URL;

    const AllCandidate = async () => {
        try {
          const response = await axios.get(`${BackendUrl}/allcandidate`);
          setNewCandidates(response.data.All_candidate || []);          
        } catch (error) {
          console.error("Error fetching candidates :", error);
          setNewCandidates([]);
        }
    };

    const AllEmployee = async() => {
      try {
        const response = await axios.get(`${BackendUrl}/allemployee`);
        setTotalEmployees(response.data.All_Employee || []);
        console.log("response :",response)
      } catch (error) {
        console.error("Error fetching candidates :", error);
        setTotalEmployees([]);
      }
    }


    useEffect(() => {
      AllEmployee();
      AllCandidate();

        const timer = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer); 
      }, [BackendUrl]);
  return (
    <div>
        <div className="dashboard-overview">
          <div className="overview-card">
            <h3>Total Employees</h3>
            <p>{totalEmployees.length}</p>
          </div>

          <div className="overview-card">
            <h3>New Candidates</h3>
            <p>{newCandidates.length}</p>
          </div>

          <div className="overview-card">
            <h3>Current Date & Time</h3>
            <p>{currentDateTime.toLocaleString()}</p>
          </div>
        </div>

    </div>
  )
}

export default DashboardDetails