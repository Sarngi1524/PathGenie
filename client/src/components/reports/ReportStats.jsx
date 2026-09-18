import "./ReportStats.css";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaUserTie,
} from "react-icons/fa";

import { MdRoute } from "react-icons/md";

const ReportStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Deliveries",
      value: stats.totalDeliveries || 0,
      icon: <FaBoxOpen />,
      color: "#4F46E5",
    },
    {
      title: "Completed",
      value: stats.completedDeliveries || 0,
      icon: <FaCheckCircle />,
      color: "#16A34A",
    },
    {
      title: "Pending",
      value: stats.pendingDeliveries || 0,
      icon: <FaClock />,
      color: "#F59E0B",
    },
    {
      title: "Vehicles",
      value: stats.totalVehicles || 0,
      icon: <FaTruck />,
      color: "#8B5CF6",
    },
    {
      title: "Drivers",
      value: stats.totalDrivers || 0,
      icon: <FaUserTie />,
      color: "#0891B2",
    },
    {
      title: "Routes",
      value: stats.totalRoutes || 0,
      icon: <MdRoute />,
      color: "#92400E",
    },
  ];

  return (
    <div className="report-stats-grid">
      {cards.map((card, index) => (
        <div className="report-stat-card" key={index}>
          <div
            className="report-stat-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="report-stat-content">
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportStats;