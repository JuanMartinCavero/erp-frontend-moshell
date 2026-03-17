import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Login from "./features/Login/Login";
import DashboardPage from "./features/dashboard/DashboardPage";
import RolesPage from "./features/roles/RolesPage";
import UsersPage from "./features/users/Pages/UsersPage";

function App() {
  return (
    <Routes>
      {/* Login sin layout */}
      <Route path="/" element={<Login />} />

      {/* Rutas con Sidebar y Header */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/roles" element={<RolesPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
