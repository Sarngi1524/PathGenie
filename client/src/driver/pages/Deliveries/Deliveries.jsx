import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";
import { getMyDeliveries } from "../../services/driverService";
import { useNavigate } from "react-router-dom";

import "./Deliveries.css";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  useEffect(() => {
    filterDeliveries();
  }, [search, statusFilter, deliveries]);

  const fetchDeliveries = async () => {
    try {
      const res = await getMyDeliveries();

      setDeliveries(res.data.deliveries);
      setFilteredDeliveries(res.data.deliveries);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterDeliveries = () => {

    let data = [...deliveries];

    if (search) {
      data = data.filter((item) =>
        item.customerName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (item) => item.status === statusFilter
      );
    }

    setFilteredDeliveries(data);
  };

  if (loading) {
    return (
      <DriverLayout>
        <h2>Loading...</h2>
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>

      <div className="deliveries-page">

        <div className="deliveries-header">

          <h2>My Deliveries</h2>

          <div className="filters">

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Assigned</option>
              <option>Picked Up</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Failed</option>
            </select>

          </div>

        </div>

        <div className="table-wrapper">
          <table>

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {filteredDeliveries.map((delivery) => (

                <tr
                  key={delivery._id}
                  onClick={() =>
                    navigate(`/driver/deliveries/${delivery._id}`)
                  }
                  style={{ cursor: "pointer" }}
                >

                  <td>{delivery.orderId}</td>

                  <td>{delivery.customerName}</td>

                  <td>{delivery.pickupAddress}</td>

                  <td>{delivery.deliveryAddress}</td>

                  <td>

                    <span
                      className={`status ${delivery.status
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >
                      {delivery.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>

    </DriverLayout>
  );
}