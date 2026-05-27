import React, { useState, useEffect } from "react";
import usePedidos from "../../../hooks/usePedidos";

export default function SamplePage() {
  const [search, setSearch] = useState("");

  const { pedidos, fetchPedidos, loading } = usePedidos();

  useEffect(() => {
    fetchPedidos({
      tipo_pedido: "Muestra",
      search: search,
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestión de Muestras
          </h1>
          <p className="text-gray-500">
            Administra todos los pedidos tipo muestra
          </p>
        </div>

        <div className="flex gap-2">
          <button className="bg-black text-white px-4 py-2 rounded-xl hover:scale-[1.02] transition">
            + Nueva Muestra
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center gap-3">
        <input
          className="w-full outline-none"
          placeholder="Buscar por pedido o cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-500">
          Cargando muestras...
        </div>
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="text-left p-4">Pedido</th>
                <th className="text-left p-4">Cliente</th>
                <th className="text-left p-4">Fechas</th>
                <th className="text-left p-4">Total</th>
                <th className="text-center p-4">Estado</th>
              </tr>
            </thead>

            <tbody>
              {pedidos?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* PEDIDO */}
                  <td className="p-4">
                    <p className="font-semibold text-gray-800">
                      {item.numero_pedido}
                    </p>
                    <p className="text-xs text-gray-400">Pedido de muestra</p>
                  </td>

                  {/* CLIENTE */}
                  <td className="p-4">
                    <p className="font-medium text-gray-800">
                      {item.cliente?.nombre}
                    </p>
                  </td>

                  {/* FECHAS */}
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex flex-col">
                      <span>Pedido: {item.fecha_pedido}</span>
                      <span>Entrega: {item.fecha_entrega}</span>
                    </div>
                  </td>

                  {/* TOTAL */}
                  <td className="p-4 font-semibold text-gray-800">
                    S/ {item.total}
                  </td>

                  {/* BADGE ESTADO */}
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && pedidos?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400">
                    No hay muestras registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
