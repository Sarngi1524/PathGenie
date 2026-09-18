import "./EmptyState.css";
import { FaBoxOpen, FaPlus } from "react-icons/fa";

export default function EmptyState() {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <FaBoxOpen />
      </div>

      <h2>No Deliveries Found</h2>

      <p>
        You haven't created any deliveries yet.
        Start by creating your first delivery and
        manage it from your PathGenie dashboard.
      </p>

      <button className="empty-btn">
        <FaPlus />
        Create Delivery
      </button>

    </div>
  );
}