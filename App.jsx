import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import DashboardPage from "./features/dashboard/DashboardPage";
import RolesPage from "./features/roles/RolesPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/roles" element={<RolesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
