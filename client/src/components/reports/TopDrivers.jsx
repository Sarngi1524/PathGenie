import "./TopDrivers.css";
import { FaTrophy, FaUserCircle } from "react-icons/fa";

const TopDrivers = ({ data }) => {
  return (
    <div className="top-drivers-card">

      <div className="chart-header">
        <h2>
          <FaTrophy />
          Top Drivers
        </h2>
      </div>

      <div className="driver-list">

        {data.length === 0 ? (
          <p className="empty-text">
            No driver data available.
          </p>
        ) : (
          data.map((driver, index) => (
            <div
              className="driver-item"
              key={index}
            >
              <div className="driver-avatar">
                <FaUserCircle />
              </div>

              <div className="driver-details">
                <h4>{driver.name}</h4>
                <p>{driver.email}</p>
              </div>

              <div className="driver-score">
                {driver.deliveries}
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default TopDrivers;