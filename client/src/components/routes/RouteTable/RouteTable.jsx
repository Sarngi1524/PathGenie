import RouteRow from "../RouteRow/RouteRow";
import "./RouteTable.css";

export default function RouteTable({
  routes,
  onView,
  onStatusUpdate,
  onDelete
}) {
  return (
    <div className="route-table-container">

      <table className="route-table">

        <thead>

          <tr>
            <th>Route ID</th>
            <th>Order ID</th>
            <th>Driver</th>
            <th>Vehicle</th>
            <th>Distance</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {routes.map((route) => (
            <RouteRow
              key={route._id}
              route={route}
              onView={onView}
              onStatusUpdate={onStatusUpdate}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}