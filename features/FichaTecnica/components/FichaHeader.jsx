import React from 'react';
import { Download, Edit3, ChevronRight } from 'lucide-react';
import { pdf } from '@react-pdf/renderer'; // ✅ CORRECTO
import { FichaTecnicaPDF } from './FichaTecnicaPDF';

export default function FichaHeader({ techSheet, cliente, isEditing, setIsEditing, onExportPDF,pedido,  materiales,muestras }) {
 // ✅ Nueva función para exportar PDF con react-pdf
  const handleExportPDF = async () => {
    try {
      if (!techSheet) {
        alert('No hay datos para exportar');
        return;
      }

      // Generar el PDF con react-pdf
      const blob = await pdf(
        <FichaTecnicaPDF 
          techSheet={techSheet}
          cliente={cliente}
          pedido={pedido}
          materiales={materiales || []}
          muestras={muestras || []}
        />
      ).toBlob();

      // Crear URL de descarga
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `ficha_tecnica_${techSheet?.reference || techSheet?.id || 'export'}.pdf`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error al exportar PDF:', error);
      alert('Error al generar el PDF: ' + error.message);
    }
  };

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
        {/* ✅ Botón usa handleExportPDF en lugar de onExportPDF */}
        <button 
          onClick={handleExportPDF} 
          className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="px-4 py-2 bg-[#42526E] hover:bg-[#344563] text-white rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4" /> {isEditing ? "Cancel Edit" : "Edit Sheet"}
        </button>
      </div>
    </div>
  );
}
