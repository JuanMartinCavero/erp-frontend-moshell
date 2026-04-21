import HeaderFinance from "../components/HeaderFinance";
import MetricCard from "../../finance/components/MetricCard";
import TransactionsTable from "../../finance/components/FinanceTable";
import CollectionsStatus from "../../finance/components/CollectionsStatus";
import FinanceTip from "../../finance/components/FinanceTip";


export default function FinancePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col overflow-y-auto">
        <HeaderFinance />

        <div className="p-8 space-y-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Flujo de Caja Mensual"
              value="€45.200"
              trend="up"
              percent="12.5%"
              progress={75}
            />

            <MetricCard
              title="Cuentas por Cobrar"
              value="€12.450"
              trend="down"
              percent="3.2%"
              progress={40}
            />

            <MetricCard
              title="Cuentas por Pagar"
              value="€8.900"
              trend="up"
              percent="5%"
              progress={60}
            />

            <MetricCard
              title="Saldo Total"
              value="€156.780"
              trend="up"
              percent="8.4%"
              progress={85}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TransactionsTable />
            </div>

            <div className="space-y-6">
              <CollectionsStatus />
              <FinanceTip />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
