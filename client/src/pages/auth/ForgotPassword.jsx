import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Logo from "../../components/common/Logo/Logo";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import pathGenieLogo from "../../assets/images/logo/logo.png";
import { resetPassword } from "../../services/authService";

import "../../styles/forgot-password.css";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.email ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(formData);
      setSubmitted(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={
        <div className="forgot-password-left-content">
          <Logo />

          <h2>Let&apos;s get you back on track</h2>

          <p>
            Enter your email address and we&apos;ll help you recover access to
            your PathGenie account.
          </p>

          <img
            src={pathGenieLogo}
            alt="PathGenie logo"
            className="forgot-password-image"
          />
        </div>
      }
      right={
        <div className="forgot-password-form">
          <h1>Forgot Password?</h1>

          {submitted ? (
            <div className="forgot-password-message" role="status">
              <p>
                Your password was updated successfully. You can now log in
                with your new password.
              </p>
              <Link to="/login">Back to Login</Link>
            </div>
          ) : (
            <>
              <p>Enter your email and choose a new password.</p>

              {error && (
                <p className="forgot-password-error" role="alert">
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>

              <div className="forgot-password-back-link">
                <Link to="/login">Back to Login</Link>
              </div>
            </>
          )}
        </div>
      }
    />
  );
}
