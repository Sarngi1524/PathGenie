import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import "./Fleet.css";

import FleetHeader from "../../components/fleet/FleetHeader";
import FleetStats from "../../components/fleet/FleetStats";
import FleetFilters from "../../components/fleet/FleetFilters";
import FleetTable from "../../components/fleet/FleetTable";
import FleetPagination from "../../components/fleet/FleetPagination";
import VehicleModal from "../../components/fleet/VehicleModal";
import VehicleDetailsModal from "../../components/fleet/VehicleDetailsModal";
import AssignDriverModal from "../../components/fleet/AssignDriverModal";
import FleetSkeleton from "../../components/fleet/FleetSkeleton";
import FleetEmptyState from "../../components/fleet/FleetEmptyState";

import {
  getVehicles,
  getFleetStats,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus,
  assignDriver,
  unassignDriver,
} from "../../services/vehicleService";

const Fleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // ==========================
  // Load Vehicles
  // ==========================

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const res = await getVehicles({
        page,
        search,
        status,
        vehicleType,
      });

      setVehicles(res.data);
      setTotalPages(res.totalPages);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Load Fleet Stats
  // ==========================

  const loadStats = async () => {
    try {
      const res = await getFleetStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadVehicles();
    loadStats();
  }, [page, search, status, vehicleType]);

  // ==========================
  // CRUD
  // ==========================

  const handleCreate = async (vehicleData) => {
    try {
      await createVehicle(vehicleData);

      toast.success("Vehicle created successfully");

      setShowModal(false);

      loadVehicles();
      loadStats();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create vehicle"
      );
    }
  };

  const handleUpdate = async (id, vehicleData) => {
    try {
      await updateVehicle(id, vehicleData);

      toast.success("Vehicle updated successfully");

      setShowModal(false);

      loadVehicles();
      loadStats();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update vehicle"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    try {
      await deleteVehicle(id);

      toast.success("Vehicle deleted");

      loadVehicles();
      loadStats();

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateVehicleStatus(id, status);

      toast.success("Status updated");

      loadVehicles();
      loadStats();

    } catch (err) {
      toast.error("Unable to update status");
    }
  };

  return (
    <DashboardLayout>

      <div className="fleet-page">

        <FleetHeader
          onAdd={() => {
            setSelectedVehicle(null);
            setShowModal(true);
          }}
        />

        <FleetStats stats={stats} />

        <FleetFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />

        {loading ? (
          <FleetSkeleton />
        ) : vehicles.length === 0 ? (
          <FleetEmptyState />
        ) : (
          <>
            <FleetTable
              vehicles={vehicles}
              onView={(vehicle) => {
                setSelectedVehicle(vehicle);
                setShowDetails(true);
              }}
              onEdit={(vehicle) => {
                setSelectedVehicle(vehicle);
                setShowModal(true);
              }}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
              onAssign={(vehicle) => {
                setSelectedVehicle(vehicle);
                setShowAssignModal(true);
              }}
              onUnassign={unassignDriver}
            />

            <FleetPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        )}

        <VehicleModal
          open={showModal}
          onClose={() => setShowModal(false)}
          vehicle={selectedVehicle}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />

        <VehicleDetailsModal
          open={showDetails}
          onClose={() => setShowDetails(false)}
          vehicle={selectedVehicle}
        />

        <AssignDriverModal
          open={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          vehicle={selectedVehicle}
          onAssign={assignDriver}
          refresh={loadVehicles}
        />

      </div>

    </DashboardLayout>
  );
};

export default Fleet;