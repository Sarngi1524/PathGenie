import "./ExportButtons.css";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportButtons = ({ dashboard }) => {

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("PathGenie Reports", 14, 20);

    autoTable(doc, {
      startY: 35,
      head: [["Metric", "Value"]],
      body: [
        ["Total Deliveries", dashboard.totalDeliveries || 0],
        ["Completed Deliveries", dashboard.completedDeliveries || 0],
        ["Pending Deliveries", dashboard.pendingDeliveries || 0],
        ["Total Vehicles", dashboard.totalVehicles || 0],
        ["Total Drivers", dashboard.totalDrivers || 0],
        ["Total Routes", dashboard.totalRoutes || 0],
      ],
    });

    doc.save("PathGenie_Report.pdf");
  };

  const exportExcel = () => {

    const report = [
      {
        "Total Deliveries": dashboard.totalDeliveries,
        "Completed": dashboard.completedDeliveries,
        "Pending": dashboard.pendingDeliveries,
        "Vehicles": dashboard.totalVehicles,
        "Drivers": dashboard.totalDrivers,
        "Routes": dashboard.totalRoutes,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(report);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Reports"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(blob, "PathGenie_Report.xlsx");
  };

  return (
    <div className="export-buttons">

      <button
        className="excel-btn"
        onClick={exportExcel}
      >
        <FaFileExcel />
        Export Excel
      </button>

      <button
        className="pdf-btn"
        onClick={exportPDF}
      >
        <FaFilePdf />
        Export PDF
      </button>

    </div>
  );
};

export default ExportButtons;