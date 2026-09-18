import "./RouteSummary.css";
import { MdDirections, MdCheckCircle, MdSchedule, MdTimeline } from "react-icons/md";

export default function RouteSummary({ summary }) {
  return (
    <div className="route-summary-card">
      <div className="route-summary-header">
        <h3>Route Summary</h3>
        <div className="route-summary-icon">
          <MdDirections />
        </div>
      </div>

      <div className="route-summary-grid">
        <div className="route-summary-box completed">
          <div className="route-summary-box-icon">
            <MdCheckCircle />
          </div>
          <div className="route-summary-box-content">
            <h2>{summary.completedRoutes}</h2>
            <p>Completed</p>
          </div>
        </div>

        <div className="route-summary-box planned">
          <div className="route-summary-box-icon">
            <MdSchedule />
          </div>
          <div className="route-summary-box-content">
            <h2>{summary.plannedRoutes}</h2>
            <p>Planned</p>
          </div>
        </div>

        <div className="route-summary-box total">
          <div className="route-summary-box-icon">
            <MdTimeline />
          </div>
          <div className="route-summary-box-content">
            <h2>{summary.completedRoutes + summary.plannedRoutes}</h2>
            <p>Total</p>
          </div>
        </div>

        <div className={`route-summary-box status ${summary.completedRoutes > summary.plannedRoutes ? "good" : "busy"}`}>
          <div className="route-summary-box-icon">
            <div className={`route-summary-status-indicator ${summary.completedRoutes > summary.plannedRoutes ? "good" : "busy"}`}></div>
          </div>
          <div className="route-summary-box-content">
            <h2>
              {summary.completedRoutes > summary.plannedRoutes
                ? "Good"
                : "Busy"}
            </h2>
            <p>Status</p>
          </div>
        </div>
      </div>
    </div>
  );
}