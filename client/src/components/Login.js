import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {
  const navigate = useNavigate();
  const [userType] = useState("patient");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/login/patient";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify({ ...user, userType }));


      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        if (userType === "patient") {
          navigate("/services");
        }
      });
    } else {
      setError("Login failed. Check credentials.");
    }
  };

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: "url('/image_001.jpg')" }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Login</h1>
        <form onSubmit={handleLogin} className="form-container" autoComplete="off">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <button type="submit" className="hero-btn">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
