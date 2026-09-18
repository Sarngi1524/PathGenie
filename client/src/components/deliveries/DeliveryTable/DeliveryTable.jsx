import "./DeliveryTable.css";
import DeliveryRow from "../DeliveryRow/DeliveryRow";

export default function DeliveryTable({
  deliveries,
  refresh,
  onEdit,
  onView,
  onDelete,
  onAssign
}) {
  return (
    <div className="delivery-table-card">

      <div className="table-header">

        <h2>All Deliveries</h2>

        <span>{deliveries.length} Records</span>

      </div>

      <div className="table-responsive">

        <table className="delivery-table">

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Customer</th>

              <th>Pickup</th>

              <th>Destination</th>

              <th>Driver</th>

              <th>Vehicle</th>

              <th>Priority</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {deliveries.map((delivery) => (
              <DeliveryRow
                key={delivery._id}
                delivery={delivery}
                refresh={refresh}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
                onAssign={onAssign}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}