const ESTADO_STYLES = {
  Pendiente:        "bg-amber-100 text-amber-700",
  "Recibido parcial":"bg-blue-100 text-blue-700",
  Completado:       "bg-green-100 text-green-700",
  Cancelado:        "bg-gray-100 text-gray-500",
}

const ordenes = [
  { id: "OC-2024-001", proveedor: "Textiles del Sur",  insumos: "Hilo Algodón, Poliéster", monto: "€1,250.00", estado: "Pendiente",         entrega: "15/10/2023" },
  { id: "OC-2024-002", proveedor: "Fibras Globales",   insumos: "Elastano, Lycra",          monto: "€3,400.00", estado: "Recibido parcial",  entrega: "12/10/2023" },
  { id: "OC-2024-003", proveedor: "Telas & Avíos",     insumos: "Botones, Cremalleras",     monto: "€850.00",   estado: "Completado",        entrega: "10/10/2023" },
  { id: "OC-2024-004", proveedor: "Hilos Premium",     insumos: "Hilo 30/1 Ne",             monto: "€2,100.00", estado: "Cancelado",         entrega: "08/10/2023" },
]

export function OrdenesTable() {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">Órdenes de Compra Recientes</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Ver todas</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3">ID Orden</th>
              <th className="px-6 py-3">Proveedor</th>
              <th className="px-6 py-3">Insumos</th>
              <th className="px-6 py-3">Monto Total</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Entrega Est.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {ordenes.map((orden) => (
              <tr key={orden.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-blue-600 font-medium text-xs">{orden.id}</td>
                <td className="px-6 py-4 text-gray-800 font-medium">{orden.proveedor}</td>
                <td className="px-6 py-4 text-gray-500">{orden.insumos}</td>
                <td className="px-6 py-4 font-semibold text-gray-900">{orden.monto}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ESTADO_STYLES[orden.estado]}`}>
                    {orden.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{orden.entrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}