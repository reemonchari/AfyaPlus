import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../index.css";

function AppointmentPage() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [serviceName, setServiceName] = useState('');
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceId) {
        console.error("Service ID is missing.");
        return;
      }

      try {
        const serviceResponse = await fetch(`http://localhost:5000/services/${serviceId}`);
        if (!serviceResponse.ok) throw new Error("Service not found");
        const serviceData = await serviceResponse.json();
        setServiceName(serviceData.name);

        const providersResponse = await fetch(`http://localhost:5000/providers/by-service/${serviceId}`);
        if (!providersResponse.ok) throw new Error("No providers found for this service");
        const providersData = await providersResponse.json();
        setProviders(providersData);
      } catch (error) {
        console.error("Error fetching service or providers:", error);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const patient = storedUser && storedUser.user_type === "patient" ? storedUser : null;

    if (!patient) {
      setErrorMessage("You need to be logged in to book an appointment.");
      setTimeout(() => {
        navigate("/login");
      });
      return;
    }

    const appointmentDateTime = `${appointmentDate}T${appointmentTime}`;

    const response = await fetch("http://localhost:5000/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider_id: selectedProvider,
        patient_id: patient.id,
        service_id: serviceId,
        appointment_time: appointmentDateTime,
      }),
    });

    if (response.ok) {
      setSuccessMessage("Appointment booked successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(`/my-appointments/${patient.id}`);
      }, 2000);
    } else {
      const error = await response.json();
      console.error("Error booking appointment:", error);
      setErrorMessage("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="hero-container" style={{ backgroundImage: "url('/image_001.jpg')" }}>
      <div className="hero-text">
        <h1 className="hero-title">Book an Appointment for {serviceName}</h1>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="provider-select">Select a provider:</label>
          <select
            id="provider-select"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            required
          >
            <option value="">Select a provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name} ({provider.specialty})
              </option>
            ))}
          </select>

          <label htmlFor="appointment-date">Select a date:</label>
          <input
            id="appointment-date"
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />

          <label htmlFor="appointment-time">Select a time:</label>
          <input
            id="appointment-time"
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />

          <button type="submit" className="hero-btn">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentPage;
