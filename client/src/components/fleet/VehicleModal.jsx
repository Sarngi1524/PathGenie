import { useEffect, useState } from "react";
import "./VehicleModal.css";

const initialState = {
  vehicleNumber: "",
  vehicleType: "Bike",
  capacity: "",
  fuelType: "Petrol",
  status: "Available",
};

const VehicleModal = ({
  open,
  onClose,
  vehicle,
  onCreate,
  onUpdate,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        vehicleNumber: vehicle.vehicleNumber || "",
        vehicleType: vehicle.vehicleType || "Bike",
        capacity: vehicle.capacity || "",
        fuelType: vehicle.fuelType || "Petrol",
        status: vehicle.status || "Available",
      });
    } else {
      setFormData(initialState);
    }
  }, [vehicle, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.vehicleNumber ||
      !formData.capacity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (vehicle) {
      onUpdate(vehicle._id, formData);
    } else {
      onCreate(formData);
    }
  };

  if (!open) return null;

  return (
    <div className="vehicle-modal-overlay">
      <div className="vehicle-modal">

        <div className="vehicle-modal-header">
          <h2>
            {vehicle
              ? "Edit Vehicle"
              : "Add New Vehicle"}
          </h2>

          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="vehicle-form-grid">

            <div className="form-group">
              <label>Vehicle Number</label>

              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="GJ03AB1234"
              />
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
              >
                <option>Bike</option>
                <option>Car</option>
                <option>Van</option>
                <option>Truck</option>
              </select>
            </div>

            <div className="form-group">
              <label>Capacity (kg)</label>

              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Fuel Type</label>

              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>CNG</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Available</option>
                <option>On Trip</option>
                <option>Maintenance</option>
              </select>
            </div>

          </div>

          <div className="vehicle-modal-actions">

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
              {vehicle
                ? "Update Vehicle"
                : "Create Vehicle"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default VehicleModal;