import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user ? true : false;
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const goToProfile = () => {
    if (user.userType === "patient") {
      navigate(`/patient-profile/${user.id}`);
    }
  };  

  return (
    <nav className="navbar-container">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        AfyaPlus
      </div>
      <div className="navbar-links">
        <button className="navbar-btn" onClick={() => navigate("/")}>Home</button>
        <button className="navbar-btn" onClick={() => navigate("/services")}>Services</button>
        
        {isLoggedIn ? (
          <>
            <button className="navbar-btn" onClick={goToProfile}>Manage Profile</button>
            <button className="navbar-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="navbar-btn" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
