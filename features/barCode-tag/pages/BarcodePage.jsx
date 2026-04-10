// MODIFICADO: Con estado para historial de escaneos
import React, { useState } from 'react';
import BarcodeGenerate from '../components/BarcodeGenerate';
import BarcodeScan from '../components/BarcodeScan';
import BarcodeTable from '../components/BarcodeTable';

export default function BarcodePage() {
  // AGREGADO: Estado para historial de escaneos
  const [scanHistory, setScanHistory] = useState([]);

  // AGREGADO: Función cuando se escanea un material exitosamente
  const handleScanSuccess = (material, codigoEscaneado) => {
    const newScan = {
      id: material.id,
      codigo: material.codigo,
      calidad: material.calidad,
      color: material.color,
      tipo: material.tipo,
      ubicacion: material.inventario?.ubicacion || 'No asignada',
      stock: material.inventario?.stock_actual || 0,
      unidad: material.unidad,
      fechaEscaneo: new Date().toLocaleTimeString()
    };
    
    // Agregar al inicio del historial (los más recientes primero)
    setScanHistory(prev => [newScan, ...prev].slice(0, 10));
  };

  // AGREGADO: Función cuando hay error de escaneo
  const handleScanError = (error) => {
    console.warn('Error en escaneo:', error);
  };

  // AGREGADO: Ver detalle del material
  const handleViewMaterial = (material) => {
    console.log('Ver material:', material);
    // Aquí puedes abrir un modal con los detalles
    alert(`Material: ${material.calidad}\nCódigo: ${material.codigo}\nStock: ${material.stock} ${material.unidad}\nUbicación: ${material.ubicacion}`);
  };

  return (
    <div className="p-8 space-y-8 w-full">
      <div>
        <h2 className="text-xl font-bold">
          Gestión de Etiquetas y Escaneo de Materiales
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <BarcodeGenerate />
        {/* AGREGADO: Pasar callbacks al escáner */}
        <BarcodeScan 
          onScanSuccess={handleScanSuccess}
          onScanError={handleScanError}
        />
      </div>

      {/* AGREGADO: Pasar historial a la tabla */}
      <BarcodeTable 
        scanHistory={scanHistory}
        onViewMaterial={handleViewMaterial}
      />
    </div>
  );
}
