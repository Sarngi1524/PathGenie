import { useEffect, useState } from "react";
import "./Deliveries.css";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import DeliveryHeader from "../../components/deliveries/DeliveryHeader/DeliveryHeader";
import DeliveryFilters from "../../components/deliveries/DeliveryFilters/DeliveryFilters";
import DeliveryTable from "../../components/deliveries/DeliveryTable/DeliveryTable";
import Pagination from "../../components/deliveries/Pagination/Pagination";
import LoadingSkeleton from "../../components/deliveries/LoadingSkeleton/LoadingSkeleton";
import EmptyState from "../../components/deliveries/EmptyState/EmptyState";
import DeliveryModal from "../../components/deliveries/DeliveryModal/DeliveryModal";
import DeleteModal from "../../components/deliveries/DeleteModal/DeleteModal";
import { deleteDelivery } from "../../services/deliveryService";
import AssignDriverModal from "../../components/deliveries/AssignDriverModal/AssignDriverModal";
import { assignDriver } from "../../services/deliveryService";

import {
  getDeliveries,
  createDelivery,
  updateDelivery,
} from "../../services/deliveryService";

import { getDrivers } from "../../services/driverService";
import { getVehicles } from "../../services/vehicleService";
import ViewDeliveryModal from "../../components/deliveries/ViewDeliveryModal/ViewDeliveryModal";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    inTransit: 0,
    delivered: 0,
  });

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const [drivers, setDrivers] = useState([]);

  const [vehicles, setVehicles] = useState([]);
  const [viewOpen, setViewOpen] = useState(false);
const [viewDelivery, setViewDelivery] = useState(null);
const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
const [deleteItem, setDeleteItem] = useState(null);
const [assignOpen, setAssignOpen] = useState(false);
const [assignDelivery, setAssignDelivery] = useState(null);
const [assignLoading, setAssignLoading] = useState(false);
  // ===========================
  // Load Deliveries
  // ===========================
  const loadDeliveries = async () => {
    try {
      setLoading(true);

      const response = await getDeliveries({
        search,
        status,
        priority,
        page,
        limit: 10,
      });

      setDeliveries(response.data || []);

      setTotalPages(response.totalPages || 1);

      const deliveriesData = response.data || [];

      setStats({
        total: response.total || deliveriesData.length,
        pending: deliveriesData.filter(
          (item) => item.status === "Pending"
        ).length,
        assigned: deliveriesData.filter(
          (item) => item.status === "Assigned"
        ).length,
        inTransit: deliveriesData.filter(
          (item) => item.status === "In Transit"
        ).length,
        delivered: deliveriesData.filter(
          (item) => item.status === "Delivered"
        ).length,
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Load Drivers & Vehicles
  // ===========================
  const loadDropdowns = async () => {
    try {
      const driverRes = await getDrivers();
      const vehicleRes = await getVehicles();

      setDrivers(driverRes.data || []);
      setVehicles(vehicleRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  const openViewModal = (delivery) => {
  setViewDelivery(delivery);
  setViewOpen(true);
};

const closeViewModal = () => {
  setViewDelivery(null);
  setViewOpen(false);
};
const openDeleteModal = (delivery) => {
  setDeleteItem(delivery);
  setDeleteOpen(true);
};

const closeDeleteModal = () => {
  setDeleteOpen(false);
  setDeleteItem(null);
};

const handleDelete = async () => {
  try {
    setDeleteLoading(true);

    await deleteDelivery(deleteItem._id);
    toast.success("Delivery deleted successfully.");

    closeDeleteModal();

    loadDeliveries();

  } catch (error) {
    console.error(error);
    toast.error(
  error.response?.data?.message ||
  "Something went wrong."
);
  } finally {
    setDeleteLoading(false);
  }
};
  // ===========================
  // Modal Functions
  // ===========================
  const openCreateModal = () => {
    setSelectedDelivery(null);
    setModalOpen(true);
  };

  const openEditModal = (delivery) => {
    setSelectedDelivery(delivery);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedDelivery) {
        await updateDelivery(selectedDelivery._id, formData);
        toast.success("Delivery updated successfully.");
      } else {
       await createDelivery(formData);

toast.success("Delivery created successfully.");
      }

      closeModal();

      loadDeliveries();

    } catch (error) {
      console.error(error);
    }
  };
  const openAssignModal = (delivery) => {
  setAssignDelivery(delivery);
  setAssignOpen(true);
};

const closeAssignModal = () => {
  setAssignDelivery(null);
  setAssignOpen(false);
};

const handleAssign = async (driverId) => {
  try {
    setAssignLoading(true);

    await assignDriver(assignDelivery._id, driverId);
    toast.success("Driver assigned successfully.");

    closeAssignModal();

    loadDeliveries();

  } catch (error) {
    console.error(error);
  } finally {
    setAssignLoading(false);
  }
};

  // ===========================
  // Effects
  // ===========================
  useEffect(() => {
    loadDeliveries();
  }, [search, status, priority, page]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  return (
    <DashboardLayout>

      <div className="deliveries-page">

        <DeliveryHeader
          stats={stats}
          onCreate={openCreateModal}
        />

        <DeliveryFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
        />

        {loading ? (
          <LoadingSkeleton />
        ) : deliveries.length === 0 ? (
          <EmptyState />
        ) : (
          <>
       <DeliveryTable
  deliveries={deliveries}
  refresh={loadDeliveries}
  onEdit={openEditModal}
  onView={openViewModal}
  onDelete={openDeleteModal}
  onAssign={openAssignModal}
/>
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </>
        )}

      </div>

      <DeliveryModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        delivery={selectedDelivery}
        drivers={drivers}
        vehicles={vehicles}
      />
      <ViewDeliveryModal
  isOpen={viewOpen}
  onClose={closeViewModal}
  delivery={viewDelivery}
/>
<DeleteModal
  isOpen={deleteOpen}
  onClose={closeDeleteModal}
  onDelete={handleDelete}
  loading={deleteLoading}
  delivery={deleteItem}
/>
<AssignDriverModal
  isOpen={assignOpen}
  onClose={closeAssignModal}
  onAssign={handleAssign}
  delivery={assignDelivery}
  drivers={drivers}
  loading={assignLoading}
/>

    </DashboardLayout>
  );
}

