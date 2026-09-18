import "./DriversStats.css";
import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
} from "react-icons/fa";

const DriversStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Drivers",
      value: stats?.totalDrivers || 0,
      icon: <FaUsers />,
      className: "total",
    },
    {
      title: "Active Drivers",
      value: stats?.activeDrivers || 0,
      icon: <FaUserCheck />,
      className: "active",
    },
    {
      title: "Inactive Drivers",
      value: stats?.inactiveDrivers || 0,
      icon: <FaUserSlash />,
      className: "inactive",
    },
  ];

  return (
    <div className="drivers-stats">
      {cards.map((card, index) => (
        <div
          className={`driver-stat-card ${card.className}`}
          key={index}
        >
          <div className="driver-stat-icon">
            {card.icon}
          </div>

          <div className="driver-stat-content">
            <h2>{card.value}</h2>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriversStats;