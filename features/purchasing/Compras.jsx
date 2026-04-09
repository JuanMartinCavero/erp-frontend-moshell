import { Plus } from "lucide-react"
import { ComprasKpiCards } from "../../features/pedidos/components/Compraskpicards"
import { OrdenesTable } from "../../features/pedidos/components/ComprasOrdenestable"
import { InsumosCriticos } from "../../features/pedidos/components/ComprasInsumoscriticos"

export function Compras() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="px-8 py-8">

        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Compras de Insumos</h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            Nueva Orden de Compra
          </button>
        </div>

        {/* KPIs */}
        <ComprasKpiCards />

        {/* Tabla + Panel lateral */}
        <div className="flex gap-6">
          <OrdenesTable />
          <InsumosCriticos />
        </div>

      </main>
    </div>
  )
}