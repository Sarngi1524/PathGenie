import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import {
  MdDashboard,
  MdLocalShipping,
  MdDirections,
  MdSettings,
} from "react-icons/md";

import {
  FaTruck,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import Logo from "../common/Logo/Logo";

export default function Sidebar({ isOpen = false }) {
  const { user } = useContext(AuthContext);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      title: "Deliveries",
      icon: <MdLocalShipping />,
      path: "/deliveries",
    },
    {
      title: "Fleet",
      icon: <FaTruck />,
      path: "/fleet",
    },
    {
      title: "Drivers",
      icon: <FaUsers />,
      path: "/drivers",
    },
    {
      title: "Routes",
      icon: <MdDirections />,
      path: "/routes",
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: <MdSettings />,
      path: "/settings",
    },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "active" : ""}`}>

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
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="menu-icon">
              {item.icon}
            </span>

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
            <h4>{user?.name || "User"}</h4>
            <p>{user?.role === "driver" ? "Driver" : "Administrator"}</p>
          </div>
        </div>
      </div>

    </aside>
  );
}