import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Login from "./features/Login/Login";
import ProfilePage from "./components/ProfilePage";
import DashboardPage from "./components/dashboard/pages/DashboardPage";
import RolesPage from "./features/roles/RolesPage";
import UsersPage from "./features/users/Pages/UsersPage";
import ClientsPage from "./features/clients/pages/ClientsPage";
import OrdersPage from "./features/pedidos/pages/OrderPage";
import OrderDetailPage from "./features/pedidos/pages/OrderDetailPage";
import { Inventory } from "./features/inventory/Inventory";
import { Compras } from "./features/purchasing/Compras";
import QualityControl from "./features/quality/QualityControl";
import { ProductionPipelinePage } from "./features/production";
import ProductionOrderDetail from "./features/production/pages/ProductionOrderDetail";
import FichaTecnicaDashboard from "./features/FichaTecnicaDashboard/FichaTecnicaDashboard";
import FichaTecnica from "./features/FichaTecnica/FichaTecnica";
import ProviderPage from "./features/providers/pages/ProviderPage";
import MachineProductPage from "./features/machines/pages/MachineProductPage";
import FinancePage from "./features/finance/pages/FinancePage";

import ProtectedRoute from "./components/ProtectedRoute";
import NuevaFichaTecnica from "./features/FichaTecnicaDashboard/components/NuevaFichaTecnica";
import BarcodePage from "./features/barCode-tag/pages/BarcodePage";
import EditarFichaTecnica from "./features/FichaTecnicaDashboard/EditarFichaTecnica";
import QualityDashboard from "./features/quality/QualityDashboard";

import SamplePage from "./features/samples/pages/SamplePage";
import AlertsPage from "./src/pages/AlertsPage"; // ← Importa la página de alertas

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
        <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/quality" element={<QualityDashboard />} />
        <Route path="/quality/:orderId" element={<QualityControl />} />
        <Route path="/production" element={<ProductionPipelinePage />} />
        <Route
          path="/production/orders/:id"
          element={<ProductionOrderDetail />}
        />
        <Route path="/FichaTecnica" element={<FichaTecnicaDashboard />} />
        <Route path="/FichaTecnica/nueva" element={<NuevaFichaTecnica />} />
        <Route
          path="/FichaTecnica/editar/:id"
          element={<EditarFichaTecnica />}
        />
        <Route path="/FichaTecnica/:id" element={<FichaTecnica />} />
        <Route path="/barcodes" element={<BarcodePage />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/admin/providers" element={<ProviderPage />} />
        <Route path="/machines" element={<MachineProductPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/samples" element={<SamplePage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* ✅ NUEVA RUTA PARA ALERTAS */}
        <Route path="/alerts" element={<AlertsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
