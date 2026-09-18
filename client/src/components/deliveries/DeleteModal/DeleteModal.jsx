import { FaTrash, FaTimes } from "react-icons/fa";
import "./DeleteModal.css";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
  loading = false,
  delivery,
}) {
  if (!isOpen || !delivery) return null;

  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <div className="delete-icon">
          <FaTrash />
        </div>

        <h2>Delete Delivery?</h2>

        <p>
          Are you sure you want to delete
          <strong> {delivery.orderId}</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className="delete-buttons">

          <button
            className="cancel-delete"
            onClick={onClose}
            disabled={loading}
          >
            <FaTimes />
            Cancel
          </button>

          <button
            className="confirm-delete"
            onClick={onDelete}
            disabled={loading}
          >
            <FaTrash />
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}