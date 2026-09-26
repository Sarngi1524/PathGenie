import "./RoleSelector.css";

export default function RoleSelector({ value, onChange }) {
  return (
    <fieldset className="role-selector">
      <legend>Continue as</legend>

      <div className="role-options">
        <label className={`role-option ${value === "admin" ? "selected" : ""}`}>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={value === "admin"}
            onChange={onChange}
          />
          <span>User</span>
        </label>

        <label className={`role-option ${value === "driver" ? "selected" : ""}`}>
          <input
            type="radio"
            name="role"
            value="driver"
            checked={value === "driver"}
            onChange={onChange}
          />
          <span>Driver</span>
        </label>
      </div>
    </fieldset>
  );
}
