import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Logo from "../../components/common/Logo/Logo";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      // Expected response:
      // {
      //   token: "...",
      //   user: {...}
      // }

      login(res.data.user, res.data.token);

if (res.data.user.role === "admin") {
  navigate("/dashboard");
} else if (res.data.user.role === "driver") {
  navigate("/driver/dashboard");
}
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={
        <div className="login-left-content">
          <Logo />

          <h2>Smart Logistics Platform</h2>

          <p>
            Manage deliveries, optimize routes, track drivers, and monitor
            your fleet—all in one place.
          </p>

          <img
            src="/images/auth/login-illustration.png"
            alt="PathGenie Login"
            className="login-image"
          />
        </div>
      }
      right={
        <div className="login-form">
          <h1>Welcome Back 👋</h1>

          <p>Login to continue using PathGenie.</p>

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
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="register-link">
            <p>
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>
          </div>
        </div>
      }
    />
  );
}