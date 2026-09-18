import { FaSyncAlt } from "react-icons/fa";
import "./RouteFilters.css";

export default function RouteFilters({
  status,
  setStatus,
  onRefresh,
}) {
  return (
    <div className="route-filters">

      <div className="filter-group">

        <label>Status</label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Routes</option>
          <option value="Planned">Planned</option>
          <option value="Started">Started</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      <button
        className="refresh-btn"
        onClick={onRefresh}
      >
        <FaSyncAlt />
        Refresh
      </button>

    </div>
  );
}