import React from "react";
import "../pages/cssFiles/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl, "url backend");

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${backendUrl}/signup`, data);
      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message || "Something went wrong");
      }
      navigate('/login');
      console.log("response", response);
      console.log("admin details:", response.data)
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the admin");
    }
  };

  return (
    <div>
      <div className="auth-container">
        <div className="auth-form-section">
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>HRMS Signup</h2>

            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                type="text"
                id="name"
                placeholder="Full name"
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                id="phone"
                placeholder="Phone No."
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone number can't exceed 15 digits",
                  },
                })}
              />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="btn-register">
              Register
            </button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
