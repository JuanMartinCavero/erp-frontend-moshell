import { useEffect } from "react";

import OrderHeader from "../../pedidos/components/OrderHeader";
import OrderStats from "../../pedidos/components/OrderStats";
import OrderFilters from "../../pedidos/components/OrderFilters";
import OrderTable from "../../pedidos/components/OrderTable";
import OrderPagination from "../../pedidos/components/OrderPagination";
import OrderActivity from "../../pedidos/components/OrderActivity";
import OrderQuickView from "../../pedidos/components/OrderQuickView";

import usePedidos from "../../../hooks/usePedidos";

export default function OrderPage() {
  const { pedidos, fetchPedidos, loading, pagination } = usePedidos();

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <OrderHeader />

      <OrderStats />

      <div className="bg-white dark:bg-primary/5 rounded-2xl border border-slate-200 dark:border-primary/20 overflow-hidden">
        <OrderFilters />

        <OrderTable pedidos={pedidos} loading={loading} />

        <OrderPagination pagination={pagination} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <OrderActivity />
        
        <OrderQuickView />
      </div>
    </div>
  );
}
