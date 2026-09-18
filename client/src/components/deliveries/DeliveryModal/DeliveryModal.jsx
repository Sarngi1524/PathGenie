import { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import "./DeliveryModal.css";

const initialState = {
  customerName: "",
  customerPhone: "",
  pickupAddress: "",
  deliveryAddress: "",
  priority: "Medium",
  driver: "",
  vehicle: "",
  deliveryDate: "",
  estimatedTime: "",
  weight: "",
  notes: "",
};

export default function DeliveryModal({
  isOpen,
  onClose,
  onSubmit,
  delivery = null,
  drivers = [],
  vehicles = [],
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (delivery) {
      setFormData({
        customerName: delivery.customerName || "",
        customerPhone: delivery.customerPhone || "",
        pickupAddress: delivery.pickupAddress || "",
        deliveryAddress: delivery.deliveryAddress || "",
        priority: delivery.priority || "Medium",
        driver: delivery.driver?._id || "",
        vehicle: delivery.vehicle?._id || "",
        deliveryDate: delivery.deliveryDate
          ? delivery.deliveryDate.substring(0, 10)
          : "",
        estimatedTime: delivery.estimatedTime || "",
        weight: delivery.weight || "",
        notes: delivery.notes || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [delivery]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="delivery-modal">

        <div className="modal-header">
          <h2>
            {delivery ? "Edit Delivery" : "Create Delivery"}
          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={submitHandler}>

          <div className="form-grid">

            <div>
              <label>Customer Name</label>
              <input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Phone Number</label>
              <input
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Pickup Address</label>
              <input
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Delivery Address</label>
              <input
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label>Driver</label>
              <select
                name="driver"
                value={formData.driver}
                onChange={handleChange}
              >
                <option value="">Select Driver</option>

                {drivers.map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Vehicle</label>
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
              >
                <option value="">Select Vehicle</option>

                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.vehicleNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Delivery Date</label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Estimated Time</label>
              <input
                type="time"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="notes-section">
            <label>Notes</label>

            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">

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
              <FaSave />
              {delivery ? "Update Delivery" : "Create Delivery"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}