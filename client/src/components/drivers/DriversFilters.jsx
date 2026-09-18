import "./DriversFilters.css";
import { FaSearch, FaTimes } from "react-icons/fa";

const DriversFilters = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  const clearFilters = () => {
    setSearch("");
    setStatus("");
  };

  return (
    <div className="drivers-filters">

      {/* Search */}

      <div className="driver-search">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Status */}

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="">All Drivers</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Clear */}

      <button
        className="clear-driver-filter"
        onClick={clearFilters}
      >
        <FaTimes />
        Clear
      </button>

    </div>
  );
};

export default DriversFilters;