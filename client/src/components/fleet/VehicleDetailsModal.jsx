import "./VehicleDetailsModal.css";
import {
  FaTruck,
  FaGasPump,
  FaWeightHanging,
  FaUser,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";

const VehicleDetailsModal = ({ open, onClose, vehicle }) => {
  if (!open || !vehicle) return null;

  return (
    <div className="vehicle-details-overlay">
      <div className="vehicle-details-modal">

        <div className="vehicle-details-header">
          <h2>Vehicle Details</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="vehicle-details-grid">

          <div className="detail-card">
            <FaTruck className="detail-icon" />
            <div>
              <span>Vehicle Number</span>
              <h4>{vehicle.vehicleNumber}</h4>
            </div>
          </div>

          <div className="detail-card">
            <FaTruck className="detail-icon" />
            <div>
              <span>Vehicle Type</span>
              <h4>{vehicle.vehicleType}</h4>
            </div>
          </div>

          <div className="detail-card">
            <FaGasPump className="detail-icon" />
            <div>
              <span>Fuel Type</span>
              <h4>{vehicle.fuelType}</h4>
            </div>
          </div>

          <div className="detail-card">
            <FaWeightHanging className="detail-icon" />
            <div>
              <span>Capacity</span>
              <h4>{vehicle.capacity} kg</h4>
            </div>
          </div>

          <div className="detail-card">
            <FaUser className="detail-icon" />
            <div>
              <span>Assigned Driver</span>

              {vehicle.driver ? (
                <>
                  <h4>{vehicle.driver.name}</h4>
                  <small>{vehicle.driver.email}</small>
                </>
              ) : (
                <h4>Not Assigned</h4>
              )}
            </div>
          </div>

          <div className="detail-card">
            <FaMapMarkerAlt className="detail-icon" />
            <div>
              <span>Current Location</span>

              <h4>
                {vehicle.currentLocation?.lat ?? 0},{" "}
                {vehicle.currentLocation?.lng ?? 0}
              </h4>
            </div>
          </div>

        </div>

        <div className="status-wrapper">
          <span
            className={`status-badge ${vehicle.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {vehicle.status}
          </span>
        </div>

      </div>
    </div>
  );
};

export default VehicleDetailsModal;