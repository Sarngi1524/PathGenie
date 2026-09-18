import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";
import {
  getDriverProfile,
  updateDriverProfile,
} from "../../services/driverService";

import "./Settings.css";

export default function DriverSettings() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsUpdates: false,
    autoAcceptOrders: true,
    darkMode: false,
  });
  const [payPerKm, setPayPerKm] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadDriverSettings();
  }, []);

  const loadDriverSettings = async () => {
    try {
      const res = await getDriverProfile();
      setPayPerKm(res.data.driver.payPerKm || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePayRate = async () => {
    try {
      setSaving(true);
      await updateDriverProfile({ payPerKm });
      alert("Pay rate updated successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update pay rate.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DriverLayout>
      <div className="driver-settings-page">
        <div className="driver-settings-card">
          <div className="driver-settings-header">
            <div>
              <h2>Driver Settings</h2>
              <p>Manage your driver preferences and payout setup.</p>
            </div>
          </div>

          <div className="settings-list">
            <div className="setting-row">
              <div>
                <h3>Push Notifications</h3>
                <p>Receive delivery and alert notifications in the app.</p>
              </div>
              <button
                type="button"
                className={`toggle-btn ${settings.pushNotifications ? "on" : ""}`}
                onClick={() => handleToggle("pushNotifications")}
              >
                <span />
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>SMS Updates</h3>
                <p>Get status updates and reminders through SMS.</p>
              </div>
              <button
                type="button"
                className={`toggle-btn ${settings.smsUpdates ? "on" : ""}`}
                onClick={() => handleToggle("smsUpdates")}
              >
                <span />
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Auto Accept Orders</h3>
                <p>Automatically accept new assigned deliveries.</p>
              </div>
              <button
                type="button"
                className={`toggle-btn ${settings.autoAcceptOrders ? "on" : ""}`}
                onClick={() => handleToggle("autoAcceptOrders")}
              >
                <span />
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Dark Mode</h3>
                <p>Use a darker app theme for low-light viewing.</p>
              </div>
              <button
                type="button"
                className={`toggle-btn ${settings.darkMode ? "on" : ""}`}
                onClick={() => handleToggle("darkMode")}
              >
                <span />
              </button>
            </div>

            <div className="setting-row payout-row">
              <div>
                <h3>Pay per KM</h3>
                <p>Set the amount you want to earn for each kilometer driven.</p>
              </div>
              <div className="payout-input-wrap">
                <label className="payout-label">₹</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={payPerKm}
                  onChange={(e) => setPayPerKm(Number(e.target.value))}
                  className="payout-input"
                />
                <button
                  type="button"
                  className="save-pay-btn"
                  onClick={handleSavePayRate}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Rate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}
