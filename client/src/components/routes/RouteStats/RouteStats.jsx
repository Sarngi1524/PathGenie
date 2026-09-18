import "./RouteStats.css";
import {
  FaRoute,
  FaClipboardList,
  FaTruckMoving,
  FaCheckCircle,
  FaRoad,
  FaClock,
} from "react-icons/fa";

const RouteStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Routes",
      value: stats.totalRoutes,
      icon: <FaRoute />,
      color: "#818263",
    },
    {
      title: "Planned",
      value: stats.planned,
      icon: <FaClipboardList />,
      color: "#F4B400",
    },
    {
      title: "Started",
      value: stats.started,
      icon: <FaTruckMoving />,
      color: "#4285F4",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: <FaCheckCircle />,
      color: "#34A853",
    },
    {
      title: "Distance",
      value: `${stats.totalDistance} km`,
      icon: <FaRoad />,
      color: "#E67E22",
    },
    {
      title: "Avg Duration",
      value: `${stats.averageDuration} min`,
      icon: <FaClock />,
      color: "#9C27B0",
    },
  ];

  return (
    <div className="route-stats-grid">
      {cards.map((card, index) => (
        <div className="route-stat-card" key={index}>
          <div
            className="route-stat-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteStats;