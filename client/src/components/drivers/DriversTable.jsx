import "./DriversTable.css";
import DriverRow from "./DriverRow";

const DriversTable = ({ drivers, onView }) => {
  return (
    <div className="drivers-table-container">
      <table className="drivers-table">

        <thead>
          <tr>
            <th>Driver</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <DriverRow
              key={driver._id}
              driver={driver}
              onView={onView}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default DriversTable;