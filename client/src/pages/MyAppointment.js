import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../index.css";

function MyAppointment() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch(`http://localhost:5000/appointments?patient_id=${id}`);
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, [id]);

  const handleDelete = async (appointmentId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmed) return;

    const response = await fetch(`http://localhost:5000/appointments/${appointmentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appt) => appt.id !== appointmentId)
      );
    } else {
      alert("Failed to delete appointment.");
    }
  };

  const handleEdit = (appointmentId) => {
    navigate(`/edit-appointment/${appointmentId}`);
  };

  return (
    <div className="hero-container" style={{ backgroundImage: "url('/image_001.jpg')" }}>
      <div className="hero-text">
        <h1 className="hero-title">My Appointments</h1>

        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <p><strong>Provider:</strong> {appointment.provider.name}</p>
                <p><strong>Date:</strong> {new Date(appointment.appointment_time).toLocaleString()}</p>
                <p><strong>Status:</strong> {appointment.status}</p>

                <div className="button-group">
                  <button className="hero-btn" onClick={() => handleEdit(appointment.id)}>
                    Edit Appointment
                  </button>
                  <button className="hero-btn" onClick={() => handleDelete(appointment.id)}>
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointment;
