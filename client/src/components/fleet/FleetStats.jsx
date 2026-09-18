import "./FleetStats.css";
import {
  FaTruck,
  FaCheckCircle,
  FaRoute,
  FaTools,
} from "react-icons/fa";

const FleetStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Vehicles",
      value: stats?.totalVehicles || 0,
      icon: <FaTruck />,
      className: "total",
    },
    {
      title: "Available",
      value: stats?.availableVehicles || 0,
      icon: <FaCheckCircle />,
      className: "available",
    },
    {
      title: "On Trip",
      value: stats?.onTripVehicles || 0,
      icon: <FaRoute />,
      className: "trip",
    },
    {
      title: "Maintenance",
      value: stats?.maintenanceVehicles || 0,
      icon: <FaTools />,
      className: "maintenance",
    },
  ];

  return (
    <div className="fleet-stats">
      {cards.map((card, index) => (
        <div
          className={`fleet-stat-card ${card.className}`}
          key={index}
        >
          <div className="fleet-stat-icon">
            {card.icon}
          </div>

          <div className="fleet-stat-info">
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FleetStats;