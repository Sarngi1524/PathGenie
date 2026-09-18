import { useEffect, useState } from "react";
import { FaRoute, FaTimes } from "react-icons/fa";
import "./RouteModal.css";

export default function RouteModal({
  isOpen,
  onClose,
  onSubmit,
  deliveries = [],
  vehicles = [],
}) {
  const initialState = {
    deliveryId: "",
    vehicleId: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.deliveryId || !formData.vehicleId) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="route-modal-overlay">

      <div className="route-modal">

        <div className="route-modal-header">

          <h2>Create Route</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Select Delivery</label>

            <select
              name="deliveryId"
              value={formData.deliveryId}
              onChange={handleChange}
              required
            >
              <option value="">
                Choose Delivery
              </option>

              {deliveries.map((delivery) => (
                <option
                  key={delivery._id}
                  value={delivery._id}
                >
                  {delivery.orderId} • {delivery.customerName}
                </option>
              ))}

            </select>

          </div>

          <div className="form-group">

            <label>Select Vehicle</label>

            <select
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
            >
              <option value="">
                Choose Vehicle
              </option>

              {vehicles.map((vehicle) => (
                <option
                  key={vehicle._id}
                  value={vehicle._id}
                >
                  {vehicle.vehicleNumber}
                  {" • "}
                  {vehicle.vehicleType}
                  {" • "}
                  {vehicle.driver?.name || "No Driver"}
                </option>
              ))}

            </select>

          </div>

          <div className="route-info">

            <FaRoute />

            <p>
              Driver, pickup coordinates, destination,
              distance, duration and optimized path will be
              calculated automatically.
            </p>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Create Route
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}