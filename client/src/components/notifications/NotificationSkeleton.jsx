import "./NotificationSkeleton.css";

const NotificationSkeleton = () => {
  return (
    <div className="notification-skeleton">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="skeleton-card">
          <div className="skeleton-icon"></div>

          <div className="skeleton-content">
            <div className="skeleton-title"></div>

            <div className="skeleton-text"></div>

            <div className="skeleton-time"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;