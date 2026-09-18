import "./FleetStatus.css";

export default function FleetStatus({ vehicles = [] }) {
  return (
    <div className="fleet-card">
      <div className="card-header">
        <h3>Fleet Status</h3>
        <span>{vehicles.length} Vehicles</span>
      </div>

      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <div className="fleet-item" key={vehicle._id}>
            <div className="fleet-left">
              <h4>{vehicle.vehicleNumber}</h4>

              <p>
                {vehicle.vehicleType} • {vehicle.capacity} kg
              </p>

              <small>
                Driver : {vehicle.driver?.name || "Not Assigned"}
              </small>
            </div>

            <div className="fleet-right">
              <span
                className={`status ${vehicle.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {vehicle.status}
              </span>

              <small>{vehicle.fuelType}</small>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <h4>No Vehicles Available</h4>
          <p>Add a vehicle to view fleet status.</p>
        </div>
      )}
    </div>
  );
}