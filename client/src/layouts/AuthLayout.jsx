import "./AuthLayout.css";

export default function AuthLayout({ left, right }) {
  return (
    <div className="auth-page">

      {/* Background Decorations */}
      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>
      <div className="bg-circle circle-3"></div>

      <div className="auth-container">

        {/* Left Section */}
        <div className="auth-left">
          {left}
        </div>

        {/* Right Section */}
        <div className="auth-right">

          <div className="auth-form-card">

            <div className="auth-badge">
              🚚 Smart Logistics Platform
            </div>

            {right}

          </div>

        </div>

      </div>

    </div>
  );
}