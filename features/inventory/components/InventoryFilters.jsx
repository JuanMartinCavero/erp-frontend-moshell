import React from "react";
import { ChevronDown } from "lucide-react";

export function FiltersBar() {
  return (
    <div className="flex items-center justify-between mb-5">
   

      <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
        Limpiar filtros
      </button>
    </div>
  );
}