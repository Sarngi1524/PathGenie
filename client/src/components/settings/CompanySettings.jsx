import "./CompanySettings.css";
import {
  FaBuilding,
  FaFileInvoice,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAsia,
} from "react-icons/fa";

export default function CompanySettings({
  settings,
  handleChange,
}) {
  return (
    <div className="settings-card">
      <div className="card-header">
        <h2>🏢 Company Information</h2>

        <p>
          Update your business details and company information.
        </p>
      </div>

      <div className="settings-grid">

        <div className="form-group">
          <label>Company Name</label>

          <div className="input-box">
            <FaBuilding />

            <input
              type="text"
              name="companyName"
              value={settings.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>GST Number</label>

          <div className="input-box">
            <FaFileInvoice />

            <input
              type="text"
              name="gstNumber"
              value={settings.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST number"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address</label>

          <div className="input-box">
            <FaMapMarkerAlt />

            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Enter company address"
            />
          </div>
        </div>

        <div className="form-group">
          <label>City</label>

          <div className="input-box">
            <FaCity />

            <input
              type="text"
              name="city"
              value={settings.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Country</label>

          <div className="input-box">
            <FaGlobeAsia />

            <input
              type="text"
              name="country"
              value={settings.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>
        </div>

      </div>
    </div>
  );
}