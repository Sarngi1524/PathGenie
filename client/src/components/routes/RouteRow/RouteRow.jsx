import { FaEye, FaMapMarkedAlt ,FaPlay,FaCheck,FaTrash } from "react-icons/fa";
import "./RouteRow.css";

export default function RouteRow({
  route,
  onView,
  onStatusUpdate,
  onDelete
}) {

  const formatDistance = (meters) => {
    if (!meters) return "-";
    return `${(meters / 1000).toFixed(2)} km`;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "-";

    const minutes = Math.round(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Planned":
        return "planned";

      case "Started":
        return "started";

      case "Completed":
        return "completed";

      default:
        return "";
    }
  };

  return (
    <tr>

      <td>
        {route._id.slice(-6).toUpperCase()}
      </td>

      <td>
        {route.delivery?.orderId || "-"}
      </td>

      <td>
        {route.driver?.name || "-"}
      </td>

      <td>
        {route.vehicle?.vehicleNumber || "-"}
      </td>

      <td>
        {formatDistance(route.distance)}
      </td>

      <td>
        {formatDuration(route.duration)}
      </td>

      <td>

        <span className={`status-badge ${getStatusClass(route.status)}`}>
          {route.status}
        </span>

      </td>

      <td>
<div className="route-actions">

  <button
    className="action-btn view"
    title="View"
    onClick={() => onView(route)}
  >
    <FaEye />
  </button>

  <button
    className="action-btn map"
    title="Map"
    onClick={() => onView(route)}
  >
    <FaMapMarkedAlt />
  </button>

  {route.status === "Planned" && (

    <button
      className="action-btn start"
      title="Start Route"
      onClick={() =>
        onStatusUpdate(route._id, "Started")
      }
    >
      <FaPlay />
    </button>

  )}

  {route.status === "Started" && (

    <button
      className="action-btn complete"
      title="Complete Route"
      onClick={() =>
        onStatusUpdate(route._id, "Completed")
      }
    >
      <FaCheck />
    </button>

  )}

  <button
    className="action-btn delete"
    title="Delete Route"
    onClick={() => onDelete(route._id)}
  >
    <FaTrash />
  </button>
</div>

      </td>

    </tr>
  );
}