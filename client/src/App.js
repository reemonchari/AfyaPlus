import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PatientRegistration from './pages/PatientRegistration';
import PatientProfile from './pages/PatientProfile';
import EditPatient from './pages/EditPatient';
import AppointmentPage from './pages/AppointmentPage';
import MyAppointment from './pages/MyAppointment';
import ServicePage from './pages/ServicePage';
import EditAppointment from './pages/EditAppointment';

import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import Navbar from './components/Navbar';

import './index.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/patient-profile/:id" element={<PatientProfile />} />
        <Route path="/edit-patient/:id" element={<EditPatient />} />
        <Route path="/book-appointment/:serviceId" element={<AppointmentPage />} />
        <Route path="/my-appointments/:id" element={<MyAppointment />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/edit-appointment/:id" element={<EditAppointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
}

export default App;
