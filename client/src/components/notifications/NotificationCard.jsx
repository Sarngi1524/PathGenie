import {
  FaTruck,
  FaRoute,
  FaUserTie,
  FaCarSide,
  FaCog,
  FaCircle,
} from "react-icons/fa";

import "./NotificationCard.css";

const NotificationCard = ({ notification, onRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case "delivery":
        return <FaTruck className="notification-icon delivery" />;

      case "route":
        return <FaRoute className="notification-icon route" />;

      case "driver":
        return <FaUserTie className="notification-icon driver" />;

      case "fleet":
        return <FaCarSide className="notification-icon fleet" />;

      default:
        return <FaCog className="notification-icon system" />;
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className={`notification-card ${
        !notification.isRead ? "unread" : ""
      }`}
      onClick={() => {
        if (!notification.isRead) {
          onRead(notification._id);
        }
      }}
    >
      <div className="notification-left">
        {getIcon()}
      </div>

      <div className="notification-content">
        <h4>{notification.title}</h4>

        <p>{notification.message}</p>

        <span>{formatTime(notification.createdAt)}</span>
      </div>

      {!notification.isRead && (
        <FaCircle className="unread-dot" />
      )}
    </div>
  );
};

export default NotificationCard;