import "./DriverRow.css";
import { FaEye, FaUserCircle } from "react-icons/fa";

const DriverRow = ({ driver, onView }) => {
  return (
    <tr>

      {/* Driver */}

      <td>
        <div className="driver-info">

          {driver.avatar ? (
            <img
              src={driver.avatar}
              alt={driver.name}
              className="driver-avatar"
            />
          ) : (
            <div className="driver-avatar placeholder">
              <FaUserCircle />
            </div>
          )}

          <div>
            <h4>{driver.name}</h4>
            <span>ID: {driver._id.slice(-6)}</span>
          </div>

        </div>
      </td>

      {/* Email */}

      <td>{driver.email}</td>

      {/* Phone */}

      <td>{driver.phone || "-"}</td>

      {/* Status */}

      <td>
        <span
          className={`driver-status ${
            driver.isActive ? "active" : "inactive"
          }`}
        >
          {driver.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Joined */}

      <td>
        {new Date(driver.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}

      <td>

        <button
          className="driver-action-btn view"
          onClick={() => onView(driver)}
        >
          <FaEye />
        </button>

      </td>

    </tr>
  );
};

export default DriverRow;