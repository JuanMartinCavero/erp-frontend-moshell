import OrderRow from "./OrderRow";

export default function OrderTable({ pedidos, loading , handleReorden, onSelectPedido}) {
  if (loading) {
    return <p className="p-6">Cargando pedidos...</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-primary/5 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
            <th className="px-6 py-4">N° Pedido</th>
            <th className="px-6 py-4">Tipo Pedido</th>
            <th className="px-6 py-4">Cliente</th>
            <th className="px-6 py-4">Fecha Solicitud</th>
            <th className="px-6 py-4">Fecha Comprometida</th>
            <th className="px-6 py-4">Monto Total</th>
            <th className="px-6 py-4">Estado de Pago</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-primary/10 text-sm">
          {pedidos.map((pedido, i) => (
            <OrderRow key={i} pedido={pedido} handleReorden={handleReorden} onSelectPedido={onSelectPedido}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
