import "./Dashboard.css";
import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner/WelcomeBanner";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import DeliveryChart from "../../components/dashboard/DeliveryChart/DeliveryChart";
import RecentDeliveries from "../../components/dashboard/RecentDeliveries/RecentDeliveries";
import FleetStatus from "../../components/dashboard/FleetStatus/FleetStatus";
import RouteSummary from "../../components/dashboard/RouteSummary/RouteSummary";

import {
  FaBoxes,
  FaTruck,
  FaUsers,
  FaRoute,
} from "react-icons/fa";

import { getDashboardData } from "../../services/dashboardService";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

 const loadDashboard = async () => {
  try {
    const response = await getDashboardData();

    console.log("Dashboard API:", response);

    console.log("Dashboard Data:", response.data);

    setDashboard(response.data.data);

  } catch (error) {
    console.error("Dashboard Error:", error);

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="dashboard-loading">
          <h2>Loading Dashboard...</h2>
        </div>
      </DashboardLayout>
    );
  }

  if (!dashboard) {
    return (
      <DashboardLayout>
        <div className="dashboard-loading">
          <h2>Unable to load dashboard.</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <WelcomeBanner />

      <div className="stats-grid">
        <StatsCard
          title="Deliveries"
          value={dashboard.stats.totalDeliveries}
          icon={<FaBoxes />}
          color="#818263"
          change={`${dashboard.stats.deliveredDeliveries} Delivered`}
        />

        <StatsCard
          title="Fleet"
          value={dashboard.stats.totalVehicles}
          icon={<FaTruck />}
          color="#C2C395"
          change={`${dashboard.stats.availableVehicles} Available`}
        />

        <StatsCard
          title="Drivers"
          value={dashboard.stats.totalDrivers}
          icon={<FaUsers />}
          color="#DDBAAE"
          change="Active Drivers"
        />

        <StatsCard
          title="Routes"
          value={dashboard.stats.totalRoutes}
          icon={<FaRoute />}
          color="#A5C882"
         change={`${dashboard.routeSummary.plannedRoutes} Planned`}
        />
      </div>

      <div className="dashboard-grid">
        <DeliveryChart data={dashboard.monthlyDeliveries} />

        <RecentDeliveries
          deliveries={dashboard.recentDeliveries}
        />
      </div>

      <div className="dashboard-grid second-grid">
        <FleetStatus
          vehicles={dashboard.fleetStatus}
        />

        <RouteSummary
          summary={dashboard.routeSummary}
        />
      </div>
    </DashboardLayout>
  );
}