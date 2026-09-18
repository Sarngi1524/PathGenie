import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Drivers.css";

import DashboardLayout from "../../layouts/DashboardLayout";

import DriversHeader from "../../components/drivers/DriversHeader";
import DriversStats from "../../components/drivers/DriversStats";
import DriversFilters from "../../components/drivers/DriversFilters";
import DriversTable from "../../components/drivers/DriversTable";
import DriversPagination from "../../components/drivers/DriversPagination";
import DriverDetailsModal from "../../components/drivers/DriverDetailsModal";
import DriversSkeleton from "../../components/drivers/DriversSkeleton";
import DriversEmptyState from "../../components/drivers/DriversEmptyState";

import {
  getDrivers,
  getDriverStats,
} from "../../services/driverService";

const ITEMS_PER_PAGE = 10;

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
 const [search, setSearch] = useState("");
const [status, setStatus] = useState("");


  const [loading, setLoading] = useState(true);

  const [selectedDriver, setSelectedDriver] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);


  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
  totalDrivers: 0,
  activeDrivers: 0,
  inactiveDrivers: 0,
});

  useEffect(() => {
    loadDrivers();
  }, []);

  useEffect(() => {
    filterDrivers();
  }, [search, drivers]);

  const loadDrivers = async () => {
    try {
      setLoading(true);

      const driverRes = await getDrivers();

      setDrivers(driverRes.data);

      const statRes = await getDriverStats();

      setStats(statRes);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  const filterDrivers = () => {
  let data = [...drivers];

  if (search) {
    const query = search.toLowerCase();

    data = data.filter(
      (driver) =>
        driver.name.toLowerCase().includes(query) ||
        driver.email.toLowerCase().includes(query) ||
        driver.phone?.toLowerCase().includes(query)
    );
  }

  if (status === "active") {
    data = data.filter((driver) => driver.isActive);
  }

  if (status === "inactive") {
    data = data.filter((driver) => !driver.isActive);
  }

  setFilteredDrivers(data);
  setPage(1);
};

  const totalPages = Math.ceil(
    filteredDrivers.length / ITEMS_PER_PAGE
  );

  const paginatedDrivers =
    filteredDrivers.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  return (
    <DashboardLayout>
      <div className="drivers-page">

        <DriversHeader />

        <DriversStats stats={stats} />
<DriversFilters
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
/>

        {loading ? (
          <DriversSkeleton />
        ) : paginatedDrivers.length === 0 ? (
          <DriversEmptyState />
        ) : (
          <>
            <DriversTable
              drivers={paginatedDrivers}
              onView={(driver) => {
                setSelectedDriver(driver);
                setShowDetails(true);
              }}
            />

            <DriversPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}

        <DriverDetailsModal
          open={showDetails}
          driver={selectedDriver}
          onClose={() =>
            setShowDetails(false)
          }
        />

      </div>
    </DashboardLayout>
  );
};

export default Drivers;