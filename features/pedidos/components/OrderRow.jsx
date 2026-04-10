export default function OrderRow({ pedido, handleReorden, onSelectPedido }) {
  const iniciales = pedido.cliente?.nombre
    ?.split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  const moneda = pedido?.cliente?.moneda_preferida ?? "PEN";

  const localeMap = {
    PEN: "es-PE",
    USD: "en-US",
    EUR: "de-DE",
  };

  const totalFormateado = new Intl.NumberFormat(localeMap[moneda] || "es-PE", {
    style: "currency",
    currency: moneda,
  }).format(pedido.total);

  return (
    <tr
      onClick={() => onSelectPedido(pedido)}
      className="hover:bg-slate-50 transition-colors group"
    >
      <td className="px-6 py-4 font-bold text-primary">
        {pedido.numero_pedido}
      </td>

      <td>
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            pedido.tipo_pedido === "Muestra"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {pedido.tipo_pedido}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
            {iniciales}
          </div>

          <span className="font-medium">{pedido.cliente?.nombre}</span>
        </div>
      </td>

      <td className="px-6 py-4">{pedido.fecha_pedido}</td>

      <td className="px-6 py-4">{pedido.fecha_entrega}</td>

      <td className="px-6 py-4 font-semibold">{totalFormateado}</td>

      <td className="px-6 py-4">
        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase">
          {pedido.estado}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        {pedido.es_recurrente && (
          <button
            onClick={() => handleReorden(pedido)}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reordenar
          </button>
        )}
      </td>
    </tr>
  );
}
