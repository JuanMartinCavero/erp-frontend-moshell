import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';
import api from '../../../services/api';

export default function NuevaFichaTecnica() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(true);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  
  const [formData, setFormData] = useState({
    reference: '',
    name: '',
    client_id: '',
    season: '',
    composition: '',
    weight: '',
    knit_type: '',
    estimated_quantity: '',
    estimated_cost: '',
    pedido_id: ''
  });

  const generarReferencia = () => {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const aleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `FT-${anio}${mes}${dia}-${aleatorio}`;
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, reference: generarReferencia() }));
  }, []);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const response = await api.get('/pedidos');
        setPedidos(response.data.data || response.data);
      } catch (error) {
        console.error('Error cargando pedidos:', error);
      } finally {
        setLoadingPedidos(false);
      }
    };
    cargarPedidos();
  }, []);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const response = await api.get('/clientes');
        setClientes(response.data.data || response.data);
      } catch (error) {
        console.error('Error cargando clientes:', error);
      } finally {
        setLoadingClientes(false);
      }
    };
    cargarClientes();
  }, []);

  const handlePedidoChange = async (e) => {
    const pedidoId = e.target.value;
    setFormData(prev => ({ ...prev, pedido_id: pedidoId }));
    
    if (pedidoId) {
      try {
        const response = await api.get(`/pedidos/${pedidoId}`);
        const pedido = response.data;
        setPedidoSeleccionado(pedido);
        
        // Calcular cantidad total
        const cantidadTotal = (pedido.detalles || []).reduce((sum, item) => sum + (item.cantidad || 0), 0);
        
        // Calcular peso total (SUMA de todos los pesos)
        const pesoTotal = (pedido.detalles || []).reduce((sum, item) => sum + (parseFloat(item.peso) || 0), 0);
        
        // Obtener nombres de productos únicos
        let nombreProducto = '';
        if (pedido.detalles && pedido.detalles.length > 0) {
          const productos = pedido.detalles.map(d => d.producto).filter((v, i, a) => a.indexOf(v) === i);
          nombreProducto = productos.join(' + ');
        }
        
        // Determinar temporada
        let temporada = '';
        if (pedido.fecha_entrega) {
          const mes = new Date(pedido.fecha_entrega).getMonth() + 1;
          if (mes >= 3 && mes <= 5) temporada = 'Primavera';
          else if (mes >= 6 && mes <= 8) temporada = 'Verano';
          else if (mes >= 9 && mes <= 11) temporada = 'Otoño';
          else temporada = 'Invierno';
        }
        
        setFormData(prev => ({
          ...prev,
          client_id: pedido.cliente_id,
          estimated_quantity: cantidadTotal,
          estimated_cost: pedido.total || 0,
          name: nombreProducto || prev.name || `Producto del pedido ${pedido.numero_pedido}`,
          season: temporada || prev.season,
          weight: pesoTotal > 0 ? pesoTotal.toString() : prev.weight
        }));
      } catch (error) {
        console.error('Error cargando detalles del pedido:', error);
      }
    } else {
      setPedidoSeleccionado(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = { ...formData };
      if (!dataToSend.pedido_id) delete dataToSend.pedido_id;
      
      const response = await api.post('/technical-sheets', dataToSend);
      alert('Ficha técnica creada exitosamente');
      navigate(`/FichaTecnica/${response.data.data.id}`);
    } catch (error) {
      alert('Error al crear: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/FichaTecnica')}
          className="text-slate-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <h1 className="text-2xl font-bold text-on-surface">Nueva Ficha Técnica</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1 text-on-surface">
                  Pedido Asociado (opcional - autocompleta campos)
                </label>
                <select
                  value={formData.pedido_id}
                  onChange={handlePedidoChange}
                  className="w-full p-2 border rounded bg-surface-container text-on-surface"
                  disabled={loadingPedidos}
                >
                  <option value="">-- Ninguno, crear sin pedido --</option>
                  {pedidos.map((pedido) => (
                    <option key={pedido.id} value={pedido.id}>
                      #{pedido.numero_pedido} - {pedido.cliente?.empresa || 'Cliente'} - {pedido.total}€
                    </option>
                  ))}
                </select>
                {loadingPedidos && <p className="text-xs text-slate-500 mt-1">Cargando pedidos...</p>}
                {pedidoSeleccionado && (
                  <p className="text-xs text-emerald-500 mt-1">
                    ✅ Campos autocompletados desde el pedido #{pedidoSeleccionado.numero_pedido}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Referencia *</label>
                <input type="text" name="reference" value={formData.reference} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" required />
                <p className="text-xs text-slate-500 mt-1">Código único de la ficha técnica</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Nombre del Producto *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" required />
                {pedidoSeleccionado && pedidoSeleccionado.detalles && (
                  <p className="text-xs text-emerald-500 mt-1">
                    Producto autollenado desde: {pedidoSeleccionado.detalles.map(d => d.producto).join(', ')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Cliente *</label>
                <select name="client_id" value={formData.client_id} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" required disabled={loadingClientes}>
                  <option value="">-- Seleccionar Cliente --</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.empresa || cliente.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Temporada</label>
                <input type="text" name="season" value={formData.season} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Cantidad Estimada</label>
                <input type="number" name="estimated_quantity" value={formData.estimated_quantity} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Costo Estimado</label>
                <input type="number" name="estimated_cost" value={formData.estimated_cost} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Composición</label>
                <input type="text" name="composition" value={formData.composition} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Peso (GSM)</label>
                <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
                {pedidoSeleccionado && pedidoSeleccionado.detalles && (
                  <p className="text-xs text-emerald-500 mt-1">
                    Peso autollenado desde detalles_pedido: {formData.weight} GSM
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Tipo de Tejido</label>
                <input type="text" name="knit_type" value={formData.knit_type} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>

            </div>

            <button type="submit" disabled={loading} className="w-full bg-indigo-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-600">
              <Save className="w-4 h-4" />
              {loading ? 'Creando...' : 'Crear Ficha Técnica'}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}