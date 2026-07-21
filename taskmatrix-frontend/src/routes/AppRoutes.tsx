import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES */}

      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Route>

      {/* PROTECTED APP ROUTES */}

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
      </Route>

      {/* FALLBACK */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;