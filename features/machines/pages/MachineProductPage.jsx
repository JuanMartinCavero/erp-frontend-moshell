import HeaderMachine from "../components/HeaderMachine";
import StatsCards from "../components/StatsCards";
import TableMachineProduct from "../components/TableMachineProduct";
import ActivityPanel from "../components/ActivityPanel";
import ResumenCarga from "../components/ResumenCarga";
import TableMachine from "../components/TableMachine";

export default function MachineProductPage() {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <HeaderMachine />

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <StatsCards />

        <TableMachineProduct />
        <TableMachine />

        <div className="flex flex-col md:flex-row gap-6">
          <ActivityPanel />
          <ResumenCarga />
        </div>
      </div>
    </main>
  );
}
