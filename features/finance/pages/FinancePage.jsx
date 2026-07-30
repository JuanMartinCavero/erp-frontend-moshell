import React, { useState } from "react";

import HeaderFinance from "../components/HeaderFinance";
import MetricCard from "../../finance/components/MetricCard";
import FinanceTable from "../../finance/components/FinanceTable";
import CollectionsStatus from "../../finance/components/CollectionsStatus";
import FinanceTip from "../../finance/components/FinanceTip";
import FinanceTableProviders from "../components/FinanceTableProviders";

import { useFinance } from "../../../hooks/useFinance";

export default function FinancePage() {
  const {
    dashboard,
    loading,
    hookRegistrarPagoPedido,
    hookRegistrarPagoOrden,
  } = useFinance();

  const abrirModalPago = (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalPago(true);
  };

  if (loading) {
    return <div className="p-10">Cargando finanzas...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <HeaderFinance />

        <div className="p-8 space-y-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Flujo de Caja Mensual"
              value={dashboard.flujoCaja}
              trend="up"
              percent="12.5%"
              progress={75}
            />

            <MetricCard
              title="Cuentas por Cobrar"
              value={dashboard.cuentasPorCobrar}
              trend="down"
              percent="3.2%"
              progress={40}
            />

            <MetricCard
              title="Cuentas por Pagar"
              value={dashboard.cuentasPorPagar}
              trend="up"
              percent="5%"
              progress={60}
            />

            <MetricCard
              title="Saldo Total"
              value={dashboard.saldoTotal}
              trend="up"
              percent="8.4%"
              progress={85}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <FinanceTable
                transactions={dashboard.facturas}
                abrirModalPago={abrirModalPago}
                registrarPago={hookRegistrarPagoPedido}
              />
              <FinanceTableProviders
                orders={dashboard.ordenes}
                registrarPagoProveedor={hookRegistrarPagoOrden}
              />
            </div>

            <div className="space-y-6">
              <CollectionsStatus
                monto={dashboard.cuentasPorCobrar}
                pedidos={dashboard.facturas}
              />
              <FinanceTip />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
