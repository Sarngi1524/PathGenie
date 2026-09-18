import "./Navbar.css";
import {
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import NotificationDropdown from "../notifications/NotificationDropdown";

import { AuthContext } from "../../context/AuthContext";
import { getNotificationStats } from "../../services/notificationService";

export default function Navbar({ onMenuToggle = () => {}, sidebarOpen = false }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  // Fetch notification count
  const fetchNotificationStats = async () => {
    try {
      const res = await getNotificationStats();

      setUnreadCount(res.data.unread);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotificationStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleProfile = () => {
    navigate("/settings#profile-settings");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-top">
        {/* Mobile Menu Toggle */}
        <button 
          className="menu-toggle-btn"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="navbar-greeting">
          <h2>{greeting}, Sarngi!!</h2>

          <p>
            Welcome back! Let's optimize today's deliveries.
          </p>
        </div>

        <div className="navbar-icons">
          {/* Notification */}

          <div
            className="notification-wrapper"
            ref={notificationRef}
          >
            <button
              className="notification-btn"
              onClick={() =>
                setShowNotifications((prev) => !prev)
              }
            >
              <FaBell />

              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationDropdown
                onClose={() =>
                  setShowNotifications(false)
                }
                refreshStats={fetchNotificationStats}
              />
            )}
          </div>

          {/* Settings */}

          <button onClick={handleSettings} aria-label="Open settings">
            <FaCog />
          </button>

          {/* Logout */}

          <button
            className="logout-nav-btn"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <FaSignOutAlt />
          </button>

          {/* Profile */}

          <button
            className="profile"
            onClick={handleProfile}
            aria-label="Open profile settings"
          >
            <FaUserCircle />
          </button>
        </div>
      </div>

      <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
        <FaSearch />

        <input
          type="text"
          placeholder="Search deliveries, routes, drivers..."
        />
      </form>
    </header>
  );
}