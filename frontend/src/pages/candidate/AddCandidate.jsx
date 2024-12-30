import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../cssFiles/addCandidate.css";
import axios from "axios";
const BackendUrl = process.env.REACT_APP_BACKEND_URL;
console.log("backend url in add candidate :", BackendUrl);

const AddCandidate = () => {
  
  const [isModalVisible, setIsModalVisible] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const BackendUrl = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("position", data.position);
      formData.append("experience", data.experience);
      formData.append("resume", data.resume[0]); // File input

      const response = await axios.post(
        `${BackendUrl}/addcandidate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response);
      console.log("candidate_details:", response.data);
      alert("Candidate added successfully!");

      // Reset the form after successful submission
      reset();
      setIsModalVisible(false);

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add candidate. Please try again.");
    }
  };
  
  if(!isModalVisible){
    return null;
  }

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
            <label>Profile*</label>
              <select {...register("position", { required: "Profile is required" })} >
              <option style={{fontWeight:"bold"}}>Select Profile</option>
              <option>Mern</option>
              <option>PHP</option>
              <option>Designer</option>
              <option>UI/UX</option>
              <option>Python</option>
              <option>Java</option>
            </select>
            {errors.position && (
              <p className="error">{errors.position.message}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Experience*</label>
            <select {...register("experience", {required: "Experience is required",})}>
              <option style={{fontWeight:"bold"}}>Select Experience</option>
              <option>Fresher</option>
              <option>Experienced</option>
            </select>

            {errors.experience && (
              <p className="error">{errors.experience.message}</p>
            )}
          </div>
          <div className="input-group">
            <label>Resume*</label>
            <input
              type="file"
              {...register("resume", { required: "Resume is required" })}
            />
            {errors.resume && <p className="error">{errors.resume.message}</p>}
          </div>
        </div>

        <div className="form-row checkbox-row">
          <label>
            <input
              type="checkbox"
              {...register("declaration", {
                required: "You must accept the declaration",
              })}
            />
            I hereby declare that the above information is true to the best of
            my knowledge and belief
          </label>
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

export default AddCandidate;
