import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: "url('/image_001.jpg')" }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Welcome to AfyaPlus</h1>
        <p className="hero-subtitle">Connecting Patients to Trusted Healthcare Providers</p>
        <div className="home-buttons">
          <button className="hero-btn" onClick={() => navigate("/patient-registration")}>
            Register as a Patient
          </button>
          <button className="hero-btn" onClick={() => navigate("/services")}>
            View Services
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
