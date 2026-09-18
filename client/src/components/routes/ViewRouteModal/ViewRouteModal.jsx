import {
  FaTimes,
  FaTruck,
  FaUser,
  FaRoute,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaClipboardList,
  FaRoad,
  FaCheckCircle,
} from "react-icons/fa";

import RouteMap from "../RouteMap/RouteMap";
import "./ViewRouteModal.css";

export default function ViewRouteModal({
  isOpen,
  onClose,
  route,
}) {
  if (!isOpen || !route) return null;

  const formatDistance = (meters) => {
    if (!meters) return "-";
    return `${(meters / 1000).toFixed(2)} km`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "-";

    const mins = Math.round(seconds / 60);

    if (mins < 60) return `${mins} min`;

    const h = Math.floor(mins / 60);
    const m = mins % 60;

    return `${h}h ${m}m`;
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "planned":
        return "planned";

      case "started":
      case "in transit":
        return "started";

      case "completed":
      case "delivered":
        return "completed";

      default:
        return "";
    }
  };

  return (
    <div className="view-route-overlay">
      <div className="view-route-modal">

        {/* HEADER */}

        <div className="view-route-header">

          <div>
            <h2>Route Details</h2>
            <p>Complete logistics information</p>
          </div>

          <div className="header-actions">

            <span
              className={`status-badge ${getStatusClass(route.status)}`}
            >
              {route.status}
            </span>

            <button onClick={onClose}>
              <FaTimes />
            </button>

          </div>

        </div>

        <div className="view-route-body">

          <div className="route-grid">

            {/* DELIVERY */}

            <div className="info-card">

              <h3>
                <FaClipboardList />
                Delivery
              </h3>

              <p>
                <strong>Order ID:</strong>{" "}
                {route.delivery?.orderId || "-"}
              </p>

              <p>
                <strong>Customer:</strong>{" "}
                {route.delivery?.customerName || "-"}
              </p>

              <p>
                <strong>
                  <FaPhone />
                </strong>{" "}
                {route.delivery?.customerPhone || "-"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {route.delivery?.status || "-"}
              </p>

            </div>

            {/* DRIVER */}

            <div className="info-card">

              <h3>
                <FaUser />
                Driver
              </h3>

              <div className="driver-avatar">
                {(route.driver?.name || "D")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <p>
                <strong>Name:</strong>{" "}
                {route.driver?.name || "-"}
              </p>

              <p>
                <FaEnvelope />
                {" "}
                {route.driver?.email || "-"}
              </p>

              <p>
                <FaPhone />
                {" "}
                {route.driver?.phone || "-"}
              </p>

            </div>
                        {/* VEHICLE */}

            <div className="info-card">

              <h3>
                <FaTruck />
                Vehicle
              </h3>

              <p>
                <strong>Vehicle No:</strong>{" "}
                {route.vehicle?.vehicleNumber || "-"}
              </p>

              <p>
                <strong>Type:</strong>{" "}
                {route.vehicle?.vehicleType || "-"}
              </p>

              <p>
                <strong>Capacity:</strong>{" "}
                {route.vehicle?.capacity || "-"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {route.vehicle?.status || "-"}
              </p>

            </div>

            {/* ROUTE */}

            <div className="info-card">

              <h3>
                <FaRoute />
                Route Information
              </h3>

              <div className="address-box">

                <div className="address-item">

                  <FaMapMarkerAlt className="address-icon pickup" />

                  <div>

                    <small>Pickup</small>

                    <span>{route.pickupAddress}</span>

                  </div>

                </div>

                <div className="address-divider"></div>

                <div className="address-item">

                  <FaMapMarkerAlt className="address-icon delivery" />

                  <div>

                    <small>Delivery</small>

                    <span>{route.deliveryAddress}</span>

                  </div>

                </div>

              </div>

              <div className="metrics-grid">

                <div className="metric-box">

                  <FaRoad />

                  <h4>{formatDistance(route.distance)}</h4>

                  <p>Distance</p>

                </div>

                <div className="metric-box">

                  <FaClock />

                  <h4>{formatDuration(route.duration)}</h4>

                  <p>Duration</p>

                </div>

              </div>

            </div>

          </div>

          {/* TIMELINE */}

          <div className="timeline-card">

            <h3>

              <FaCheckCircle />

              Route Progress

            </h3>

            <div className="timeline">

              <div
                className={`timeline-step ${
                  ["Planned", "Started", "Completed"].includes(route.status)
                    ? "active"
                    : ""
                }`}
              >

                <div className="timeline-circle"></div>

                <span>Planned</span>

              </div>

              <div
                className={`timeline-step ${
                  ["Started", "Completed"].includes(route.status)
                    ? "active"
                    : ""
                }`}
              >

                <div className="timeline-circle"></div>

                <span>Started</span>

              </div>

              <div
                className={`timeline-step ${
                  route.status === "Completed"
                    ? "active"
                    : ""
                }`}
              >

                <div className="timeline-circle"></div>

                <span>Completed</span>

              </div>

            </div>

          </div>

          {/* MAP */}

          <div className="route-map-card">

            <div className="map-header">

              <h3>

                <FaMapMarkerAlt />

                Live Route Map

              </h3>

            </div>

            <div className="route-map-wrapper">

              <RouteMap route={route} />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}