import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import OAuthSuccess from "../pages/OAuthSuccess";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  );
}
