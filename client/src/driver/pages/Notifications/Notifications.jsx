import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";
import {
  getDriverNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/driverService";

import "./Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const res = await getDriverNotifications();

      setNotifications(res.data.notifications);
      setUnread(res.data.unread);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();
      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <DriverLayout>
        <h2>Loading Notifications...</h2>
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>

      <div className="notifications-page">

        <div className="notification-header">

          <div>
            <h2>Notifications</h2>
            <p>{unread} unread notification(s)</p>
          </div>

          <button
            className="mark-all-btn"
            onClick={handleReadAll}
          >
            Mark All Read
          </button>

        </div>

        {notifications.length === 0 ? (

          <div className="empty-state">
            No notifications available.
          </div>

        ) : (

          notifications.map((item) => (

            <div
              key={item._id}
              className={`notification-card ${
                item.isRead ? "read" : "unread"
              }`}
            >

              <div className="notification-content">

                <h3>{item.title}</h3>

                <p>{item.message}</p>

                {item.relatedDelivery && (
                  <span className="delivery-tag">
                    Order : {item.relatedDelivery.orderId}
                  </span>
                )}

                <small>
                  {new Date(item.createdAt).toLocaleString()}
                </small>

              </div>

              {!item.isRead && (
                <button
                  className="read-btn"
                  onClick={() =>
                    handleRead(item._id)
                  }
                >
                  Mark Read
                </button>
              )}

            </div>

          ))

        )}

      </div>

    </DriverLayout>
  );
}