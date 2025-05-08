import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";

function ServicePage() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/services");
        const data = await response.json();
        console.log(data);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleBooking = (serviceId) => {
    navigate(`/book-appointment/${serviceId}`);
  };

  return (
    <div
      className="service-page-container"
      style={{ backgroundImage: "url('/image_001.jpg')" }}
    >
      <div className="service-page-content">
        <h1 className="hero-title">Our Services</h1>
        <div className="services-list">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="service-item">
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <h3>Providers:</h3>
                <ul>
                  {service.providers && service.providers.length > 0 ? (
                    service.providers.map((provider) => (
                      <li key={provider.id}>
                        {provider.name} - {provider.location}
                      </li>
                    ))
                  ) : (
                    <li>No providers available for this service.</li>
                  )}
                </ul>
                <button className="hero-btn" onClick={() => handleBooking(service.id)}>
                  Book Appointment
                </button>
              </div>
            ))
          ) : (
            <p>Loading services...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
