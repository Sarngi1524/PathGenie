import "./Logo.css";
import logo from "../../../assets/images/logo/favicon.png";

export default function Logo() {
  return (
    <div className="logo">
      <img
        src={logo}
        alt="PathGenie Logo"
        className="logo-image"
      />

      <div className="logo-text">
        <h2 className="logo-title">PathGenie</h2>
        <p className="logo-subtitle">Smart Logistics</p>
      </div>
    </div>
  );
}