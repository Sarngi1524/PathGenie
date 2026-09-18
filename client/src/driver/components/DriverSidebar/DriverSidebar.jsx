import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiTruck,
  FiDollarSign,
  FiClock,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import "./DriverSidebar.css";

export default function DriverSidebar({ isOpen = false }) {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`driver-sidebar ${isOpen ? "active" : ""}`}>
      <div className="driver-sidebar-top">
        <div className="driver-logo">
          <img
            src="/images/logo.png"
            alt="PathGenie"
          />

          <h2>PathGenie</h2>
        </div>

        <div className="driver-profile">
          <img
            src={
              user?.avatar ||
              "/images/default-avatar.png"
            }
            alt="Driver"
          />

          <div>
            <h4>{user?.name}</h4>
            <span>Driver</span>
          </div>
        </div>

        <nav>

          <NavLink
            to="/driver/dashboard"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/driver/deliveries"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiTruck />
            My Deliveries
          </NavLink>

          <NavLink
            to="/driver/earnings"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiDollarSign />
            Earnings
          </NavLink>

          <NavLink
            to="/driver/attendance"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiClock />
            Attendance
          </NavLink>

          <NavLink
            to="/driver/notifications"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiBell />
            Notifications
          </NavLink>

          <NavLink
            to="/driver/profile"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiUser />
            Profile
          </NavLink>

          <NavLink
            to="/driver/settings"
            className={({ isActive }) => isActive ? "driver-link active" : "driver-link"}
            onClick={(e) => e.stopPropagation()}
          >
            <FiSettings />
            Settings
          </NavLink>

        </nav>
      </div>

      <button
        className="driver-logout-btn"
        onClick={handleLogout}
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}