import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DriverLayout from "../../layouts/DriverLayout";
import {
  getDeliveryDetails,
  updateDeliveryStatus,
} from "../../services/driverService";

import "./DeliveryDetails.css";

export default function DeliveryDetails() {
  const { id } = useParams();

  const [delivery, setDelivery] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchDelivery();
  }, []);

  const fetchDelivery = async () => {
    try {
      const res = await getDeliveryDetails(id);

      setDelivery(res.data.delivery);
      setStatus(res.data.delivery.status);
    } catch (err) {
      console.error(err);
    }
  };

  const saveStatus = async () => {
    try {
      await updateDeliveryStatus(id, { status });

      alert("Delivery updated successfully.");

      fetchDelivery();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (!delivery) {
    return (
      <DriverLayout>
        Loading...
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>

      <div className="delivery-details">

        <h2>Delivery Details</h2>

        <div className="detail-card">

          <div>
            <strong>Order ID</strong>
            <p>{delivery.orderId}</p>
          </div>

          <div>
            <strong>Customer</strong>
            <p>{delivery.customerName}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{delivery.customerPhone}</p>
          </div>

          <div>
            <strong>Pickup Address</strong>
            <p>{delivery.pickupAddress}</p>
          </div>

          <div>
            <strong>Delivery Address</strong>
            <p>{delivery.deliveryAddress}</p>
          </div>

          <div>
            <strong>Route</strong>
            <p>
              {delivery.route?.routeName || "-"}
            </p>
          </div>

          <div>
            <strong>Vehicle</strong>
            <p>
              {delivery.vehicle?.vehicleNumber || "-"}
            </p>
          </div>

          <div>
            <strong>Priority</strong>
            <p>{delivery.priority}</p>
          </div>

          <div>
            <strong>Weight</strong>
            <p>{delivery.weight} kg</p>
          </div>

          <div>
            <strong>Notes</strong>
            <p>{delivery.notes || "-"}</p>
          </div>

        </div>

        <div className="status-card">

          <h3>Update Status</h3>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option>Assigned</option>
            <option>Picked Up</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Cancelled</option>
            <option>Failed</option>
          </select>

          <button onClick={saveStatus}>
            Update Status
          </button>

        </div>

      </div>

    </DriverLayout>
  );
}