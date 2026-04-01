import { useState, useEffect } from 'react';
import usePedidos from '../../../hooks/usePedidos';
import useClients from '../../../hooks/useClients';

export default function OrderFormModal({ isOpen, onClose, editData = null }) {
  const { addPedido, loading } = usePedidos();
  const { clientes, fetchClientes, loading: clientsLoading } = useClients();

  const [formData, setFormData] = useState({
    cliente_id: '',
    tipo_pedido: 'Producción',
    fecha_pedido: new Date().toISOString().split('T')[0],
    fecha_entrega: '',
    descripcion: '',
    items: [{ producto: '', talla: '', color: '', cantidad: 1, precio_unitario: 0, peso: 0 }],
  });

  useEffect(() => {
    if (isOpen) {
      fetchClientes();
      if (editData) {
        // Load edit data
        setFormData({
          cliente_id: editData.cliente_id,
          tipo_pedido: editData.tipo_pedido,
          fecha_pedido: editData.fecha_pedido,
          fecha_entrega: editData.fecha_entrega,
          descripcion: editData.descripcion || '',
          items: editData.items || [{ producto: '', talla: '', color: '', cantidad: 1, precio_unitario: 0 , peso: 0 }],
        });
      } else {
        // Reset for new
        setFormData({
          cliente_id: '',
          tipo_pedido: 'Producción',
          fecha_pedido: new Date().toISOString().split('T')[0],
          fecha_entrega: '',
          descripcion: '',
          items: [{ producto: '', talla: '', color: '', cantidad: 1, precio_unitario: 0 , peso: 0}],
        });
      }
    }
  }, [isOpen, editData]);

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.cantidad * item.precio_unitario), 0);
    const igv = Math.round(subtotal * 0.18 * 100) / 100;
    const total = Math.round((subtotal + igv) * 100) / 100;
    return { subtotal, igv, total };
  };

  const { subtotal, igv, total } = calculateTotals();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cliente_id || formData.items.some(item => !item.producto || item.cantidad <= 0 || item.precio_unitario <= 0)) {
      alert('Completa todos los campos requeridos');
      return;
    }

    try {
      await addPedido(formData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { producto: '', talla: '', color: '', cantidad: 1, precio_unitario: 0 , peso: 0}]
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {editData ? 'Editar Pedido' : 'Nuevo Pedido'}
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
              onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
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
              <label className="block text-sm font-semibold text-gray-900 mb-2">Tipo Pedido <span className="text-red-500">*</span></label>
              <select
                value={formData.tipo_pedido}
                onChange={(e) => setFormData({ ...formData, tipo_pedido: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="Producción">Producción</option>
                <option value="Muestra">Muestra</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Fecha Pedido <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={formData.fecha_pedido}
                onChange={(e) => setFormData({ ...formData, fecha_pedido: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Fecha Entrega</label>
            <input
              type="date"
              value={formData.fecha_entrega}
              onChange={(e) => setFormData({ ...formData, fecha_entrega: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary resize-vertical"
              placeholder="Notas especiales del pedido..."
            />
          </div>

          {/* Items Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-bold text-gray-900">Items del Pedido</label>
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
                <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg items-end">
                  <input
                    placeholder="Producto"
                    value={item.producto}
                    onChange={(e) => updateItem(index, 'producto', e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    placeholder="Talla"
                    value={item.talla}
                    onChange={(e) => updateItem(index, 'talla', e.target.value)}
                    className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2"
                  />
                  <input
                    placeholder="Color"
                    value={item.color}
                    onChange={(e) => updateItem(index, 'color', e.target.value)}
                    className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2"
                  />
                  <input
                    type="number"
                    placeholder="Cant"
                    value={item.cantidad}
                    onChange={(e) => updateItem(index, 'cantidad', parseInt(e.target.value) || 1)}
                    className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2"
                    min="1"
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={item.precio_unitario}
                    onChange={(e) => updateItem(index, 'precio_unitario', parseFloat(e.target.value) || 0)}
                    className="w-28 p-3 border border-gray-300 rounded-lg focus:ring-2"
                    step="0.01"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Peso (kg)"
                    value={item.peso}
                    onChange={(e) => updateItem(index, 'peso', parseFloat(e.target.value) || 0)}
                    className="w-28 p-3 border border-gray-300 rounded-lg focus:ring-2"
                    step="0.01"
                    min="0"
                  />
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

            {/* Totals */}
            {formData.items.length > 0 && (
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
              disabled={loading || !formData.cliente_id || formData.items.length === 0}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : 'Crear Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

