import { useEffect, useState } from "react";
import { FaBell, FaCheck, FaInbox } from "react-icons/fa";
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
      const response = await getDriverNotifications();
      setNotifications(response.data?.notifications || []);
      setUnread(Number(response.data?.unread) || 0);
      window.dispatchEvent(new Event("driver-notifications-updated"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();
      loadNotifications();
    } catch (error) {
      console.error(error);
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
        <div className="driver-notification-header">
          <div className="driver-notification-title">
            <div className="driver-notification-icon">
              <FaBell />
            </div>
            <div>
              <span className="driver-notification-kicker">Updates & alerts</span>
              <h2>Notifications</h2>
              <p>
                {unread > 0
                  ? `${unread} unread notification${unread === 1 ? "" : "s"}`
                  : "You are all caught up"}
              </p>
            </div>
          </div>

          {unread > 0 && (
            <button className="driver-mark-all-btn" onClick={handleReadAll}>
              <FaCheck />
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="driver-empty-state">
            <div className="driver-empty-icon">
              <FaInbox />
            </div>
            <h3>No notifications yet</h3>
            <p>New delivery and account updates will appear here.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`driver-notification-card ${
                item.isRead ? "read" : "unread"
              }`}
            >
              <div className="driver-notification-card-icon">
                <FaBell />
              </div>

              <div className="driver-notification-content">
                <h3>{item.title}</h3>
                <p>{item.message}</p>

                {item.relatedDelivery && (
                  <span className="driver-delivery-tag">
                    Order: {item.relatedDelivery.orderId}
                  </span>
                )}

                <small>{new Date(item.createdAt).toLocaleString()}</small>
              </div>

              {!item.isRead && (
                <button
                  className="driver-read-btn"
                  onClick={() => handleRead(item._id)}
                >
                  Mark read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </DriverLayout>
  );
}
