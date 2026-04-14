import { useState, useEffect } from "react";
import usePedidos from "../../../hooks/usePedidos";
import useClients from "../../../hooks/useClients";

export default function OrderFormModal({ isOpen, onClose, onSuccess, editData = null }) {
  const { addPedido, loading } = usePedidos();
  const { clientes, fetchClientes, loading: clientsLoading } = useClients();

  const [formData, setFormData] = useState({
    cliente_id: "",
    tipo_pedido: "Producción",
    fecha_pedido: new Date().toISOString().split("T")[0],
    fecha_entrega: "",
    descripcion: "",
    estado_pago: "Falta cancelar",
    items: [
      {
        producto: "",
        talla: "",
        color: "",
        cantidad: "",
        precio_unitario: "",
        peso: "",
      },
    ],
  });

  useEffect(() => {
    if (isOpen) {
      fetchClientes();
      if (editData) {
        setFormData({
          cliente_id: editData.cliente_id,
          tipo_pedido: editData.tipo_pedido,
          fecha_pedido: editData.fecha_pedido,
          fecha_entrega: editData.fecha_entrega,
          descripcion: editData.descripcion || "",
          items: editData.items || [
            {
              producto: "",
              talla: "",
              color: "",
              cantidad: "",
              precio_unitario: "",
              peso: "",
            },
          ],
        });
      } else {
        setFormData({
          cliente_id: "",
          tipo_pedido: "Producción",
          fecha_pedido: new Date().toISOString().split("T")[0],
          fecha_entrega: "",
          descripcion: "",
          items: [
            {
              producto: "",
              talla: "",
              color: "",
              cantidad: "",
              precio_unitario: "",
              peso: "",
            },
          ],
        });
      }
    }
  }, [isOpen, editData]);

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => {
      const cantidad = parseFloat(item.cantidad) || 0;
      const precio = parseFloat(item.precio_unitario) || 0;
      return sum + cantidad * precio;
    }, 0);
    const igv = Math.round(subtotal * 0.18 * 100) / 100;
    const total = Math.round((subtotal + igv) * 100) / 100;

    const monto_adelanto = Math.round(total * 0.5 * 100) / 100;
    const saldo = Math.round((total - monto_adelanto) * 100) / 100;
    return { subtotal, igv, total, monto_adelanto, saldo };
  };

  const { subtotal, igv, total, monto_adelanto, saldo } = calculateTotals();

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar que los campos numéricos tengan valores válidos
    const itemsValid = formData.items.every((item) => {
      const cantidad = parseFloat(item.cantidad);
      const precio = parseFloat(item.precio_unitario);
      return item.producto && cantidad > 0 && precio > 0;
    });

    if (!formData.cliente_id || !itemsValid) {
      alert("Completa todos los campos requeridos");
      return;
    }

    // Convertir valores para enviar
    const dataToSend = {
      ...formData,
      estado_pago: formData.estado_pago,
      items: formData.items.map((item) => ({
        ...item,
        cantidad: parseFloat(item.cantidad) || 0,
        precio_unitario: parseFloat(item.precio_unitario) || 0,
        peso: parseFloat(item.peso) || 0,
      })),
    };

    try {
      await onSuccess(dataToSend);
      onClose();
    } catch (error) {
      alert("Error al crear. Inténtalo de nuevo.");
      console.error("Error:", error);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          producto: "",
          talla: "",
          color: "",
          cantidad: "",
          precio_unitario: "",
          peso: "",
        },
      ],
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  // Función para duplicar un producto con diferentes talla/color
  const duplicateItem = (index) => {
    const itemToDuplicate = { ...formData.items[index] };

    const newItems = [...formData.items];
    newItems.splice(index + 1, 0, itemToDuplicate);

    setFormData({ ...formData, items: newItems });
  };

  const getSaldo = () => {
    const total = calculateTotals().total;

    if (formData.estado_pago === "Cancelado") return 0;

    if (formData.estado_pago === "Canceló 50%") return total * 0.5;

    return total;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {editData ? "Editar Pedido" : "Nuevo Pedido"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cliente */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Cliente <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.cliente_id}
              onChange={(e) =>
                setFormData({ ...formData, cliente_id: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={clientsLoading}
            >
              <option value="">Seleccionar cliente...</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} {cliente.apellido} ({cliente.pais})
                </option>
              ))}
            </select>
          </div>

          {/* Tipo Pedido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tipo Pedido <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.tipo_pedido}
                onChange={(e) =>
                  setFormData({ ...formData, tipo_pedido: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="Producción">Producción</option>
                <option value="Muestra">Muestra</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Fecha Pedido <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.fecha_pedido}
                onChange={(e) =>
                  setFormData({ ...formData, fecha_pedido: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Fecha Entrega
            </label>
            <input
              type="date"
              value={formData.fecha_entrega}
              onChange={(e) =>
                setFormData({ ...formData, fecha_entrega: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary resize-vertical"
              placeholder="Notas especiales del pedido..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Estado de Pago
            </label>

            <select
              value={formData.estado_pago}
              onChange={(e) =>
                setFormData({ ...formData, estado_pago: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="Falta cancelar">Falta cancelar</option>
              <option value="Canceló 50%">Canceló 50%</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          {/* Items Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-bold text-gray-900">
                Items del Pedido
              </label>
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                + Agregar Item
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-gray-50 rounded-lg items-end"
                >
                  <input
                    type="text"
                    placeholder="Ej: Chompa Algodón"
                    value={item.producto}
                    onChange={(e) =>
                      updateItem(index, "producto", e.target.value)
                    }
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Talla (S,M,L,XL)"
                    value={item.talla}
                    onChange={(e) => updateItem(index, "talla", e.target.value)}
                    className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2"
                  />
                  <input
                    type="text"
                    placeholder="Color"
                    value={item.color}
                    onChange={(e) => updateItem(index, "color", e.target.value)}
                    className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2"
                  />
                  <input
                    type="text"
                    placeholder="Cantidad"
                    value={item.cantidad}
                    onChange={(e) =>
                      updateItem(index, "cantidad", e.target.value)
                    }
                    className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2"
                  />
                  <input
                    type="text"
                    placeholder="Precio unit."
                    value={item.precio_unitario}
                    onChange={(e) =>
                      updateItem(index, "precio_unitario", e.target.value)
                    }
                    className="w-28 p-3 border border-gray-300 rounded-lg focus:ring-2"
                  />
                  {formData.tipo_pedido === "Producción" && (
                    <input
                      type="text"
                      placeholder="Peso (kg)"
                      value={item.peso}
                      onChange={(e) =>
                        updateItem(index, "peso", e.target.value)
                      }
                      className="w-28 p-3 border border-gray-300 rounded-lg focus:ring-2"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => duplicateItem(index)}
                    className="px-3 py-3 text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium"
                    title="Duplicar para otra talla/color"
                  >
                    📋
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>S/. {total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Adelanto (50%):</span>
                <span>S/. {monto_adelanto.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estado:</span>
                <span>{formData.estado_pago}</span>
              </div>

              <div className="flex justify-between font-bold">
                <span>Saldo:</span>
                <span>S/. {saldo.toFixed(2)}</span>
              </div>
            </div>

            {/* Totals */}
            {formData.items.length > 0 &&
              formData.items.some(
                (item) => item.cantidad && item.precio_unitario,
              ) && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Subtotal:</span>
                    <span>S/. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>IGV (18%):</span>
                    <span>S/. {igv.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-primary mt-2">
                    <span>Total:</span>
                    <span>S/. {total.toFixed(2)}</span>
                  </div>
                </div>
              )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={
                loading || !formData.cliente_id || formData.items.length === 0
              }
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Actualizando lista..." : "Crear Pedido"}
            </button>
          </div>
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center font-semibold mb-4 animate-pulse">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
