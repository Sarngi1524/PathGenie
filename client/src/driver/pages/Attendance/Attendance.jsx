import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";

import {
  getAttendance,
  checkIn,
  checkOut,
} from "../../services/driverService";

import "./Attendance.css";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance();
      setAttendance(res.data.attendance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await checkIn();
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut();
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <DriverLayout>
        Loading...
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>

      <div className="attendance-page">

        <div className="attendance-header">

          <h2>Attendance</h2>

          <div className="attendance-actions">
            <button
              className="checkin-btn"
              onClick={handleCheckIn}
            >
              Check In
            </button>

            <button
              className="checkout-btn"
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          </div>

        </div>

        <table>

          <thead>

            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => (

              <tr key={item._id}>

                <td>
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td>
                  {item.checkIn
                    ? new Date(item.checkIn).toLocaleTimeString()
                    : "-"}
                </td>

                <td>
                  {item.checkOut
                    ? new Date(item.checkOut).toLocaleTimeString()
                    : "-"}
                </td>

                <td>{item.totalHours || 0} hrs</td>

                <td>{item.status}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DriverLayout>
  );
}