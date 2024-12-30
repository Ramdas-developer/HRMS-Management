import React from "react";
import "../cssFiles/addCandidate.css";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const BackendUrl = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BackendUrl}/addemployee`,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          position: data.position,
          department: data.department,
        }
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      console.log("Response:", response);
      console.log("Employee_details:", response.data);
      alert("Employee added successfully!");

      // Reset the form after successful submission
      reset();
      // navigate("")
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add candidate. Please try again.");
    }
  };

  return (
    <div className="add-candidate-modal">
      <h2 className="modal-header">Add New Candidate</h2>
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
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
