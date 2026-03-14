import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Login from "./pages/Login";
import DashboardPage from "./features/dashboard/DashboardPage";
import RolesPage from "./features/roles/RolesPage";

function App() {
  return (
      <Routes>

        {/* Login sin layout */}
        <Route path="/" element={<Login />} />

        {/* Rutas con Sidebar y Header */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/roles" element={<RolesPage />} />
        </Route>

      </Routes>
  );
}

export default App;