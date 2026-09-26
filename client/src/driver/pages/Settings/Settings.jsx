import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";
import {
  getDriverProfile,
  updateDriverProfile,
} from "../../services/driverService";
import SecuritySettings from "../../../components/settings/SecuritySettings";
import ThemeSettings from "../../../components/settings/ThemeSettings";
import { getSettings, updateSettings } from "../../../services/settingsService";
import {
  applyPrimaryColor,
  getStoredPrimaryColor,
} from "../../../utils/themeUtils";

import "./Settings.css";
import { notify } from "../../../utils/notifications";

export default function DriverSettings() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    smsUpdates: false,
    autoAcceptOrders: true,
  });
  const [payPerKm, setPayPerKm] = useState(0);
  const [saving, setSaving] = useState(false);
  const [appearance, setAppearance] = useState({
    primaryColor: getStoredPrimaryColor(),
  });
  const [savingAppearance, setSavingAppearance] = useState(false);

  useEffect(() => {
    loadDriverSettings();
  }, []);

  const loadDriverSettings = async () => {
    try {
      const res = await getDriverProfile();
      setPayPerKm(res.data.driver.payPerKm || 0);

      const settingsRes = await getSettings();
      const primaryColor =
        settingsRes.data?.primaryColor || getStoredPrimaryColor();

      setAppearance({ primaryColor });
      applyPrimaryColor(primaryColor);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAppearanceChange = (event) => {
    const { name, value } = event.target;

    setAppearance((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "primaryColor") {
      applyPrimaryColor(value);
    }
  };

  const handleSaveAppearance = async () => {
    try {
      setSavingAppearance(true);
      await updateSettings(appearance);
      applyPrimaryColor(appearance.primaryColor);
      notify.success("Appearance updated successfully.");
    } catch (err) {
      notify.error(
        err.response?.data?.message || "Failed to update appearance."
      );
    } finally {
      setSavingAppearance(false);
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
      notify.success("Pay rate updated successfully.");
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to update pay rate.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DriverLayout>
      <div className="driver-settings-page">
        <div className="driver-settings-content">
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

          <SecuritySettings />

          <ThemeSettings
            settings={appearance}
            handleChange={handleAppearanceChange}
          />

          <button
            type="button"
            className="save-appearance-btn"
            onClick={handleSaveAppearance}
            disabled={savingAppearance}
          >
            {savingAppearance ? "Saving Appearance..." : "Save Appearance"}
          </button>
        </div>
      </div>
    </DriverLayout>
  );
}
