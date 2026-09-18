import { useEffect, useState } from "react";
import DriverLayout from "../../layouts/DriverLayout";
import {
  getDriverProfile,
  updateDriverProfile,
} from "../../services/driverService";

import "./Profile.css";

export default function Profile() {
  const [driver, setDriver] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getDriverProfile();

      setDriver(res.data.driver);

      setFormData({
        name: res.data.driver.name || "",
        phone: res.data.driver.phone || "",
        avatar: res.data.driver.avatar || "",
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateDriverProfile(formData);

      alert("Profile updated successfully.");

      loadProfile();

    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DriverLayout>
        Loading...
      </DriverLayout>
    );
  }

  return (
    <DriverLayout>

      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-avatar">

            <img
              src={
                formData.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(formData.name)
              }
              alt="Driver"
            />

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Email</label>

              <input
                value={driver.email}
                disabled
              />

            </div>

            <div className="form-group">

              <label>Phone</label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Avatar URL</label>

              <input
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Role</label>

              <input
                value={driver.role}
                disabled
              />

            </div>

            <button
              className="save-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Update Profile"}
            </button>

          </form>

        </div>

      </div>

    </DriverLayout>
  );
}