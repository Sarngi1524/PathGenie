import { useContext, useEffect, useState } from "react";
import {
  FiBell,
  FiSearch,
  FiSun,
  FiMoon,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { applyTheme, getStoredTheme } from "../../../utils/themeUtils";

import "./DriverNavbar.css";

export default function DriverNavbar({ onMenuToggle, sidebarOpen = false }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(getStoredTheme());

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/driver/settings");
  };

  const handleProfile = () => {
    navigate("/driver/profile");
  };

  return (
    <header className="driver-navbar">

      <button
        className="driver-menu-toggle"
        onClick={onMenuToggle}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="driver-navbar-left">

        <h2>
          {greeting},{" "}
          <span>{user?.name || "Driver"} 👋</span>
        </h2>

        <p>{today}</p>

      </div>

      <div className="driver-navbar-right">

        <div className="driver-search">

          <FiSearch />

          <input
            type="text"
            placeholder="Search deliveries..."
          />

        </div>

        <button
          className="theme-btn"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <button
          className="notification-btn"
          onClick={() => navigate("/driver/notifications")}
          aria-label="Open notifications"
        >
          <FiBell />
          <span>3</span>
        </button>

        <button
          className="driver-icon-btn"
          onClick={handleSettings}
          aria-label="Open settings"
        >
          <FiSettings />
        </button>

        <button
          className="driver-icon-btn"
          onClick={handleProfile}
          aria-label="Open profile"
        >
          <img
            src={
              user?.avatar ||
              "/images/default-avatar.png"
            }
            alt="Driver"
          />
        </button>

        <button
          className="driver-icon-btn logout-btn"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <FiLogOut />
        </button>

      </div>

    </header>
  );
}