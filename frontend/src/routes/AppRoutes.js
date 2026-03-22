import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

            <Route
        path="/dashboard"
        element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
        }
        />

    </Routes>
  );
}