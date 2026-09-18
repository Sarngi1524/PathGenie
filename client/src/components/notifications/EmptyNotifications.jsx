import { FaBellSlash } from "react-icons/fa";
import "./EmptyNotifications.css";

const EmptyNotifications = () => {
  return (
    <div className="empty-notifications">
      <FaBellSlash className="empty-icon" />

      <h3>No Notifications</h3>

      <p>
        You're all caught up.
      </p>
    </div>
  );
};

export default EmptyNotifications;