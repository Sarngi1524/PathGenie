import "./DeliveryRow.css";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";

export default function DeliveryRow({
  delivery,
  onEdit,
  onView,
  onDelete,
  onAssign,
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status pending";

      case "Assigned":
        return "status assigned";

      case "In Transit":
        return "status transit";

      case "Delivered":
        return "status delivered";

      case "Cancelled":
        return "status cancelled";

      default:
        return "status";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority high";

      case "Medium":
        return "priority medium";

      case "Low":
        return "priority low";

      default:
        return "priority";
    }
  };

  return (
    <tr>

      <td>
        <strong>{delivery.orderId}</strong>
      </td>

      <td>
        <div className="customer-cell">
          <strong>{delivery.customerName}</strong>
          <span>{delivery.customerPhone}</span>
        </div>
      </td>

      <td className="address-cell">
        {delivery.pickupAddress}
      </td>

      <td className="address-cell">
        {delivery.deliveryAddress}
      </td>

      <td>
        {delivery.driver?.name || "-"}
      </td>

      <td>
        {delivery.vehicle?.vehicleNumber || "-"}
      </td>

      <td>
        <span className={getPriorityClass(delivery.priority)}>
          {delivery.priority}
        </span>
      </td>

      <td>
        <span className={getStatusClass(delivery.status)}>
          {delivery.status}
        </span>
      </td>

      <td>

        <div className="row-actions">
          <button
  className="action-btn assign"
  title="Assign Driver"
  onClick={() => onAssign(delivery)}
>
  <FaUserPlus />
</button>

          <button
            className="action-btn view"
            title="View"
            onClick={() => onView(delivery)}
          >
            <FaEye />
          </button>

          <button
            className="action-btn edit"
            title="Edit"
            onClick={() => onEdit(delivery)}
          >
            <FaEdit />
          </button>

          <button
            className="action-btn delete"
            title="Delete"
            onClick={() => onDelete(delivery)}
          >
            <FaTrash />
          </button>
          

        </div>

      </td>

    </tr>
  );
}