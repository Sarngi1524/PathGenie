import { useEffect, useState } from "react";
import "./Settings.css";

import { useLocation } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

import ProfileSettings from "../../components/settings/ProfileSettings";
import CompanySettings from "../../components/settings/CompanySettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import ThemeSettings from "../../components/settings/ThemeSettings";
import SaveBar from "../../components/settings/SaveBar";

export default function Settings() {
  const location = useLocation();
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",

    companyName: "",
    gstNumber: "",
    address: "",
    city: "",
    country: "",

    emailNotifications: true,
    deliveryAlerts: true,
    driverAlerts: true,
    fleetAlerts: true,

    theme: "light",
    primaryColor: "#818263",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const timeoutId = setTimeout(() => {
        const section = document.querySelector(location.hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [location.hash, location.pathname]);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await getSettings();

      setSettings(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateSettings(settings);

      alert("Settings updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="settings-loading">
          Loading Settings...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>

          <p>
            Manage your profile, company, security, and
            preferences.
          </p>
        </div>

        <ProfileSettings
          settings={settings}
          handleChange={handleChange}
        />

        <CompanySettings
          settings={settings}
          handleChange={handleChange}
        />

        <SecuritySettings />

        <NotificationSettings
          settings={settings}
          handleChange={handleChange}
        />

        <ThemeSettings
          settings={settings}
          handleChange={handleChange}
        />

        <SaveBar
          onSave={handleSave}
          onCancel={fetchSettings}
          saving={saving}
        />
      </div>
    </DashboardLayout>
  );
}