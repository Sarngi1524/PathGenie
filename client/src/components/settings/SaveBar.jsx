import "./SaveBar.css";
import { FaSave, FaTimes } from "react-icons/fa";

export default function SaveBar({
  onSave,
  onCancel,
  saving,
}) {
  return (
    <div className="save-bar">

      <div className="save-info">

        <h3>Unsaved Changes</h3>

        <p>
          Save your changes before leaving this page.
        </p>

      </div>

      <div className="save-actions">

        <button
          className="cancel-btn"
          onClick={onCancel}
          disabled={saving}
        >
          <FaTimes />

          Cancel
        </button>

        <button
          className="save-btn"
          onClick={onSave}
          disabled={saving}
        >
          <FaSave />

          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>
  );
}