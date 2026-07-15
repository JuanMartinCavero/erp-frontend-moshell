// src/features/inventory/components/InventoryPagination.jsx
import React from "react";

export function Pagination({ currentPage, lastPage, onPageChange }) {
  // Si no hay páginas o solo hay 1, no mostrar nada
  if (!currentPage || !lastPage || lastPage <= 1) return null;

  // Calcular qué números de página mostrar
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
      >
        Anterior
      </button>
      
      {/* Números de página */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage 
              ? 'bg-purple-600 text-white' 
              : 'hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
      >
        Siguiente
      </button>
    </div>
  );
}