// src/features/dashboard/DashboardPage.jsx
import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import KpiCards from '../../components/dashboard/KpiCards'; // StatsGrid → KpiCards
import ProductionChart from '../../components/dashboard/ProductionChart'; // ProductionStatus → ProductionChart
import MachineWorkload from '../../components/dashboard/MachineWorkload';
import OrdersTable from '../../components/dashboard/OrdersTable'; // RecentOrders → OrdersTable

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
          <KpiCards />
          <div className="flex flex-col lg:flex-row gap-8">
            <ProductionChart />
            <MachineWorkload />
          </div>
          <OrdersTable />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;