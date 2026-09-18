import "./ReportsFilter.css";
import { FaFilter, FaUndo } from "react-icons/fa";

const ReportsFilter = ({
  startDate,
  endDate,
  vehicleType,
  status,
  setStartDate,
  setEndDate,
  setVehicleType,
  setStatus,
  onReset,
}) => {
  return (
    <div className="reports-filter">

      <div className="filter-title">
        <FaFilter />
        <span>Filters</span>
      </div>

      <div className="filter-grid">

        <div className="filter-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate || ""}
            onChange={(e) => setStartDate?.(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate || ""}
            onChange={(e) => setEndDate?.(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Vehicle Type</label>

          <select
            value={vehicleType || ""}
            onChange={(e) => setVehicleType?.(e.target.value)}
          >
            <option value="">All Vehicles</option>
            <option value="Bike">Bike</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Delivery Status</label>

          <select
            value={status || ""}
            onChange={(e) => setStatus?.(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="Picked Up">Picked Up</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      <div className="filter-actions">
        <button className="reset-btn" onClick={onReset}>
          <FaUndo />
          Reset Filters
        </button>
      </div>

    </div>
  );
};

export default ReportsFilter;