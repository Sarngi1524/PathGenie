import { useEffect, useState } from "react";
import { FaTimes, FaUserCheck } from "react-icons/fa";
import "./AssignDriverModal.css";

export default function AssignDriverModal({
  isOpen,
  onClose,
  onAssign,
  delivery,
  drivers = [],
  loading = false,
}) {
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    if (delivery?.driver?._id) {
      setDriverId(delivery.driver._id);
    } else {
      setDriverId("");
    }
  }, [delivery]);

  if (!isOpen || !delivery) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(driverId);
  };

  return (
    <div className="assign-overlay">

      <div className="assign-modal">

        <div className="assign-header">

          <h2>Assign Driver</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="delivery-info">

            <h4>{delivery.orderId}</h4>

            <p>{delivery.customerName}</p>

          </div>

          <label>Select Driver</label>

          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            required
          >
            <option value="">Choose Driver</option>

            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}

          </select>

          <div className="assign-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="assign-btn"
              disabled={loading}
            >
              <FaUserCheck />
              {loading ? "Assigning..." : "Assign Driver"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}