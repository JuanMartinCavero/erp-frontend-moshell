import React, { useState } from "react";
import { registrarMovimiento } from "../../../services/kardexApi";
import { buscarMaterialPorCodigo } from "../../../services/materialApi";
import axiosClient from "../../../services/axiosClient";

export function TabEntradaCompra({ onClose, onRefresh }) {
  const [material, setMaterial] = useState(null);
  const [materialId, setMaterialId] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [esMaterialNuevo, setEsMaterialNuevo] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");

  // AGREGADO: Estado para búsqueda por orden de compra
  const [ordenCompraId, setOrdenCompraId] = useState("");
  const [ordenEncontrada, setOrdenEncontrada] = useState(null);
  const [buscandoOrden, setBuscandoOrden] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  // const handleBuscar = async () => {
  //   if (!codigo) return;
  //   try {
  //     const data = await buscarMaterialPorCodigo(codigo);
  //     setMaterial(data);
  //   } catch (error) {
  //     console.error("Material no encontrado");
  //     setMaterial(null);
  //     alert("Material no encontrado");
  //   }
  // };

  // AGREGADO: Buscar orden de compra por número
  const handleBuscarOrden = async () => {
    if (!ordenCompraId) return;

    setBuscandoOrden(true);

    try {
      const response = await axiosClient.get(
        `/ordenes-compra/buscar/${ordenCompraId}`,
      );

      const orden = response.data;

      setOrdenEncontrada(orden);
    } catch (error) {
      console.error(error);
      alert("Error buscando orden");
      setOrdenEncontrada(null);
    } finally {
      setBuscandoOrden(false);
    }
  };
  // AGREGADO: Seleccionar un detalle de la orden para registrar entrada
  const handleSeleccionarDetalle = (detalle) => {
    console.log("DETALLE SELECCIONADO:", detalle);

    setDetalleSeleccionado(detalle);

    setMaterialId(detalle.material_id);

    if (detalle.material_id) {
      // Material existente
      setEsMaterialNuevo(false);
      setCodigo(detalle.material?.codigo ?? "");
    } else {
      // Material nuevo
      setEsMaterialNuevo(true);
      setCodigo("");
    }

    setCantidad(String(detalle.cantidad_conos ?? 0));

    setValorUnitario(String(detalle.precio_unitario ?? 0));

    alert(
      `Detalle seleccionado:
      Calidad: ${detalle.calidad}
      Título: ${detalle.titulo}
      Color: ${detalle.color}
      Conos: ${detalle.cantidad_conos}
      Precio: ${detalle.precio_unitario}`,
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!material) {
    //   alert("Debe buscar un material");
    //   return;
    // }

    try {
      await registrarMovimiento({
        material_id: materialId,
        codigo: codigo,
        tipo_movimiento: "entrada",
        cantidad: Number(cantidad),
        valor_unitario: Number(valorUnitario),
        stock_minimo: Number(stockMinimo),
        lote: ordenEncontrada ? ordenEncontrada.orden_id : null,
        calidad: detalleSeleccionado?.calidad,
        color: detalleSeleccionado?.color,
        titulo: detalleSeleccionado?.titulo,
        cantidad_conos: Number(cantidad),
        orden_compra_id: ordenCompraId || null,
        referencia: ordenCompraId
          ? `Compra OC: ${ordenCompraId}`
          : "Compra directa",
      });

      alert("Entrada registrada exitosamente");
      onRefresh?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        "Error registrando entrada: " +
          (error.response?.data?.message || error.message),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* AGREGADO: Campo para buscar por orden de compra */}
      <div className="border-b pb-4 mb-2">
        <label className="block text-sm font-medium mb-1">
          Buscar por Orden de Compra
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ej: OC-2024-0001"
            value={ordenCompraId}
            onChange={(e) => setOrdenCompraId(e.target.value)}
            className="input flex-1 border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={handleBuscarOrden}
            disabled={buscandoOrden}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            {buscandoOrden ? "Buscando..." : "Buscar Orden"}
          </button>
        </div>

        {/* AGREGADO: Mostrar detalles de la orden encontrada */}
        {ordenEncontrada && ordenEncontrada.detalles && (
          <div className="mt-3 bg-gray-50 p-3 rounded text-sm">
            <p className="font-bold">Orden: {ordenEncontrada.orden_id}</p>
            <p>Proveedor: {ordenEncontrada.proveedor_nombre}</p>
            <p>Fecha: {ordenEncontrada.fecha_orden}</p>
            <div className="mt-2">
              <p className="text-xs font-semibold">Ítems de la orden:</p>
              {ordenEncontrada.detalles.map((detalle, idx) => (
                <div
                  key={idx}
                  className="text-xs p-1 border-b flex justify-between items-center"
                >
                  <span>
                    {detalle.calidad} - {detalle.titulo} ({detalle.color})
                  </span>
                  <span>
                    {detalle.cantidad_conos} conos - S/{detalle.precio_unitario}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSeleccionarDetalle(detalle)}
                    className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                  >
                    Usar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          placeholder="Ingrese código del nuevo material"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="input flex-1 border rounded px-3 py-2"
        />
        {/* <button
          type="button"
          onClick={handleBuscar}
          className="bg-gray-200 px-4 rounded"
        >
          Buscar
        </button> */}
      </div>

      {material && (
        <div className="bg-gray-50 p-3 rounded text-sm">
          <p>
            <b>Material:</b> {material.descripcion || material.calidad}
          </p>
          <p>
            <b>Código:</b> {material.codigo}
          </p>
          <p>
            <b>Stock actual:</b> {material.stock_actual}
          </p>
          <p>
            <b>Color:</b> {material.color}
          </p>
          <p>
            <b>Calidad:</b> {material.calidad}
          </p>
        </div>
      )}

      <input
        type="number"
        step="0.001"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
        required
      />

      <input
        type="number"
        step="0.01"
        placeholder="Valor unitario"
        value={valorUnitario}
        onChange={(e) => setValorUnitario(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
        required
      />

      <input
        type="number"
        min="1"
        placeholder="Stock mínimo"
        value={stockMinimo}
        onChange={(e) => setStockMinimo(e.target.value)}
        className="input border rounded px-3 py-2 w-full"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white p-3 rounded-lg w-full hover:bg-purple-700"
      >
        Registrar Entrada
      </button>
    </form>
  );
}
