import React from 'react';
import TableRow from './TableRow';

export default function TechSheetsTable({ techSheets, onDelete, onDuplicate }) {
  if (techSheets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No se encontraron fichas técnicas</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Referencia ID
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Cliente
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Producto
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Estado
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 text-center">
              Última Modificación
            </th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 text-right">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {techSheets.map((sheet) => (
            <TableRow
              key={sheet.id}
              sheet={sheet}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}