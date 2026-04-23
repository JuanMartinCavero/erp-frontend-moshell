import React, { useState, useEffect, useRef } from "react";
import { useMaterial } from "../../../hooks/useMaterial";

export default function BarcodeGenerate() {
  const { obtenerMateriales, obtenerCodigoDeBarras } = useMaterial();
  const [materiales, setMateriales] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [barcode, setBarcode] = useState(null);
  const printRef = useRef();

  // Traemos los materiales al montar el componente
  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const data = await obtenerMateriales();
        setMateriales(data || []);
        if (data && data.length > 0) setSelectedMaterial(data[0]);
      } catch (error) {
        console.error("Error obteniendo materiales:", error);
      }
    };
    fetchMateriales();
  }, []);

  // Cambiar material seleccionado
  const handleSelectMaterial = (e) => {
    const material = materiales.find((m) => m.id === parseInt(e.target.value));
    setSelectedMaterial(material);
    setCantidad(1);
    setBarcode(null); // reset barcode
  };

  // Generar código de barras desde backend
  const handleGenerarBarcode = async () => {
    if (!selectedMaterial) return;
    try {
      const data = await obtenerCodigoDeBarras(selectedMaterial.id);
      setBarcode(data.barcode); // aquí sí existe setBarcode
    } catch (error) {
      console.error("Error generando código de barras:", error);
    }
  };

  // Imprimir el bloque de código de barras
  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // recargar para restaurar React
  };

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full w-full">
      <div className="flex flex-col items-start justify-between h-full">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">label</span>
          Generar Código de Barras
        </h3>

        {/* Selección de material y cantidad */}
        <div className="w-full grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Seleccionar Material
            </label>
            <select
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded text-xs py-1 px-2"
              value={selectedMaterial?.id || ""}
              onChange={handleSelectMaterial}
            >
              {materiales.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.calidad}{m.tipo} ({m.color})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Cantidad (Stock actual:{" "}
              {selectedMaterial?.inventario?.stock_actual || 0})
            </label>
            <input
              type="number"
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded text-xs py-1 px-2"
              value={cantidad}
              min={1}
              max={selectedMaterial?.inventario?.stock_actual || 1}
              onChange={(e) => setCantidad(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Botón Generar */}
        <button
          onClick={handleGenerarBarcode}
          className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors mb-4"
        >
          Generar Código de Barras
        </button>

        {/* Preview y bloque a imprimir */}
        <div
          ref={printRef}
          className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center w-full"
        >
          <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">
            TextilERP Material Tag
          </p>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            {selectedMaterial?.tipo || "-"}
          </h4>
          <p className="text-xs text-slate-500 mb-2">
            Categoría: {selectedMaterial?.calidad || "-"}
          </p>

          {/* Código de barras */}
          {barcode ? (
            <>
              <img
                src={barcode}
                alt="Código de barras"
                className="h-12 w-full object-contain"
              />
              <p className="text-xs text-slate-500 mt-1">
                {selectedMaterial?.codigo || "Código no disponible"}
              </p>
            </>
          ) : (
            <p className="text-xs text-gray-400">
              Código de barras no generado
            </p>
          )}
        </div>

        {/* Botón imprimir */}
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-green-700 transition-colors mt-4"
        >
          Imprimir Lote
        </button>
      </div>
    </section>
  );
}
