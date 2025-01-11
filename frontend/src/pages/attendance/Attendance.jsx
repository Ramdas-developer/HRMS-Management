import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Attendance = () => {
  const[employee,setEmployee] = useState([])

  const BackendUrl = process.env.REACT_APP_BACKEND_URL;
  const EmployeeAttendance = async() =>{
    try {
      const response = await axios.get(`${BackendUrl}/allemployee`);
      setEmployee(response.data.All_Employee)
      console.log("response:",response )

    } catch (error) {
      console.log("Error fetching candidate :", error);
      setEmployee([]);
    }
  }

  useEffect(()=>{
    EmployeeAttendance();
  },[]);

  return (
    
    <div className="candidates">
      <div className="filters">
        <h2>Attendance</h2>
        <select>
          <option style={{fontWeight:"bold"}}>Status</option>
          <option>Present</option>
          <option>Absent</option>
        </select>
        <div className="nav-end">
          <input
            className="candidate-search"
            type="text"
            placeholder="Search"
            // value={searchQuery}
            // onChange={handleSearch}
          />
          {/* <button
            className="button-addcandidate"
            // onClick={() => setShowModel(true)}
          >
            Add New Candidate
          </button> */}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sr. no.</th>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
              employee.map((candidate, index) => (
              <tr key={candidate._id || index}>
                <td>{index + 1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.position}</td>
                <td>{candidate.department}</td>
                <td>
                  <select name="status" id="present">
                    <option value="present" style={{color:"green"}}>Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
                <td>{candidate.experience}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    
  )
}

export default Attendance;