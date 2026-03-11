import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import KpiCards from '../../components/dashboard/KpiCards';
import ProductionChart from '../../components/dashboard/ProductionChart';
import MachineWorkload from '../../components/dashboard/MachineWorkload';
import OrdersTable from '../../components/dashboard/OrdersTable';

const DashboardPage = () => {
  return (
    <div style={{width: 1280, background: '#F7F7F7', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div style={{alignSelf: 'stretch', height: 1024, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
        <Sidebar />
        <div style={{flex: '1 1 0', height: 1040, background: 'white', outline: '1px black solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
          <Header />
          
          {/* Dashboard Content */}
          <div style={{alignSelf: 'stretch', padding: 32, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'flex'}}>
            <KpiCards />
            
            <div style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
              <ProductionChart />
              <MachineWorkload />
            </div>
            
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;