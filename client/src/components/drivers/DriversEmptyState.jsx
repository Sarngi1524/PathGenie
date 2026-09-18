import "./DriversEmptyState.css";
import { FaUserSlash } from "react-icons/fa";

const DriversEmptyState = () => {
  return (
    <div className="drivers-empty">

      <FaUserSlash />

      <h2>No Drivers Found</h2>

      <p>
        No drivers match your current search or
        filter.
      </p>

    </div>
  );
};

export default DriversEmptyState;