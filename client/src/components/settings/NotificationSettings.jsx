import "./NotificationSettings.css";

export default function NotificationSettings({
  settings,
  handleChange,
}) {
  return (
    <div className="settings-card">
      <div className="card-header">
        <h2>🔔 Notification Preferences</h2>

        <p>
          Choose which notifications you want to receive.
        </p>
      </div>

      <div className="notification-settings">

        <div className="notification-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive important updates via email.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />

            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Delivery Alerts</h4>
            <p>Get notified about delivery updates.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              name="deliveryAlerts"
              checked={settings.deliveryAlerts}
              onChange={handleChange}
            />

            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Driver Alerts</h4>
            <p>Receive driver assignment notifications.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              name="driverAlerts"
              checked={settings.driverAlerts}
              onChange={handleChange}
            />

            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Fleet Alerts</h4>
            <p>Get notified about vehicle updates.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              name="fleetAlerts"
              checked={settings.fleetAlerts}
              onChange={handleChange}
            />

            <span className="slider"></span>
          </label>
        </div>

      </div>
    </div>
  );
}