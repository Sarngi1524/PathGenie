import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import "./Reports.css";

import ReportHeader from "../../components/reports/ReportHeader";
import ReportStats from "../../components/reports/ReportStats";
import ReportsFilter from "../../components/reports/ReportsFilter";
import DeliveryChart from "../../components/reports/DeliveryChart";
import VehicleChart from "../../components/reports/VehicleChart";
import DriverChart from "../../components/reports/DriverChart";
import ReportsSkeleton from "../../components/reports/ReportsSkeleton";
import MonthlyTrendChart from "../../components/reports/MonthlyTrendChart";
import TopDrivers from "../../components/reports/TopDrivers";
import TopRoutes from "../../components/reports/TopRoutes";
import RecentActivity from "../../components/reports/RecentActivity";
import ExportButtons from "../../components/reports/ExportButtons";

import {
  getDashboardReport,
  getDeliveryStatusReport,
  getVehicleReport,
  getDriverReport,
  getMonthlyTrend,
  getTopDrivers,
  getTopRoutes,
  getRecentActivity
} from "../../services/reportService";

const Reports = () => {
  const [dashboard, setDashboard] = useState({});
  const [deliveryData, setDeliveryData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [vehicleType, setVehicleType] = useState("");
const [status, setStatus] = useState("");
const [monthlyData, setMonthlyData] = useState([]);
const [topDrivers, setTopDrivers] = useState([]);
const [topRoutes, setTopRoutes] = useState([]);
const [recentActivity, setRecentActivity] = useState([]);

  const loadReports = async () => {
    try {
      setLoading(true);

      const [
        dashboardRes,
        deliveryRes,
        vehicleRes,
        driverRes,
        monthlyRes,
        topDriverRes,
        topRouteRes,
        recentActivityRes,
      ] = await Promise.all([
        getDashboardReport(),
        getDeliveryStatusReport(),
        getVehicleReport(),
        getDriverReport(),
        getMonthlyTrend(),
        getTopDrivers(),
        getTopRoutes(),
        getRecentActivity(),
      ]);

      setDashboard(dashboardRes.data);
      setDeliveryData(deliveryRes.data);
      setVehicleData(vehicleRes.data);
      setDriverData(driverRes.data);
      setMonthlyData(monthlyRes.data);
      setTopDrivers(topDriverRes.data);
      setTopRoutes(topRouteRes.data);
      setRecentActivity(recentActivityRes.data);
      

    } catch (error) {
      console.error(error);
      toast.error("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <DashboardLayout>
      <div className="reports-page">

       <div className="reports-top">

    <ReportHeader />

    <ExportButtons dashboard={dashboard} />

</div>

       <ReportsFilter
  startDate={startDate}
  endDate={endDate}
  vehicleType={vehicleType}
  status={status}
  setStartDate={setStartDate}
  setEndDate={setEndDate}
  setVehicleType={setVehicleType}
  setStatus={setStatus}
  onReset={() => {
    setStartDate("");
    setEndDate("");
    setVehicleType("");
    setStatus("");
  }}
/>

        {loading ? (
          <ReportsSkeleton />
        ) : (
          <>
            <ReportStats stats={dashboard} />
            <MonthlyTrendChart data={monthlyData} />

            <div className="reports-grid">

              <DeliveryChart data={deliveryData} />

              <VehicleChart data={vehicleData} />

              <DriverChart data={driverData} />

               <TopDrivers data={topDrivers} />

                <TopRoutes data={topRoutes} />

            </div>
            <RecentActivity data={recentActivity} />
          </>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Reports;