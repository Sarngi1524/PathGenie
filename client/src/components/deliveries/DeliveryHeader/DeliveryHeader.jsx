import "./DeliveryHeader.css";
import {
  FaPlus,
  FaBox,
  FaTruckMoving,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function DeliveryHeader({
  stats,
  onCreate,
}) {
  return (
    <div className="delivery-header">

      <div className="header-content">

        <div className="header-left">

          <span className="header-badge">
            🚚 Logistics Management
          </span>

          <h1>Deliveries</h1>

          <p>
            Monitor, organize and manage every shipment
            from one intelligent dashboard.
          </p>

          <button className="new-delivery-btn" onClick={onCreate}>
            <FaPlus />
            New Delivery
          </button>

        </div>

        <div className="header-right">

          <div className="delivery-illustration">

            <div className="circle circle1"></div>

            <div className="circle circle2"></div>

            <div className="truck-icon">
              🚚
            </div>

          </div>

        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon total">
            <FaBox />
          </div>

          <div>

            <h2>{stats.total}</h2>

            <span>Total Deliveries</span>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon pending">
            <FaClock />
          </div>

          <div>

            <h2>{stats.pending}</h2>

            <span>Pending</span>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon transit">
            <FaTruckMoving />
          </div>

          <div>

            <h2>{stats.inTransit}</h2>

            <span>In Transit</span>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon delivered">
            <FaCheckCircle />
          </div>

          <div>

            <h2>{stats.delivered}</h2>

            <span>Delivered</span>

          </div>

        </div>

      </div>

    </div>
  );
}