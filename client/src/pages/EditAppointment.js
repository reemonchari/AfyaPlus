import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../index.css";

function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    appointment_date: "",
    appointment_time: "",
    status: "",
    provider_id: "",
  });
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await fetch(`http://localhost:5000/appointments/${id}`);
      const data = await response.json();
      
      // Extract date and time from ISO string
      const [date, timeWithMs] = data.appointment_time.split("T");
      const time = timeWithMs?.slice(0, 5); // Keep only HH:MM

      setAppointment({
        appointment_date: date,
        appointment_time: time,
        status: data.status,
        provider_id: data.provider.id,
      });

      // Fetch providers who offer the same service as the appointment
      fetchProviders(data.service.id);
    };

    const fetchProviders = async (serviceId) => {
      const response = await fetch(`http://localhost:5000/providers/by-service/${serviceId}`);
      const data = await response.json();
      setProviders(data);
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentTime = `${appointment.appointment_date}T${appointment.appointment_time}`;
    const response = await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appointment_time: appointmentTime,
        status: appointment.status,
        provider_id: appointment.provider_id,
      }),
    });

    if (response.ok) {
      const patient = JSON.parse(localStorage.getItem("user"));
      navigate(`/my-appointments/${patient?.id}`);
    }
  };

  return (
    <div className="hero-container" style={{ backgroundImage: "url('/image_001.jpg')" }}>
      <div className="hero-text">
        <h1 className="hero-title">Edit Appointment</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="provider-select">Change Provider (optional):</label>
          <select
            id="provider-select"
            name="provider_id"
            value={appointment.provider_id}
            onChange={handleChange}
          >
            <option value="">Select a provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name} ({provider.specialty})
              </option>
            ))}
          </select>

          <label htmlFor="appointment-date">New Date:</label>
          <input
            id="appointment-date"
            type="date"
            name="appointment_date"
            value={appointment.appointment_date}
            onChange={handleChange}
            required
          />

          <label htmlFor="appointment-time">New Time:</label>
          <input
            id="appointment-time"
            type="time"
            name="appointment_time"
            value={appointment.appointment_time}
            onChange={handleChange}
            required
          />

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={appointment.status}
            onChange={handleChange}
            required
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button type="submit" className="hero-btn">Update Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default EditAppointment;
