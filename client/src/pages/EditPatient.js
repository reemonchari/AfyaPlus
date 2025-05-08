import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../index.css";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch(`http://localhost:5000/patients/${id}`);
      const data = await response.json();
      setFormData({ ...data, password: "" });
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/patients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate(`/patient-profile/${id}`);
    } else {
      console.error("Error updating patient details");
    }
  };

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: "url('/image_001.jpg')" }}
    >
      <div className="hero-text">
        <h1 className="hero-title">Edit Patient Profile</h1>
        <form onSubmit={handleSubmit} className="form-container">
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
          <button type="submit" className="hero-btn">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditPatient;
