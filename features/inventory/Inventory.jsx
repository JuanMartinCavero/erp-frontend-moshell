import React, { useState, useEffect } from "react";
import { InventoryHeader } from "./components/InventoryHeader";
import { StatsCards } from "./components/InventoryStats";
import { FiltersBar } from "./components/InventoryFilters";
import { InventoryTable } from "./components/InventoryTable";
import { RegisterMaterialModal } from "./components/registerMaterialModal";
import { useMaterial } from "../../hooks/useMaterial";
import { useKardex } from "../../hooks/usekardex";
import {
  exportExcel,
  getMaterialesFiltrados,
  exportMultipleExcel,
  getResumenGeneral,
} from "../../services/kardexApi";
import ExportPDFButton from "./components/ExportPDFButton";

export function Inventory() {
  const [codigo, setCodigo] = useState("");
  const { material, buscarMaterial, obtenerMateriales } = useMaterial();
  const { kardex, loading, refetch } = useKardex(material?.id);
  const [openModal, setOpenModal] = useState(false);
  const [mostrandoKardex, setMostrandoKardex] = useState(false);

  // Estados para vista general
  const [materiales, setMateriales] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [loadingMateriales, setLoadingMateriales] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Estados para filtros (sin paginación)
  const [filtros, setFiltros] = useState({
    search: "",
    tipo: "",
    calidad: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  // Estados para período y fechas
  const [periodo, setPeriodo] = useState("all");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [fechasAplicadas, setFechasAplicadas] = useState({
    inicio: null,
    fin: null,
  });
  const [exportLoading, setExportLoading] = useState(false);

  // Cargar materiales cuando cambian los filtros
  useEffect(() => {
    if (!mostrandoKardex) {
      cargarMateriales();
    }
  }, [filtros, mostrandoKardex]);

  useEffect(() => {
    if (!mostrandoKardex) {
      if (periodo === "all") {
        setFechaInicio("");
        setFechaFin("");
        setFechasAplicadas({ inicio: null, fin: null });
        setFiltros((prev) => ({
          ...prev,
          fecha_inicio: "",
          fecha_fin: "",
        }));
      } else if (periodo !== "custom") {
        const fin = new Date();
        const inicio = new Date();
        inicio.setDate(fin.getDate() - periodo);

        const inicioStr = inicio.toISOString().split("T")[0];
        const finStr = fin.toISOString().split("T")[0];

        setFechaInicio(inicioStr);
        setFechaFin(finStr);
        setFechasAplicadas({ inicio: inicioStr, fin: finStr });

        setFiltros((prev) => ({
          ...prev,
          fecha_inicio: inicioStr,
          fecha_fin: finStr,
        }));
      }
    }
  }, [periodo, mostrandoKardex]);

  const cargarMateriales = async () => {
    setLoadingMateriales(true);
    try {
      const params = {
        search: codigo || filtros.search,
        tipo: filtros.tipo,
        calidad: filtros.calidad,
        fecha_inicio: fechasAplicadas.inicio,
        fecha_fin: fechasAplicadas.fin,
      };

      const response = await getMaterialesFiltrados(params);

      const resData = response.data || response;
      const listaMateriales = Array.isArray(resData)
        ? resData
        : resData.data || [];

      setMateriales(listaMateriales);

      if (response.resumen) {
        setResumen(response.resumen);
      } else {
        const totalStock = listaMateriales.reduce(
          (sum, m) => sum + (m.inventario?.stock_actual || 0),
          0,
        );
        const totalValor = listaMateriales.reduce((sum, m) => {
          const stock = m.inventario?.stock_actual || 0;
          const valorUnitario = m.inventario?.valor_unitario || 0;
          return sum + stock * valorUnitario;
        }, 0);
        setResumen({
          total_materiales: listaMateriales.length,
          total_stock: totalStock,
          total_valor: totalValor,
        });
      }
    } catch (error) {
      console.error("Error cargando materiales:", error);
    } finally {
      setLoadingMateriales(false);
    }
  };

  const handleBuscar = async () => {
    if (!codigo) {
      setMostrandoKardex(false);
      cargarMateriales();
      return;
    }

    try {
      await buscarMaterial(codigo);
      setMostrandoKardex(true);
    } catch (error) {
      setMostrandoKardex(false);
      setFiltros((prev) => ({
        ...prev,
        search: codigo,
      }));
      cargarMateriales();
    }
  };

  const handleLimpiar = () => {
    setCodigo("");
    setMostrandoKardex(false);
    setSelectedMaterials([]);
    setPeriodo("all");
    setFechaInicio("");
    setFechaFin("");
    setFechasAplicadas({ inicio: null, fin: null });
    setFiltros({
      search: "",
      tipo: "",
      calidad: "",
      fecha_inicio: "",
      fecha_fin: "",
    });
    setTimeout(() => cargarMateriales(), 50);
  };

  const handleAplicarFechas = (inicio, fin) => {
    setFechasAplicadas({ inicio, fin });
    setFiltros((prev) => ({
      ...prev,
      fecha_inicio: inicio,
      fecha_fin: fin,
    }));
  };

  const handleToggleSelectAll = (checked) => {
    if (checked) {
      setSelectedMaterials(materiales.map((m) => m.id));
    } else {
      setSelectedMaterials([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleExportExcel = async () => {
    if (mostrandoKardex && material?.id) {
      setExportLoading(true);
      try {
        await exportExcel(material.id, {
          fecha_inicio: fechasAplicadas.inicio,
          fecha_fin: fechasAplicadas.fin,
          material_codigo: material.codigo,
        });
      } catch (error) {
        console.error("Error al exportar Excel:", error);
        alert("Error al exportar Excel");
      } finally {
        setExportLoading(false);
      }
    } else if (selectedMaterials.length > 0) {
      setExportLoading(true);
      try {
        await exportMultipleExcel(selectedMaterials, {
          fecha_inicio: fechasAplicadas.inicio,
          fecha_fin: fechasAplicadas.fin,
        });
      } catch (error) {
        console.error("Error al exportar Excel:", error);
        alert("Error al exportar Excel");
      } finally {
        setExportLoading(false);
      }
    } else {
      alert("Selecciona al menos un material para exportar");
    }
  };

  const handleExportPDF = () => {
    const pdfButton = document.getElementById("pdf-export-button-header");
    if (pdfButton) {
      pdfButton.click();
    } else {
      alert("Botón PDF no encontrado");
    }
  };

  const handleRefresh = async () => {
    if (mostrandoKardex && material?.id) {
      await refetch();
    } else {
      await cargarMateriales();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <InventoryHeader
        onRegister={() => setOpenModal(true)}
        periodo={periodo}
        setPeriodo={setPeriodo}
        fechaInicio={fechaInicio}
        setFechaInicio={setFechaInicio}
        fechaFin={fechaFin}
        setFechaFin={setFechaFin}
        onAplicarFechas={handleAplicarFechas}
        onExportExcel={handleExportExcel}
        onExportPDF={handleExportPDF}
        loading={exportLoading}
        showKardex={mostrandoKardex}
        selectedCount={selectedMaterials.length}
      />

      <div className="flex-1 overflow-y-auto p-8">
        <StatsCards
          resumen={resumen}
          mostrandoKardex={mostrandoKardex}
          material={material}
          kardex={kardex}
        />

        <div className="flex gap-3 mb-4 flex-wrap">
          <input
            type="text"
            placeholder="Buscar por código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="border px-3 py-2 rounded flex-1 min-w-[200px]"
            onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
          />
          <button
            onClick={handleBuscar}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Buscar
          </button>
          <button
            onClick={handleLimpiar}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Limpiar
          </button>

          {/* Filtro por tipo de material */}
          <select
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
            className="border px-3 py-2 rounded"
          >
            <option value="">Todos los tipos</option>
            <option value="Hilo">Hilo</option>
            <option value="Tela">Tela</option>
            <option value="Algodón">Algodón</option>
            <option value="Alpaca">Alpaca</option>
            <option value="Poliéster">Poliéster</option>
          </select>

          {/* Filtro por calidad */}
          <select
            value={filtros.calidad}
            onChange={(e) =>
              setFiltros({ ...filtros, calidad: e.target.value })
            }
            className="border px-3 py-2 rounded"
          >
            <option value="">Todas las calidades</option>
            <option value="Primera">Primera</option>
            <option value="Segunda">Segunda</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <FiltersBar />

        {mostrandoKardex && material ? (
          <div>
            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <h3 className="font-bold">
                Material: {material.calidad} - {material.color}
              </h3>
              <p>
                Código: {material.codigo} | Stock actual:{" "}
                {material.inventario?.stock_actual || 0}
              </p>
              {fechasAplicadas.inicio && fechasAplicadas.fin && (
                <p className="text-sm text-gray-500 mt-1">
                  Período: {fechasAplicadas.inicio} hasta {fechasAplicadas.fin}
                </p>
              )}
            </div>
            {loading ? (
              <div className="text-center py-8">Cargando Kardex...</div>
            ) : (
              <>
                <InventoryTable data={kardex} tipo="kardex" />
                <div className="hidden">
                  <ExportPDFButton
                    id="pdf-export-button-header"
                    data={kardex}
                    material={material}
                    fechas={fechasAplicadas}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-bold">
                  Total: {materiales.length} materiales
                </span>
                {selectedMaterials.length > 0 && (
                  <span className="ml-4 text-blue-600">
                    {selectedMaterials.length} seleccionados
                  </span>
                )}
                {resumen && (
                  <>
                    <span className="ml-4">
                      Stock total: {resumen.total_stock}
                    </span>
                    <span className="ml-4">
                      Valor total: S/ {resumen.total_valor?.toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              {selectedMaterials.length > 0 && (
                <button
                  onClick={() => setSelectedMaterials([])}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Limpiar selección
                </button>
              )}
            </div>

            {loadingMateriales ? (
              <div className="text-center py-8">Cargando materiales...</div>
            ) : (
              <>
                <InventoryTable
                  data={materiales}
                  tipo="materiales"
                  selectedMaterials={selectedMaterials}
                  onToggleSelect={handleToggleSelect}
                  onToggleSelectAll={handleToggleSelectAll}
                  showCheckboxes={true}
                  resumen={resumen}
                />

                {selectedMaterials.length > 0 && (
                  <div className="hidden">
                    <ExportPDFButton
                      id="pdf-export-button-header"
                      data={materiales.filter((m) =>
                        selectedMaterials.includes(m.id),
                      )}
                      material={{
                        codigo: `${selectedMaterials.length}_materiales`,
                      }}
                      fechas={fechasAplicadas}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <RegisterMaterialModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
