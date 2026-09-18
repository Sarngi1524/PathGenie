import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  updateRouteStatus,
  calculateRoute,
  getRouteStats, 
} from "../../services/routeService";

import { getDeliveries } from "../../services/deliveryService";
import { getVehicles } from "../../services/vehicleService";


import RouteHeader from "../../components/routes/RouteHeader/RouteHeader";
import RouteFilters from "../../components/routes/RouteFilters/RouteFilters";
import RouteTable from "../../components/routes/RouteTable/RouteTable";
import RoutePagination from "../../components/routes/RoutePagination/RoutePagination";
import RouteModal from "../../components/routes/RouteModal/RouteModal";
import ViewRouteModal from "../../components/routes/ViewRouteModal/ViewRouteModal";
import RouteSkeleton from "../../components/routes/RouteSkeleton/RouteSkeleton";
import RouteEmptyState from "../../components/routes/RouteEmptyState/RouteEmptyState";

import { toast } from "react-toastify";

import "./Routes.css";

export default function Routes() {

  const [routes, setRoutes] = useState([]);

  const [deliveries, setDeliveries] = useState([]);

  const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [stats, setStats] = useState({
    total: 0,
    planned: 0,
    started: 0,
    completed: 0,
     totalDistance: 0,
  averageDuration: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [selectedRoute, setSelectedRoute] = useState(null);

  // ==============================
  // Load Routes
  // ==============================

  const loadRoutes = async () => {
      const routeStats = await getRouteStats();

setStats(routeStats.data);
    try {

      setLoading(true);

      const response = await getRoutes({
        page,
        status,
      });
      

      const data = response.data || [];

      setRoutes(data);

      setTotalPages(response.totalPages || 1);

      setStats({
        total: data.length,
        planned: data.filter(r => r.status === "Planned").length,
        started: data.filter(r => r.status === "Started").length,
        completed: data.filter(r => r.status === "Completed").length,
      });

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load routes."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==============================
  // Load Dropdowns
  // ==============================

  const loadDropdowns = async () => {

    try {

      const [deliveryRes, vehicleRes] = await Promise.all([
        getDeliveries({
          limit: 100,
        }),
        getVehicles({
          limit: 100,
        }),
      ]);

      setDeliveries(deliveryRes.data || []);

      setVehicles(vehicleRes.data || []);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadRoutes();

  }, [page, status]);

  useEffect(() => {

    loadDropdowns();

  }, []);

  // ==============================
  // Modal
  // ==============================

  const openCreateModal = () => {

    setModalOpen(true);

  };

  const closeModal = () => {

    setModalOpen(false);

  };

  const handleCreate = async (formData) => {

    try {

      await createRoute(formData);

      toast.success("Route created successfully.");

      closeModal();

      loadRoutes();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create route."
      );

    }

  };
  const handleStatusUpdate = async (routeId, status) => {
  try {

    await updateRouteStatus(routeId, status);

    toast.success(`Route ${status.toLowerCase()} successfully.`);

    loadRoutes();

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Unable to update route."
    );

  }
};
const handleDelete = async (id) => {
  if (!window.confirm("Delete this route?")) return;

  try {

    await deleteRoute(id);

    toast.success("Route deleted successfully");

    loadRoutes();

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Unable to delete route"
    );

  }
};

  // ==============================
  // View
  // ==============================

  const openViewModal = (route) => {

    setSelectedRoute(route);

    setViewOpen(true);

  };

  const closeViewModal = () => {

    setSelectedRoute(null);

    setViewOpen(false);

  };

  return (

    <DashboardLayout>

      <div className="routes-page">

        <RouteHeader
          stats={stats}
          onCreate={openCreateModal}
        />

        <RouteFilters
          status={status}
          setStatus={setStatus}
          onRefresh={loadRoutes}
        />

        {loading ? (

          <RouteSkeleton />

        ) : routes.length === 0 ? (

          <RouteEmptyState />

        ) : (

          <>
            <RouteTable
              routes={routes}
              refresh={loadRoutes}
              onView={openViewModal}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />

            <RoutePagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>

        )}

        <RouteModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmit={handleCreate}
          deliveries={deliveries}
          vehicles={vehicles}
        />

        <ViewRouteModal
          isOpen={viewOpen}
          onClose={closeViewModal}
          route={selectedRoute}
        />

      </div>

    </DashboardLayout>

  );

}