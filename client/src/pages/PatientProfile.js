import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../index.css";

function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch(`http://localhost:5000/patients/${id}`);
      const data = await response.json();
      setPatient(data);
    };
    fetchPatient();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete your profile?");
    if (!confirm) return;

    const response = await fetch(`http://localhost:5000/patients/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      localStorage.removeItem("user");
      navigate("/");
    } else {
      console.error("Failed to delete patient profile");
    }
  };

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: "url('/image_001.jpg')" }}
    >
      <div className="hero-text">
        {patient ? (
          <>
            <h1 className="hero-title">{patient.name}</h1>
            <p>Email: {patient.email}</p>
            <p>Age: {patient.age}</p>
            <p className="quote">"Your health is your wealth. Invest in it daily."</p>
            <button
              className="hero-btn"
              onClick={() => navigate(`/edit-patient/${id}`)}
            >
              Edit Profile
            </button>
            <button
              className="hero-btn"
              onClick={() => navigate(`/my-appointments/${id}`)}
            >
              My Appointments
            </button>
            <button
              className="hero-btn danger"
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default PatientProfile;
