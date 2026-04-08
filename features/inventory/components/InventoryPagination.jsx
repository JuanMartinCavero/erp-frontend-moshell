import React from "react";

export function Pagination() {
  return (
    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Mostrando 1 de 24 registros
      </div>

      <div className="flex gap-1">
        <button className="px-3 py-1.5 bg-purple-600 text-white rounded text-sm">
          1
        </button>
        <button className="px-3 py-1.5 bg-gray-100 rounded text-sm">
          2
        </button>
        <button className="px-3 py-1.5 bg-gray-100 rounded text-sm">
          3
        </button>
      </div>
    </div>
  );
}