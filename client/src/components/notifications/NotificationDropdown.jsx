import { useEffect, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
} from "../../services/notificationService";

import NotificationCard from "./NotificationCard";
import NotificationSkeleton from "./NotificationSkeleton";
import EmptyNotifications from "./EmptyNotifications";

import "./NotificationDropdown.css";

const NotificationDropdown = ({ onClose, refreshStats }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();

      setNotifications(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      refreshStats?.();

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllNotificationsAsRead();
      refreshStats?.();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = async () => {
    try {
      await clearNotifications();
      refreshStats?.();
      setNotifications([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Notifications</h3>

        <button onClick={onClose}>✕</button>
      </div>

      <div className="notification-actions">
        <button onClick={handleMarkAll}>
          Mark all read
        </button>

        <button onClick={handleClear}>
          Clear all
        </button>
      </div>

      <div className="notification-list">
        {loading ? (
          <NotificationSkeleton />
        ) : notifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onRead={handleRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;