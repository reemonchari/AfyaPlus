import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button className="hero-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
