import React from 'react';
import { Download, Edit3, ChevronRight } from 'lucide-react';

export default function FichaHeader({ techSheet, cliente, isEditing, setIsEditing, onExportPDF }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Product Dev</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Tech Sheets</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{techSheet.name || "Sin nombre"}</h1>
        <p className="text-sm text-gray-500 font-medium">
          Ref: {techSheet.reference} <span className="mx-2">•</span> 
          Season: {techSheet.season || "N/A"} <span className="mx-2">•</span> 
          Client: {cliente?.empresa || cliente?.nombre || "N/A"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onExportPDF} className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 bg-[#42526E] hover:bg-[#344563] text-white rounded-lg text-sm font-semibold flex items-center gap-2">
          <Edit3 className="w-4 h-4" /> {isEditing ? "Cancel Edit" : "Edit Sheet"}
        </button>
      </div>
    </div>
  );
}