import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Login from "./features/Login/Login";
import DashboardPage from "./features/dashboard/DashboardPage";
import RolesPage from "./features/roles/RolesPage";
import UsersPage from "./features/users/Pages/UsersPage";
import ClientsPage from "./features/clients/pages/ClientsPage";
import OrdersPage from "./features/pedidos/pages/OrderPage";
import { Inventory } from "./features/inventory/Inventory"; // ← Agrega esta importación
import  QualityControl  from "./features/quality/QualityControl";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login sin layout */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Rutas con Sidebar y Header */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/roles" element={<RolesPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/clients" element={<ClientsPage />} />
        <Route path="admin/orders" element={<OrdersPage />} />
        <Route path="/inventory" element={<Inventory />} /> {/* ← Agrega esta línea */}
        <Route path="/quality" element={<QualityControl />} />
      </Route>
    </Routes>
  );
}

export default App;
