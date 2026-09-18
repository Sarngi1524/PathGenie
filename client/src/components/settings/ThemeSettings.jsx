import "./ThemeSettings.css";

const colors = [
  "#818263",
  "#C2C395",
  "#DDBAAE",
  "#EFD7CF",
  "#DCD4C1",
  "#F6EAD4",
];

export default function ThemeSettings({
  settings,
  handleChange,
}) {
  return (
    <div className="settings-card">
      <div className="card-header">
        <h2>Appearance</h2>

        <p>
          Customize the look and feel of your dashboard.
        </p>
      </div>

      <div className="theme-section">

        {/* Theme */}

        <div className="theme-option">
          <label>Dashboard Theme</label>

          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark" disabled>
              Dark (Coming Soon)
            </option>
          </select>
        </div>

        {/* Color */}

        <div className="theme-option">

          <label>Primary Color</label>

          <div className="color-picker">

            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`color-circle ${
                  settings.primaryColor === color
                    ? "active"
                    : ""
                }`}
                style={{
                  background: color,
                }}
                onClick={() =>
                  handleChange({
                    target: {
                      name: "primaryColor",
                      value: color,
                    },
                  })
                }
              />
            ))}

          </div>

        </div>

        {/* Preview */}

        <div className="theme-preview">

          <h4>Preview</h4>

          <div
            className="preview-card"
            style={{
              borderTop: `5px solid ${settings.primaryColor}`,
            }}
          >
            <h5>PathGenie Dashboard</h5>

            <p>
              This is how your dashboard theme will
              look.
            </p>

            <button
              style={{
                background: settings.primaryColor,
              }}
            >
              Preview Button
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}