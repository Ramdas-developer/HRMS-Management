import React, { useEffect, useState } from "react";
import axios from "axios";
import "../cssFiles/attendance.css";

const Leaves = () => {
  const [employee, setEmployee] = useState([]);
  const [status, setStatus] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [FilteredEmployee, setFilteredEmployee] = useState([]);

  const BackendUrl = process.env.REACT_APP_BACKEND_URL;
  const EmployeeAttendance = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/allemployee`);
      setEmployee(response.data.All_Employee);
      setFilteredEmployee(response.data.All_Employee);

      const initialStatus = {};
      response.data.All_Employee.forEach((candidate) => {
        initialStatus[candidate._id] = "present";
      });
      setStatus(initialStatus);

      console.log("response:", response);
    } catch (error) {
      console.log("Error fetching candidate :", error);
      setEmployee([]);
      setFilteredEmployee([]);
    }
  };

  useEffect(() => {
    EmployeeAttendance();
  }, []);

  const handleStatusChange = (id, value) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [id]: value,
    }));
  };

  const getOptionStyle = (value) => {
    return {
      color:
        value === "present" ? "green" : value === "absent" ? "red" : "black",
      fontWeight: "bold",
    };
  };

  const handleSearch = (e) =>{
    const Query = e.target.value.toLowerCase();
    setSearchQuery(Query);
    console.log("Query :",Query)

    const filtered = employee.filter((person)=>person.name.toLowerCase().includes(Query) || person.email.toLowerCase().includes(Query) || person.position.toLowerCase().includes(Query) || person.department.toLowerCase().includes(Query));
    setFilteredEmployee(filtered);
    console.log("filteredEmployee :",filtered);
  };

  const DeleteEmployee = async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${BackendUrl}/deleteEmployee/${id}`);
      console.log("response of delete :",response);

      if(response.status === 200){
         alert("Employee Deleted Succesfully.");
         setEmployee((prevEmployees)=>prevEmployees.filter((employee)=>employee._id !== id));
         setFilteredEmployee((prevFilters)=>prevFilters.filter((one)=>one._id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again."); 
    }
  }

  return (
    <div className="candidates">
      <div className="filters">
        <h2>Leaves</h2>
        <select>
          <option style={{ fontWeight: "bold" }}>Status</option>
          <option>Present</option>
          <option>Absent</option>
        </select>
        <div className="nav-end">
          <input
            className="candidate-search"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
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
            <th>Email Id</th>
            <th>Position</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {FilteredEmployee && FilteredEmployee.map((candidate, index) => (
            <tr key={candidate._id || index}>
              <td>{index + 1}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.position}</td>
              <td>{candidate.department}</td>
              <td>
                <select className="selectstatus"  name="status" id="status" value={status[candidate._id]} onChange={(e) => handleStatusChange(candidate._id, e.target.value)} style={getOptionStyle(status[candidate._id])}>
                  <option value="present" style={{ color: "green", borderRadius:"50%" }}>
                    Present
                  </option>
                  <option value="absent" style={{color: "red"}}>Absent</option>
                </select>
              </td>
              <td className='editdelete-btn'>
                <button className='editEmployee-btn'>Edit</button>
                <button className='deleteEmployee-btn' onClick={()=>DeleteEmployee(employee._id)} >Delete</button>
            </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaves;
