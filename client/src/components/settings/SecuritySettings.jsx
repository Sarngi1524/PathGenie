import { useState } from "react";
import "./SecuritySettings.css";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { changePassword } from "../../services/settingsService";

export default function SecuritySettings() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      return alert("Please fill all password fields.");
    }

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await changePassword(passwords);

      alert(res.message);

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-card">

      <div className="card-header">
        <h2>🔐 Security</h2>

        <p>
          Change your account password.
        </p>
      </div>

      <div className="security-grid">

        <div className="password-group">
          <label>Current Password</label>

          <div className="password-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
            />

          </div>
        </div>

        <div className="password-group">
          <label>New Password</label>

          <div className="password-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="New Password"
            />

          </div>
        </div>

        <div className="password-group">
          <label>Confirm Password</label>

          <div className="password-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>
        </div>

      </div>

      <button
        className="password-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Updating..."
          : "Update Password"}
      </button>

    </div>
  );
}