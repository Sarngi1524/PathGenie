import { FaTimes } from "react-icons/fa";
import "./ViewDeliveryModal.css";

export default function ViewDeliveryModal({
  isOpen,
  onClose,
  delivery,
}) {
  if (!isOpen || !delivery) return null;

  return (
    <div className="view-modal-overlay">

      <div className="view-modal">

        <div className="view-header">

          <h2>Delivery Details</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="view-body">

          <div className="detail-card">
            <label>Order ID</label>
            <span>{delivery.orderId}</span>
          </div>

          <div className="detail-card">
            <label>Customer</label>
            <span>{delivery.customerName}</span>
          </div>

          <div className="detail-card">
            <label>Phone</label>
            <span>{delivery.customerPhone}</span>
          </div>

          <div className="detail-card">
            <label>Pickup Address</label>
            <span>{delivery.pickupAddress}</span>
          </div>

          <div className="detail-card">
            <label>Delivery Address</label>
            <span>{delivery.deliveryAddress}</span>
          </div>

          <div className="detail-card">
            <label>Driver</label>
            <span>{delivery.driver?.name || "Not Assigned"}</span>
          </div>

          <div className="detail-card">
            <label>Vehicle</label>
            <span>{delivery.vehicle?.vehicleNumber || "-"}</span>
          </div>

          <div className="detail-card">
            <label>Status</label>
            <span>{delivery.status}</span>
          </div>

          <div className="detail-card">
            <label>Priority</label>
            <span>{delivery.priority}</span>
          </div>

          <div className="detail-card">
            <label>Delivery Date</label>
            <span>
              {delivery.deliveryDate
                ? new Date(delivery.deliveryDate).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div className="detail-card">
            <label>Estimated Time</label>
            <span>{delivery.estimatedTime || "-"}</span>
          </div>

          <div className="detail-card">
            <label>Weight</label>
            <span>{delivery.weight || "-"} kg</span>
          </div>

          <div className="detail-card full-width">
            <label>Notes</label>
            <span>{delivery.notes || "No notes available."}</span>
          </div>

        </div>

      </div>

    </div>
  );
}