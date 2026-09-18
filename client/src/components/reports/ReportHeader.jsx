import "./ReportHeader.css";
import { HiOutlineDocumentReport } from "react-icons/hi";

const ReportHeader = () => {
  return (
    <div className="report-header">
      <div className="report-header-left">

        <div className="report-icon">
          <HiOutlineDocumentReport />
        </div>

        <div>
          <h1>Reports & Analytics</h1>

          <p>
            Monitor logistics performance, delivery trends and fleet analytics.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReportHeader;