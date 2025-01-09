import React, { useState } from "react";
import "../pages/cssFiles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl, "url backend");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(">>>>>>>>>>>>>>>>>>>", email, password);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      alert("Login successful!");
      navigate("/dashboard");
      console.log("login successful :", response.data);
      console.log("response", response);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-section">
          <h2 className="haeding2">HRMS Login</h2>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="btn-login">
              Log In
            </button>

            <div className="register-link">
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
        {/* <div className="image-section">
        <img src="path-to-dashboard-image.jpg" alt="Dashboard" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </p>
      </div> */}
      </div>
    </>
  );
};

export default Login;
