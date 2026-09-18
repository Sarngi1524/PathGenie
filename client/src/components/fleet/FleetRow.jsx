import "./FleetRow.css";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUserPlus,
  FaUserMinus,
  FaTruck,
} from "react-icons/fa";

const FleetRow = ({
  vehicle,
  onView,
  onEdit,
  onDelete,
  onAssign,
  onUnassign,
  onStatusUpdate,
}) => {
  return (
    <tr>

      {/* Vehicle */}
      <td>
        <div className="vehicle-info">
          <div className="vehicle-icon">
            <FaTruck />
          </div>

          <div>
            <h4>{vehicle.vehicleNumber}</h4>
            <span>{vehicle.vehicleType}</span>
          </div>
        </div>
      </td>

      {/* Driver */}
      <td>
        {vehicle.driver ? (
          <div className="driver-info">
            <strong>{vehicle.driver.name}</strong>
            <small>{vehicle.driver.email}</small>
          </div>
        ) : (
          <span className="not-assigned">
            Not Assigned
          </span>
        )}
      </td>

      {/* Type */}
      <td>{vehicle.vehicleType}</td>

      {/* Fuel */}
      <td>{vehicle.fuelType}</td>

      {/* Capacity */}
      <td>{vehicle.capacity} kg</td>

      {/* Status */}
      <td>
        <select
          className={`status-select ${vehicle.status
            .toLowerCase()
            .replace(" ", "-")}`}
          value={vehicle.status}
          onChange={(e) =>
            onStatusUpdate(vehicle._id, e.target.value)
          }
        >
          <option value="Available">Available</option>
          <option value="On Trip">On Trip</option>
          <option value="Maintenance">
            Maintenance
          </option>
        </select>
      </td>

      {/* Actions */}
      <td>
        <div className="fleet-actions">

          <button
            className="view-btn"
            title="View"
            onClick={() => onView(vehicle)}
          >
            <FaEye />
          </button>

          <button
            className="edit-btn"
            title="Edit"
            onClick={() => onEdit(vehicle)}
          >
            <FaEdit />
          </button>

          {!vehicle.driver ? (
            <button
              className="assign-btn"
              title="Assign Driver"
              onClick={() => onAssign(vehicle)}
            >
              <FaUserPlus />
            </button>
          ) : (
            <button
              className="unassign-btn"
              title="Unassign Driver"
              onClick={() => onUnassign(vehicle._id)}
            >
              <FaUserMinus />
            </button>
          )}

          <button
            className="delete-btn"
            title="Delete"
            onClick={() => onDelete(vehicle._id)}
          >
            <FaTrash />
          </button>

        </div>
      </td>

    </tr>
  );
};

export default FleetRow;