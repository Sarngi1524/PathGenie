import "./DeliveryFilters.css";

import {
  FaSearch,
  FaFilter,
  FaUndo,
} from "react-icons/fa";

export default function DeliveryFilters({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) {
  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };

  return (
    <div className="delivery-filters">

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by Order ID or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">

        <div className="select-box">
          <FaFilter />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Assigned</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="select-box">
          <FaFilter />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          className="reset-btn"
          onClick={resetFilters}
        >
          <FaUndo />

          Reset
        </button>

      </div>

    </div>
  );
}