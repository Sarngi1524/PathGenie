import "./DriversHeader.css";
import { FaUserTie } from "react-icons/fa";

const DriversHeader = () => {
  return (
    <div className="drivers-header">

      <div className="drivers-header-content">

        <div className="drivers-header-icon">
          <FaUserTie />
        </div>

        <div>
          <h1>Driver Management</h1>

          <p>
            View and manage all registered drivers in your logistics network.
          </p>
        </div>

      </div>

    </div>
  );
};

export default DriversHeader;