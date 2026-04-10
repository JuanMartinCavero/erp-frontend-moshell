// MODIFICADO: Escáner real con html5-qrcode
import React, { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { buscarMaterialPorCodigo } from "../../../services/materialApi";

export default function BarcodeScan({
  onScanSuccess,
  onScanError: onScanErrorProp,
}) {
  const [scannedMaterial, setScannedMaterial] = useState(null);
  const [scanning, setScanning] = useState(true);
  const scannerRef = useRef(null);
  const scannerContainerRef = useRef(null);

  // AGREGADO: Función al escanear código
  const handleScanCode = async (decodedText) => {
    console.log("Código escaneado:", decodedText);
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
    if (!error.includes("NotFoundException")) {
      console.warn("Error real:", error);
    }
  };
  useEffect(() => {
    let html5QrCode;

    const startScanner = async () => {
      html5QrCode = new Html5Qrcode("scanner-container");

      try {
        const devices = await Html5Qrcode.getCameras();

        if (devices && devices.length) {
          const cameraId = devices[0].id;

          await html5QrCode.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 320, height: 120 },
            },
            handleScanCode,
            handleScanError,
          );
        }
      } catch (err) {
        console.error("Error iniciando cámara:", err);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <section className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <span className="material-symbols-outlined text-primary">
            qr_code_scanner
          </span>
          Escáner de Código
        </h3>

        <div className="flex items-center gap-2 text-xs">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              scanning ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
          <span className="text-slate-500 dark:text-slate-400">
            {scanning ? "Listo" : "Procesando"}
          </span>
        </div>
      </div>

      {/* SCANNER BOX */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black h-[170px] shadow-inner">
        {/* cámara */}
        <div id="scanner-container" className="w-full h-full" />

        {/* overlay oscuro superior */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

        {/* línea de escaneo */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 animate-pulse opacity-80" />

        {/* esquinas estilo scanner */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-green-400" />
        <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-green-400" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-green-400" />
        <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-green-400" />
      </div>

      {/* RESULTADO */}
      {scannedMaterial && (
        <div className="mt-4 p-3 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-sm">
              check_circle
            </span>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-slate-900 text-sm">
              {scannedMaterial.codigo}
            </p>

            <p className="text-xs text-slate-600">
              {scannedMaterial.calidad} • {scannedMaterial.color}
            </p>

            <p className="text-[11px] text-slate-500 mt-1">
              📍 {scannedMaterial.inventario?.ubicacion || "No asignada"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
