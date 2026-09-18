import "./RecentDeliveries.css";

export default function RecentDeliveries({
  deliveries = [],
}) {
  return (
    <div className="recent-card">
      <div className="recent-header">
        <h3>Recent Deliveries</h3>

        <span>{deliveries.length} Orders</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.length > 0 ? (
            deliveries.map((item) => (
              <tr key={item._id}>
                <td>{item.orderId}</td>

                <td>{item.customerName}</td>

                <td>
                  {item.driver?.name || "Not Assigned"}
                </td>

                <td>
                  <span
                    className={`status ${item.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`priority ${item.priority
                      .toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-table">
                No Deliveries Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}