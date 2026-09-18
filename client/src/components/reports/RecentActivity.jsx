import "./RecentActivity.css";
import {
  FaBox,
  FaTruck,
  FaClock,
} from "react-icons/fa";

const RecentActivity = ({ data }) => {
  return (
    <div className="recent-card">

      <div className="chart-header">
        <h2>Recent Activity</h2>
      </div>

      {data.length === 0 ? (
        <p className="empty-text">
          No recent activity found.
        </p>
      ) : (
        <div className="activity-list">

          {data.map((activity) => (

            <div
              key={activity._id}
              className="activity-item"
            >

              <div className="activity-icon">
                <FaBox />
              </div>

              <div className="activity-info">

                <h4>
                  {activity.customerName}
                </h4>

                <p>
                  Order :
                  {" "}
                  {activity.orderId}
                </p>

                <small>
                  Driver :
                  {" "}
                  {activity.driver?.name || "N/A"}
                </small>

              </div>

              <div className="activity-status">

                <span className="status-badge">
                  {activity.status}
                </span>

                <small>
                  {new Date(
                    activity.updatedAt
                  ).toLocaleDateString()}
                </small>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default RecentActivity;