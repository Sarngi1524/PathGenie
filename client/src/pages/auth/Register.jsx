import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Logo from "../../components/common/Logo/Logo";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

import { registerUser } from "../../services/authService";

import "../../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      left={
        <div className="register-left-content">
          <Logo />

          <h2>Join PathGenie Today</h2>

          <p>
            Manage deliveries, optimize routes, monitor fleets and grow your
            logistics business with ease.
          </p>

          <img
            src="/images/auth/register-illustration.png"
            alt="Register"
            className="register-image"
          />
        </div>
      }
      right={
        <div className="register-form">
          <h1>Create Account 🚀</h1>

          <p>Create your PathGenie account.</p>
<form onSubmit={handleSubmit}>

  <div className="register-grid">

    <Input
      label="Full Name"
      name="name"
      placeholder="Enter your name"
      value={formData.name}
      onChange={handleChange}
    />

    <Input
      label="Email"
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
    />

    <Input
      label="Phone Number"
      type="tel"
      name="phone"
      placeholder="Enter phone number"
      value={formData.phone}
      onChange={handleChange}
    />

    <div></div>

  </div>

  <Input
    label="Password"
    type="password"
    name="password"
    placeholder="Create password"
    value={formData.password}
    onChange={handleChange}
  />

  <Input
    label="Confirm Password"
    type="password"
    name="confirmPassword"
    placeholder="Confirm password"
    value={formData.confirmPassword}
    onChange={handleChange}
  />

  <Button
    type="submit"
    variant="primary"
    disabled={loading}
  >
    {loading ? "Creating Account..." : "Create Account"}
  </Button>

</form>
      

          <div className="login-link">
            <p>
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </div>
        </div>
      }
    />
  );
}