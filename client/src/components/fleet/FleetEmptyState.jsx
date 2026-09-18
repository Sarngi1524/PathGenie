import "./FleetEmptyState.css";
import { FaTruck } from "react-icons/fa";

const FleetEmptyState = () => {
  return (
    <div className="fleet-empty">

      <FaTruck className="empty-icon" />

      <h2>No Vehicles Found</h2>

      <p>
        No vehicles match the selected filters.
      </p>

    </div>
  );
};

export default FleetEmptyState;