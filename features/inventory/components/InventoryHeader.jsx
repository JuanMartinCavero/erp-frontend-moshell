import React from "react";
import { Bell, Settings, Download, Calendar } from "lucide-react";

export function InventoryHeader({ onRegister }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Kardex de Inventario
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Monitoreo en tiempo real de entradas y salidas de textiles.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Últimos 30 días
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Exportar Data
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={onRegister}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
          >
            Registrar Material
          </button>
        </div>
      </div>
    </header>
  );
}
