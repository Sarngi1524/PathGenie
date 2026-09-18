import "./ProfileSettings.css";
import { FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ProfileSettings({
  settings,
  handleChange,
}) {
  return (
    <div id="profile-settings" className="settings-card">
      <div className="card-header">
        <h2>👤 Profile Information</h2>

        <p>Update your personal information.</p>
      </div>

      <div className="profile-avatar">
        <FaUserCircle />
      </div>

      <div className="settings-grid">

        <div className="form-group">
          <label>Full Name</label>

          <div className="input-box">
            <FaUserCircle />

            <input
              type="text"
              name="name"
              value={settings.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address</label>

          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number</label>

          <div className="input-box">
            <FaPhone />

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>

      </div>
    </div>
  );
}