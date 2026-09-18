import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DriverSidebar from "../components/DriverSidebar/DriverSidebar";
import DriverNavbar from "../components/DriverNavbar/DriverNavbar";

import "./DriverLayout.css";

export default function DriverLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {                 
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.querySelector(".driver-sidebar");
      const toggleBtn = document.querySelector(".driver-menu-toggle");

      if (
        sidebar &&
        toggleBtn &&
        !sidebar.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="driver-layout">
      <DriverSidebar isOpen={sidebarOpen} />

      <div className="driver-main">
        <DriverNavbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="driver-content">
          {children}
        </main>
      </div>
    </div>
  );
}