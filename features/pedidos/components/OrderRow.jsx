import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import usePedidos from "../../../hooks/usePedidos";
import PagoModal from "./ModalPago";
import PedidoPDF from "../../../src/components/PDF/PedidoPDF";

export default function OrderRow({
  pedido,
  handleReorden,
  onSelectPedido,
  onViewPedido,
  onEditPedido,
}) {
  const [openPago, setOpenPago] = useState(false);
  const { fetchPedidoDetalle } = usePedidos();
  const [pedidoConDetalles, setPedidoConDetalles] = useState(null);
  const [cargandoPDF, setCargandoPDF] = useState(false);

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

  // Función para cargar detalles y generar PDF
  const handleGenerarPDF = async (e) => {
    e.stopPropagation();
    if (pedidoConDetalles) {
      // Si ya tenemos los detalles, forzar la descarga
      return;
    }
    setCargandoPDF(true);
    try {
      const pedidoCompleto = await fetchPedidoDetalle(pedido.id);
      setPedidoConDetalles(pedidoCompleto);
    } catch (error) {
      console.error("Error al obtener detalles:", error);
      alert("Error al cargar los detalles del pedido");
    } finally {
      setCargandoPDF(false);
    }
  };

  return (
    <tr
      onClick={() => onSelectPedido(pedido)}
      className="hover:bg-slate-50 transition-colors group cursor-pointer"
    >
      <td className="px-6 py-4 font-bold text-primary">
        {pedido.numero_pedido}
      </td>

      <td className="px-6 py-4">
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
      <td className="px-6 py-4">{pedido.fecha_entrega || "-"}</td>
      <td className="px-6 py-4 font-semibold">{totalFormateado}</td>

      <td className="px-6 py-4">
        <div>
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
        </div>
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenPago(true);
          }}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-2"
        >
          Actualizar pago
        </button> */}
        {pedido.estado_pago === "Canceló 50%" && (
          <div className="text-xs text-gray-500 mt-1">
            Pendiente: S/ {(pedido.total * 0.5).toFixed(2)}
          </div>
        )}
      </td>

      <td className="px-6 py-4">
        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase">
          {pedido.estado}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Botón Ver (Ojo) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewPedido && onViewPedido(pedido);
            }}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            title="Ver pedido"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>

          {/* Botón Editar (Lápiz) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditPedido && onEditPedido(pedido);
            }}
            className="text-green-600 hover:text-green-800 transition-colors"
            title="Editar pedido"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          {/* Botón Descargar PDF */}
          {pedidoConDetalles ? (
            <PDFDownloadLink
              document={<PedidoPDF pedido={pedidoConDetalles} />}
              fileName={`pedido-${pedido.numero_pedido}.pdf`}
            >
              {({ loading }) => (
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Descargar PDF"
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              )}
            </PDFDownloadLink>
          ) : (
            <button
              onClick={handleGenerarPDF}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Cargar detalles y descargar PDF"
              disabled={cargandoPDF}
            >
              {cargandoPDF ? (
                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
            </button>
          )}

          {/* Botón Reordenar */}
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
        </div>
      </td>

      <PagoModal
        isOpen={openPago}
        onClose={() => setOpenPago(false)}
        pedido={pedido}
      />
    </tr>
  );
}