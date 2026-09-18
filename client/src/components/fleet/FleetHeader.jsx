import "./FleetHeader.css";
import { FaPlus } from "react-icons/fa";

const FleetHeader = ({ onAdd }) => {
  return (
    <div className="fleet-header">
      <div className="fleet-header-left">
        <h1>Fleet Management</h1>
        <p>
          Manage vehicles, monitor fleet status, and assign drivers efficiently.
        </p>
      </div>

      <button className="add-vehicle-btn" onClick={onAdd}>
        <FaPlus />
        <span>Add Vehicle</span>
      </button>
    </div>
  );
};

export default FleetHeader;