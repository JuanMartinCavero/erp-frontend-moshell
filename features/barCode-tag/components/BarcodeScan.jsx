// MODIFICADO: Escáner real con html5-qrcode
import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { buscarMaterialPorCodigo } from '../../../services/materialApi';

export default function BarcodeScan({ onScanSuccess, onScanError: onScanErrorProp }) {
  const [scannedMaterial, setScannedMaterial] = useState(null);
  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef(null);
  const scannerContainerRef = useRef(null);

  // AGREGADO: Función al escanear código
  const handleScanCode = async (decodedText) => {
    if (!scanning) return;
    
    setScanning(false);
    
    try {
      // Buscar material por código escaneado
      const material = await buscarMaterialPorCodigo(decodedText);
      setScannedMaterial(material);
      
      // Notificar al padre que se escaneó un material
      if (onScanSuccess) {
        onScanSuccess(material, decodedText);
      }
      
      // Reactivar escáner después de 3 segundos
      setTimeout(() => {
        setScanning(true);
      }, 3000);
      
    } catch (error) {
      console.error("Material no encontrado:", error);
      if (onScanErrorProp) {
        onScanErrorProp("Material no encontrado: " + decodedText);
      }
      setScanning(true);
    }
  };

  const handleScanError = (error) => {
    console.warn("Error de escaneo:", error);
    if (onScanErrorProp) {
      onScanErrorProp(error);
    }
  };

  useEffect(() => {
    // AGREGADO: Inicializar escáner al montar componente
    if (scannerContainerRef.current && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "scanner-container",
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current.render(handleScanCode, handleScanError);
    }

    return () => {
      // AGREGADO: Limpiar escáner al desmontar
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            qr_code_scanner
          </span>
          Escaneo en Tiempo Real
        </h3>
        <div className="flex items-center gap-1">
          <span className={`size-2 rounded-full animate-pulse ${scanning ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className="text-xs font-medium text-slate-500">
            {scanning ? 'Escaneando...' : 'Procesando...'}
          </span>
        </div>
      </div>
      
      {/* AGREGADO: Contenedor del escáner */}
      <div 
        id="scanner-container" 
        ref={scannerContainerRef}
        className="relative bg-slate-900 rounded-lg overflow-hidden min-h-[250px]"
      ></div>
      
      {/* AGREGADO: Mostrar resultado del escaneo */}
      {scannedMaterial && (
        <div className="mt-3 p-2.5 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
          <div className="size-7 bg-green-500 rounded flex items-center justify-center text-white text-sm">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div className="text-xs flex-1">
            <p className="font-bold text-slate-900 dark:text-slate-100">
              {scannedMaterial.codigo}
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              {scannedMaterial.calidad} - {scannedMaterial.color}
            </p>
            <p className="text-slate-500 text-[10px]">
              Ubicación: {scannedMaterial.inventario?.ubicacion || 'No asignada'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}