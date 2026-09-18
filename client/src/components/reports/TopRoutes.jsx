import "./TopRoutes.css";
import { FaRoute } from "react-icons/fa";

const TopRoutes = ({ data }) => {
  return (
    <div className="top-routes-card">

      <div className="chart-header">
        <h2>
          <FaRoute />
          Top Routes
        </h2>
      </div>

      {data.length === 0 ? (
        <p className="empty-text">
          No route data available.
        </p>
      ) : (
        <div className="route-list">

          {data.map((route, index) => (

            <div
              className="route-item"
              key={index}
            >

              <div className="route-number">
                {index + 1}
              </div>

              <div className="route-info">
                <h4>
                  {route._id.pickup}
                </h4>

                <p>
                  → {route._id.delivery}
                </p>
              </div>

              <div className="route-count">
                {route.totalDeliveries}
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default TopRoutes;