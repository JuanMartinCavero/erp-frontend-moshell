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
import { Compras } from "./features/purchasing/Compras";//compras de insumos o materiasles
import  QualityControl  from "./features/quality/QualityControl";
import Pipeline from "./features/production/production";
import FichaTecnicaDashboard from './features/FichaTecnicaDashboard/FichaTecnicaDashboard'; //ficha tecnica tablero general de fichas tecnicas
import FichaTecnica from "./features/FichaTecnica/FichaTecnica"; //Ficha Tecnica de cada producto
import ProviderPage from "./features/providers/pages/ProviderPage"; // Proveedores
import MachineProductPage from "./features/machines/pages/MachineProductPage"; // Página de Producción y Maquinas
import FinancePage from "./features/finance/pages/FinancePage"; // Página de Finanzas y Pagos

import ProtectedRoute from "./components/ProtectedRoute";
import NuevaFichaTecnica from './features/FichaTecnicaDashboard/components/NuevaFichaTecnica';
import BarcodePage from "./features/barCode-tag/pages/BarCodePage";
import EditarFichaTecnica from './features/FichaTecnicaDashboard/EditarFichaTecnica'; //editar ficha tecnica resumen de cada muestra

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
        <Route path="/production" element={<Pipeline />} />
        <Route path="/FichaTecnica" element={<FichaTecnicaDashboard />} />
        <Route path="/FichaTecnica/nueva" element={<NuevaFichaTecnica />} /> {/* ← crear nueva ficha tecnica resumen solamente */}
        <Route path="/FichaTecnica/editar/:id" element={<EditarFichaTecnica />} /> {/* ← editar ficha tecnica resumen de cada muestra */}
      / <Route path="/FichaTecnica/:id" element={<FichaTecnica />} />
        <Route path="/barcodes" element={<BarcodePage />} />
        <Route path="/compras" element={<Compras />} /> {/* ← Agrega esta línea */}
        <Route path="/admin/providers" element={<ProviderPage />} /> {/* Proveedores */}
        <Route path="/machines" element={<MachineProductPage />} /> {/* Página de Producción y Maquinas */}
        <Route path="/finance" element={<FinancePage />} /> {/* Página de Finanzas y Pagos */}
      </Route>
    </Routes>
  );
}

export default App;
