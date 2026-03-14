
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';              // ← Cambiado: desde pages/Login.jsx
import Dashboard from './features/dashboard/DashboardPage';      // ← Cambiado: desde pages/Dashboard.jsx

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;