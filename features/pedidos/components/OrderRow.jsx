export default function OrderRow({ pedido }) {

  const iniciales = pedido.cliente?.nombre
    ?.split(" ")
    .map(p => p[0])
    .join("")
    .slice(0,2);

  return (
    <tr className="hover:bg-slate-50 transition-colors group">

      <td className="px-6 py-4 font-bold text-primary">
        {pedido.numero_pedido}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
            {iniciales}
          </div>

          <span className="font-medium">
            {pedido.cliente?.nombre}
          </span>

        </div>
      </td>

      <td className="px-6 py-4">
        {pedido.fecha_pedido}
      </td>

      <td className="px-6 py-4">
        {pedido.fecha_entrega}
      </td>

      <td className="px-6 py-4 font-semibold">
        ${pedido.total}
      </td>

      <td className="px-6 py-4">

        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase">
          {pedido.estado}
        </span>

      </td>

      <td className="px-6 py-4 text-right">

        <button className="p-2 hover:bg-slate-200 rounded-lg">
          <span className="material-symbols-outlined text-lg">
            more_vert
          </span>
        </button>

      </td>

    </tr>
  );
}