import { useEffect, useState } from "react";
import {
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";

import DriverLayout from "../../layouts/DriverLayout";
import { getDashboard } from "../../services/dashboardService";

import "./DriverDashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboard();

      setDashboard(data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DriverLayout>
        <h2>Loading Dashboard...</h2>
      </DriverLayout>
    );
  }

  if (error) {
    return (
      <DriverLayout>
        <h2>{error}</h2>
      </DriverLayout>
    );
  }

  const stats = dashboard.stats;

  return (
    <DriverLayout>

      <div className="stats-grid">

        <div className="stat-card">
          <FiTruck />
          <div>
            <h2>{stats.todayDeliveries}</h2>
            <p>Today's Deliveries</p>
          </div>
        </div>

        <div className="stat-card">
          <FiCheckCircle />
          <div>
            <h2>{stats.completed}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <FiClock />
          <div>
            <h2>{stats.pending}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <FiDollarSign />
          <div>
            <h2>₹ {stats.earnings}</h2>
            <p>Total Earnings</p>
          </div>
        </div>

      </div>

      <div className="recent-card">

        <h3>Recent Deliveries</h3>

        <table>

          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Route</th>
              <th>Vehicle</th>
            </tr>
          </thead>

          <tbody>

            {dashboard.recentDeliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.orderId}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.status}</td>
                <td>
                  {delivery.route?.routeName || "-"}
                </td>
                <td>
                  {delivery.vehicle?.vehicleNumber || "-"}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </DriverLayout>
  );
}