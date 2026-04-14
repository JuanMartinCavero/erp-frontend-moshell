import React, { useState } from "react";
import usePedidos from "../../../hooks/usePedidos";
import PagoModal from "./ModalPago";

export default function OrderRow({
  pedido,
  handleReorden,
  onSelectPedido,
}) {
  const [openPago, setOpenPago] = useState(false);

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

  const totalFormateado = new Intl.NumberFormat(
    localeMap[moneda] || "es-PE",
    {
      style: "currency",
      currency: moneda,
    }
  ).format(pedido.total);

  return (
    <tr
      onClick={() => onSelectPedido(pedido)}
      className="hover:bg-slate-50 transition-colors group"
    >
      {/* NUMERO PEDIDO */}
      <td className="px-6 py-4 font-bold text-primary">
        {pedido.numero_pedido}
      </td>

      {/* TIPO */}
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

      {/* CLIENTE */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
            {iniciales}
          </div>
          <span className="font-medium">{pedido.cliente?.nombre}</span>
        </div>
      </td>

      {/* FECHAS */}
      <td className="px-6 py-4">{pedido.fecha_pedido}</td>
      <td className="px-6 py-4">{pedido.fecha_entrega}</td>

      {/* TOTAL */}
      <td className="px-6 py-4 font-semibold">{totalFormateado}</td>

      {/* PAGO */}
      <td className="px-6 py-4">
        <span>
          {pedido.estado_pago === "Falta cancelar" && (
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase">
              Falta cancelar
            </span>
          )}

          {pedido.estado_pago === "Canceló 50%" && (
            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 text-[10px] font-bold uppercase">
              Canceló 50%
            </span>
          )}

          {pedido.estado_pago === "Cancelado" && (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase">
              Cancelado
            </span>
          )}
        </span>

        {/* BOTÓN MODAL */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenPago(true);
          }}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-2"
        >
          Actualizar pago
        </button>

        {pedido.estado_pago === "Canceló 50%" && (
          <div className="text-xs text-gray-500 mt-1">
            Pendiente: S/ {(pedido.total * 0.5).toFixed(2)}
          </div>
        )}
      </td>

      {/* ESTADO */}
      <td className="px-6 py-4">
        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase">
          {pedido.estado}
        </span>
      </td>

      {/* REORDEN */}
      <td className="px-6 py-4 text-right">
        {pedido.es_recurrente && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReorden(pedido);
            }}
            className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reordenar
          </button>
        )}
      </td>

      {/* MODAL */}
      <PagoModal
        isOpen={openPago}
        onClose={() => setOpenPago(false)}
        pedido={pedido}
        
      />
    </tr>
  );
}