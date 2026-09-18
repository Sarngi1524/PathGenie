import "./FleetFilters.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const FleetFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  vehicleType,
  setVehicleType,
}) => {
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setVehicleType("");
  };

  return (
    <div className="fleet-filters">

      {/* Search */}
      <div className="filter-search">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by vehicle number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Vehicle Type */}
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Bike">Bike</option>
        <option value="Car">Car</option>
        <option value="Van">Van</option>
        <option value="Truck">Truck</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Available">Available</option>
        <option value="On Trip">On Trip</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      {/* Clear */}
      <button
        className="clear-filter-btn"
        onClick={clearFilters}
      >
        <FaTimes />
        Clear
      </button>

    </div>
  );
};

export default FleetFilters;