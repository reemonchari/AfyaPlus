import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";

function PatientRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccess("Registration successful! Redirecting to services...");
      setTimeout(() => {
        navigate("/services");
      });
    } else {
      setError("Error registering patient. Please try again.");
    }
  };

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: "url('/image_001.jpg')" }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Patient Registration</h1>
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="form-container" autoComplete="off">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="hero-btn">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default PatientRegistration;
