import { FaRoute } from "react-icons/fa";
import "./RouteEmptyState.css";

export default function RouteEmptyState() {
  return (
    <div className="route-empty">

      <FaRoute />

      <h2>No Routes Found</h2>

      <p>
        Create your first optimized delivery route.
      </p>

    </div>
  );
}