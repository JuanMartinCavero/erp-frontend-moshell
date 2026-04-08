import React from "react";
import { ChevronDown } from "lucide-react";

export function FiltersBar() {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex gap-3">
        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm">
            <option>Tipo de Material</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        <div className="relative">
          <select className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm">
            <option>Atención</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
        Limpiar filtros
      </button>
    </div>
  );
}