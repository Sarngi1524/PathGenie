import { NavLink } from "react-router-dom";
import { useContext } from "react";
import {
  FiHome,
  FiTruck,
  FiDollarSign,
  FiClock,
  FiBell,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

import { AuthContext } from "../../../context/AuthContext";
import Logo from "../../../components/common/Logo/Logo";
import "../../../components/Sidebar/Sidebar.css";

export default function DriverSidebar({ isOpen = false }) {
  const { user } = useContext(AuthContext);

  const menuItems = [
    { title: "Dashboard", icon: <FiHome />, path: "/driver/dashboard" },
    { title: "Deliveries", icon: <FiTruck />, path: "/driver/deliveries" },
    { title: "Earnings", icon: <FiDollarSign />, path: "/driver/earnings" },
    { title: "Attendance", icon: <FiClock />, path: "/driver/attendance" },
    { title: "Notifications", icon: <FiBell />, path: "/driver/notifications" },
    { title: "Profile", icon: <FiUser />, path: "/driver/profile" },
    { title: "Settings", icon: <FiSettings />, path: "/driver/settings" },
  ];

  return (
    <aside className={`sidebar driver-sidebar ${isOpen ? "active" : ""}`}>
      <div className="sidebar-logo">
        <Logo />
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={(event) => event.stopPropagation()}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar avatar-illustration" aria-hidden="true">
            <FaUserCircle />
          </div>
          <div className="user-info">
            <h4>{user?.name || "Driver"}</h4>
            <p>Driver</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
