import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

// ======================
// Public Pages
// ======================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ======================
// Admin Pages
// ======================
import Dashboard from "../pages/dashboard/Dashboard";
import Deliveries from "../pages/Deliveries/Deliveries";
import RoutesPage from "../pages/routes/Routes";
import Fleet from "../pages/fleet/Fleet";
import Drivers from "../pages/drivers/Drivers";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";

// ======================
// Driver Pages
// ======================
import DriverDashboard from "../driver/pages/Dashboard/DriverDashboard";
import DriverDeliveries from "../driver/pages/Deliveries/Deliveries";
import DeliveryDetails from "../driver/pages/DeliveryDetails/DeliveryDetails";
import Attendance from "../driver/pages/Attendance/Attendance";
import Earnings from "../driver/pages/Earnings/Earnings";
import Notifications from "../driver/pages/Notifications/Notifications";
import Profile from "../driver/pages/Profile/Profile";
import DriverSettings from "../driver/pages/Settings/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================
            PUBLIC ROUTES
        ======================= */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ======================
            ADMIN ROUTES
        ======================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deliveries"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Deliveries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/routes"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RoutesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fleet"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Fleet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/drivers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Drivers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ======================
            DRIVER ROUTES
        ======================= */}

        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/deliveries"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DriverDeliveries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/deliveries/:id"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <DeliveryDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver/attendance"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
  path="/driver/earnings"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <Earnings />
    </ProtectedRoute>
  }
/>
<Route
  path="/driver/notifications"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <Notifications />
    </ProtectedRoute>
  }
/>
<Route
  path="/driver/profile"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/driver/settings"
  element={
    <ProtectedRoute allowedRoles={["driver"]}>
      <DriverSettings />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}