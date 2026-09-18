import {
  FaRoute,
  FaPlay,
  FaCheckCircle,
  FaPlus,
  FaMapMarkedAlt,
} from "react-icons/fa";

import "./RouteHeader.css";

export default function RouteHeader({
  stats,
  onCreate,
}) {
  return (
    <div className="route-header">

      <div className="route-header-top">

        <div>
          <h1>Routes</h1>
          <p>
            Manage delivery routes and optimize logistics.
          </p>
        </div>

        <button
          className="create-route-btn"
          onClick={onCreate}
        >
          <FaPlus />
          Create Route
        </button>

      </div>

      <div className="route-stats">

        <div className="route-card">

          <div className="route-icon total">
            <FaMapMarkedAlt />
          </div>

          <div>
            <h2>{stats.total}</h2>
            <span>Total Routes</span>
          </div>

        </div>

        <div className="route-card">

          <div className="route-icon planned">
            <FaRoute />
          </div>

          <div>
            <h2>{stats.planned}</h2>
            <span>Planned</span>
          </div>

        </div>

        <div className="route-card">

          <div className="route-icon started">
            <FaPlay />
          </div>

          <div>
            <h2>{stats.started}</h2>
            <span>Started</span>
          </div>

        </div>

        <div className="route-card">

          <div className="route-icon completed">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{stats.completed}</h2>
            <span>Completed</span>
          </div>

        </div>

      </div>

    </div>
  );
}