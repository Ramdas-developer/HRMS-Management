import React, { useEffect } from "react";
import "../cssFiles/addCandidate.css";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddEmployee = ({employee, onClose}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const BackendUrl = process.env.REACT_APP_BACKEND_URL;


  const onSubmit = async (data) => {
    console.log("data------>",data)
    try {
      let response;
      if(employee){
        console.log("employee------->",employee)
        console.log("employee id------->",employee._id)
        response = await axios.put(`${BackendUrl}/updateEmployee/${employee._id}`, data);
        alert("Employee updated Successfully!");
      }else{
        response = await axios.post(`${BackendUrl}/addemployee`, data);
        alert("Employee added successfully!");
      }
      
      console.log("Response:", response);
      console.log("Employee_details:", response.data);
      onClose();
      
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to edit Employee. Please try again.");
    }
  };

  useEffect(()=>{
    if(employee){
      setValue("name", employee.name);
      setValue("email", employee.email);
      setValue("phone", employee.phone);
      setValue("position", employee.position);
      setValue("department", employee.department);
    }else{
      reset();
    }
  },[employee,setValue]);

  return (
    <div className="add-candidate-modal">
      <h2 className="modal-header">{employee ? "Edit Employee" : "Add New Candidate"}</h2>
      <form className="add-candidate-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="input-group">
            <label>Full Name*</label>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="input-group">
            <label>Email Address*</label>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Phone Number*</label>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
          <div className="input-group">
            <label>Position*</label>
            
            <select {...register("position", { required: "Position is required" })} >
              <option style={{fontWeight:"bold"}}>Select Position</option>
              <option>Developer</option>
              <option>Trainee</option>
              <option>Intern</option>
            </select>
            {errors.position && (
              <p className="error">{errors.position.message}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Department*</label>
            
           <select {...register("department", {required: "Department is required"})} >
              <option style={{fontWeight:"bold"}}>Select Department</option>
              <option>Mern</option>
              <option>PHP</option>
              <option>Designer</option>
              <option>UI/UX</option>
              <option>Python</option>
              <option>Java</option>
            </select>
            {errors.department && (
              <p className="error">{errors.department.message}</p>
            )}
          </div>
        </div>

        <div className="form-row checkbox-row">
          <div className="input-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register("declaration", {
                  required: "You must accept the declaration",
                })}
              />
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </label>
          </div>
          {errors.declaration && (
            <p className="error">{errors.declaration.message}</p>
          )}
        </div>

        <button type="submit" className="save-btn">
          { employee ? "update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
