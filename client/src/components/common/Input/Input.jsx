import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import "./Input.css";

export default function Input({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    switch (name) {
      case "name":
        return <FiUser />;
      case "email":
        return <FiMail />;
      case "phone":
        return <FiPhone />;
      case "password":
      case "confirmPassword":
        return <FiLock />;
      default:
        return <FiUser />;
    }
  };

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="input-group">

      <label>{label}</label>

      <div className="input-wrapper">

        <span className="input-icon">
          {getIcon()}
        </span>

        <input
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        {(type === "password") && (

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        )}

      </div>

    </div>
  );
}