import { useContext, useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaBars,
  FaCog,
  FaSearch,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { getDriverNotifications } from "../../services/driverService";
import "../../../components/Navbar/Navbar.css";

export default function DriverNavbar({ onMenuToggle = () => {}, sidebarOpen = false }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const loadNotificationCount = async () => {
    try {
      const response = await getDriverNotifications();
      setUnreadCount(Number(response.data?.unread) || 0);
    } catch (error) {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    loadNotificationCount();
    window.addEventListener("driver-notifications-updated", loadNotificationCount);
    return () =>
      window.removeEventListener("driver-notifications-updated", loadNotificationCount);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar driver-navbar">
      <div className="navbar-top">
        <button className="menu-toggle-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="navbar-greeting">
          <h2>{greeting}, {user?.name || "Driver"}!</h2>
          <p>Welcome back! Let&apos;s manage today&apos;s deliveries.</p>
        </div>

        <div className="navbar-icons">
          <div className="notification-wrapper" ref={notificationRef}>
            <button
              className="notification-btn"
              onClick={() => navigate("/driver/notifications")}
              aria-label="Open notifications"
            >
              <FaBell />
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </div>

          <button onClick={() => navigate("/driver/settings")} aria-label="Open settings">
            <FaCog />
          </button>

          <button className="logout-nav-btn" onClick={handleLogout} aria-label="Logout">
            <FaSignOutAlt />
          </button>

          <button className="profile" onClick={() => navigate("/driver/profile")} aria-label="Open profile">
            <FaUserCircle />
          </button>
        </div>
      </div>

      <form className="search-bar" onSubmit={(event) => event.preventDefault()}>
        <FaSearch />
        <input type="text" placeholder="Search your deliveries..." />
      </form>
    </header>
  );
}
