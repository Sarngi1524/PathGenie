import "./DriverDetailsModal.css";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaCalendarAlt,
  FaIdBadge,
  FaTimes,
} from "react-icons/fa";

const DriverDetailsModal = ({ open, driver, onClose }) => {
  if (!open || !driver) return null;

  return (
    <div className="driver-modal-overlay" onClick={onClose}>
      <div
        className="driver-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="driver-modal-header">
          <h2>Driver Details</h2>

          <button
            className="driver-close-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Profile */}

        <div className="driver-profile">

          {driver.avatar ? (
            <img
              src={driver.avatar}
              alt={driver.name}
              className="driver-profile-avatar"
            />
          ) : (
            <div className="driver-profile-avatar placeholder">
              <FaUserCircle />
            </div>
          )}

          <h3>{driver.name}</h3>

          <span
            className={`driver-profile-status ${
              driver.isActive
                ? "active"
                : "inactive"
            }`}
          >
            {driver.isActive
              ? "Active Driver"
              : "Inactive Driver"}
          </span>

        </div>

        {/* Information */}

        <div className="driver-info-grid">

          <div className="driver-info-card">
            <FaEnvelope />
            <div>
              <small>Email</small>
              <p>{driver.email}</p>
            </div>
          </div>

          <div className="driver-info-card">
            <FaPhone />
            <div>
              <small>Phone</small>
              <p>{driver.phone || "Not Available"}</p>
            </div>
          </div>

          <div className="driver-info-card">
            <FaUserTag />
            <div>
              <small>Role</small>
              <p>{driver.role}</p>
            </div>
          </div>

          <div className="driver-info-card">
            <FaCalendarAlt />
            <div>
              <small>Joined</small>
              <p>
                {new Date(
                  driver.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="driver-info-card full-width">
            <FaIdBadge />
            <div>
              <small>Driver ID</small>
              <p>{driver._id}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DriverDetailsModal;