import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";
import {
  getDriverEarnings,
  getMonthlyEarnings,
  getWeeklyEarnings,
  getRecentPayments,
} from "../../services/driverService";

import "./Earnings.css";

export default function Earnings() {
  const [summary, setSummary] = useState(null);
  const [earnings, setEarnings] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        earningRes,
        monthlyRes,
        weeklyRes,
        paymentRes,
      ] = await Promise.all([
        getDriverEarnings(),
        getMonthlyEarnings(),
        getWeeklyEarnings(),
        getRecentPayments(),
      ]);

      setSummary(earningRes.data.summary);
      setEarnings(earningRes.data.earnings);

      setMonthly(monthlyRes.data.monthly);

      setWeekly(weeklyRes.data.earnings);

      setPayments(paymentRes.data.payments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DriverLayout>
        <h2>Loading Earnings...</h2>
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>

      <div className="earnings-page">

        <h2>Driver Earnings</h2>

        <div className="earning-cards">

          <div className="earning-card">
            <h4>Total Earnings</h4>
            <h2>₹ {summary.totalEarnings}</h2>
          </div>

          <div className="earning-card">
            <h4>Bonus</h4>
            <h2>₹ {summary.totalBonus}</h2>
          </div>

          <div className="earning-card">
            <h4>Penalty</h4>
            <h2>₹ {summary.totalPenalty}</h2>
          </div>

          <div className="earning-card">
            <h4>Deliveries</h4>
            <h2>{summary.totalDeliveries}</h2>
          </div>

        </div>

        {/* Earnings History */}

        <div className="table-card">

          <h3>Earnings History</h3>

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Bonus</th>
                <th>Penalty</th>
              </tr>

            </thead>

            <tbody>

              {earnings.map((item) => (

                <tr key={item._id}>

                  <td>
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td>
                    {item.delivery?.orderId}
                  </td>

                  <td>
                    {item.delivery?.customerName}
                  </td>

                  <td>
                    ₹ {item.total}
                  </td>

                  <td>
                    ₹ {item.bonus}
                  </td>

                  <td>
                    ₹ {item.penalty}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Monthly Summary */}

        <div className="table-card">

          <h3>Monthly Earnings</h3>

          <table>

            <thead>

              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Total</th>
                <th>Deliveries</th>
              </tr>

            </thead>

            <tbody>

              {monthly.map((item, index) => (

                <tr key={index}>

                  <td>{item._id.month}</td>

                  <td>{item._id.year}</td>

                  <td>₹ {item.total}</td>

                  <td>{item.deliveries}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Recent Payments */}

        <div className="table-card">

          <h3>Recent Payments</h3>

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Order</th>
                <th>Customer</th>
                <th>Amount</th>
              </tr>

            </thead>

            <tbody>

              {payments.map((item) => (

                <tr key={item._id}>

                  <td>
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td>
                    {item.delivery?.orderId}
                  </td>

                  <td>
                    {item.delivery?.customerName}
                  </td>

                  <td>
                    ₹ {item.total}
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