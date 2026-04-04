import { useState } from "react";

export default function ReordenModal({
  data,
  onClose,
  addPedido,
  refreshPedidos,
}) {
  if (!data) return null;

  const [fechaEntrega, setFechaEntrega] = useState("");

  const handleCrearPedido = async () => {
    try {
      const hoy = new Date().toISOString().split("T")[0];

      const nuevoPedido = {
        cliente_id: data.cliente_id,
        tipo_pedido: data.tipo_pedido,
        fecha_pedido: hoy,
        fecha_entrega: fechaEntrega,
        items: data.items,
      };

      await addPedido(nuevoPedido);

      refreshPedidos();

      onClose();
    } catch (error) {
      console.log("Error creando reorden:", error);
    }
  };

  const total = data.items.reduce(
    (acc, item) => acc + item.precio_unitario * item.cantidad,
    0,
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">
      <div className="bg-white w-[900px] rounded-xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Reordenar Pedido
            </h2>
            <p className="text-xs text-slate-500">
              Se generará un nuevo pedido con los mismos productos
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        {/* INFO CLIENTE */}
        <div className="px-6 py-4 bg-slate-50 border-b">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs">Cliente</p>
              <p className="font-medium">{data.nombre_cliente}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs">Empresa</p>
              <p className="font-medium">{data.empresa_cliente}</p>
            </div>

            <div>
              <p className="text-slate-500 text-xs">Tipo de Pedido</p>
              <span className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-600 font-semibold">
                {data.tipo_pedido}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-b">
          <label className="text-sm text-slate-600 block mb-1">
            Fecha de entrega
          </label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>

        {/* TABLA PRODUCTOS */}
        <div className="p-6 max-h-[350px] overflow-y-auto">
          <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
              <tr>
                <th className="px-3 py-2 text-left">Producto</th>
                <th className="px-3 py-2 text-center">Color</th>
                <th className="px-3 py-2 text-center">Talla</th>
                <th className="px-3 py-2 text-center">Peso</th>
                <th className="px-3 py-2 text-center">Cantidad</th>
                <th className="px-3 py-2 text-right">Precio</th>
                <th className="px-3 py-2 text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {data.items.map((item, index) => {
                const subtotal = item.precio_unitario * item.cantidad;

                return (
                  <tr
                    key={index}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-3 py-2 font-medium">{item.producto}</td>

                    <td className="px-3 py-2 text-center">{item.color}</td>

                    <td className="px-3 py-2 text-center">{item.talla}</td>

                    <td className="px-3 py-2 text-center">{item.peso}</td>

                    <td className="px-3 py-2 text-center font-medium">
                      {item.cantidad}
                    </td>

                    <td className="px-3 py-2 text-right">
                      ${item.precio_unitario}
                    </td>

                    <td className="px-3 py-2 text-right font-semibold">
                      ${subtotal}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-slate-50">
          <div className="text-sm">
            <span className="text-slate-500">Total estimado + IGV:</span>
            <span className="ml-2 font-bold text-lg text-slate-800">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 rounded-lg"
            >
              Cancelar
            </button>

            <button
              onClick={handleCrearPedido}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
              Crear Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
