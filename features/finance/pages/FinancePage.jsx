import HeaderFinance from "../components/HeaderFinance";
import MetricCard from "../../finance/components/MetricCard";
import FinanceTable from "../../finance/components/FinanceTable";
import CollectionsStatus from "../../finance/components/CollectionsStatus";
import FinanceTableProviders from "../components/FinanceTableProviders";

import { useFinance } from "../../../hooks/useFinance";

export default function FinancePage() {
  const {
    dashboard,
    loading,
    hookRegistrarPagoPedido,
    hookRegistrarPagoOrden,
  } = useFinance();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-slate-500 dark:text-slate-400">
          Cargando finanzas...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <HeaderFinance />

        <div className="p-8 space-y-8">
          {/* Métricas financieras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Flujo de Caja"
              value={`S/ ${dashboard.flujoCaja}`}
            />

            <MetricCard
              title="Cuentas por Cobrar"
              value={`S/ ${dashboard.cuentasPorCobrar}`}
            />

            <MetricCard
              title="Cuentas por Pagar"
              value={`S/ ${dashboard.cuentasPorPagar}`}
            />

            <MetricCard
              title="Posición Financiera"
              value={`S/ ${dashboard.saldoTotal}`}
            />
          </div>

          {/* Información financiera */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <FinanceTable
                transactions={dashboard.facturas}
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
                facturas={dashboard.facturas}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
