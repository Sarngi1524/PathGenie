import { useEffect, useState } from "react";
import "./AssignDriverModal.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { getDrivers } from "../../services/driverService";

const AssignDriverModal = ({
  open,
  onClose,
  vehicle,
  onAssign,
  refresh,
}) => {
  const [drivers, setDrivers] = useState([]);
  const [driverId, setDriverId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

   
const loadDrivers = async () => {
  try {
    const res = await getDrivers();

    setDrivers(res.data || []);

  } catch (error) {
    console.error(error);

    toast.error("Failed to load drivers");
  }
};
    loadDrivers();
  }, [open]);

  const handleAssign = async () => {
    if (!driverId) {
      toast.warning("Please select a driver");
      return;
    }

    try {
      setLoading(true);

      await onAssign(vehicle._id, driverId);

      toast.success("Driver assigned successfully");

      refresh();

      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Assignment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !vehicle) return null;

  return (
    <div className="assign-driver-overlay">
      <div className="assign-driver-modal">

        <div className="assign-header">
          <h2>Assign Driver</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="vehicle-box">
          <strong>{vehicle.vehicleNumber}</strong>

          <p>{vehicle.vehicleType}</p>
        </div>

        <div className="form-group">
  <label>Select Driver</label>

  {drivers.length === 0 ? (
    <div className="no-driver">
      No drivers available
    </div>
  ) : (
    <div className="driver-list">

      {drivers.map((driver) => (

        <div
          key={driver._id}
          className={`driver-card ${
            driverId === driver._id ? "selected" : ""
          }`}
          onClick={() => setDriverId(driver._id)}
        >

          <div className="driver-avatar">
            {driver.name?.charAt(0).toUpperCase()}
          </div>

          <div className="driver-info">

            <h4>{driver.name}</h4>

            <p>{driver.email}</p>

            <small>{driver.phone}</small>

          </div>

          <input
            type="radio"
            checked={driverId === driver._id}
            onChange={() => setDriverId(driver._id)}
          />

        </div>

      ))}

    </div>
  )}

</div>

        <div className="assign-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="assign-btn"
            onClick={handleAssign}
            disabled={loading}
          >
            {loading
              ? "Assigning..."
              : "Assign Driver"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AssignDriverModal;