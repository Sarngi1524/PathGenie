import "./FleetTable.css";
import FleetRow from "./FleetRow";

const FleetTable = ({
  vehicles,
  onView,
  onEdit,
  onDelete,
  onAssign,
  onUnassign,
  onStatusUpdate,
}) => {
  return (
    <div className="fleet-table-container">
      <table className="fleet-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Type</th>
            <th>Fuel</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <FleetRow
              key={vehicle._id}
              vehicle={vehicle}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onAssign={onAssign}
              onUnassign={onUnassign}
              onStatusUpdate={onStatusUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetTable;