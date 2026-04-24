import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import api from '../../../services/api';

export default function NuevaFichaTecnica() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    reference: '',
    name: '',
    client_id: '',
    season: '',
    composition: '',
    weight: '',
    knit_type: '',
    estimated_quantity: '',
    estimated_cost: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/technical-sheets', formData);
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
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Referencia *</label>
                <input type="text" name="reference" value={formData.reference} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Nombre del Producto *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">ID del Cliente *</label>
                <input type="number" name="client_id" value={formData.client_id} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Temporada</label>
                <input type="text" name="season" value={formData.season} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Composición</label>
                <input type="text" name="composition" value={formData.composition} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Peso (GSM)</label>
                <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Tipo de Tejido</label>
                <input type="text" name="knit_type" value={formData.knit_type} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Cantidad Estimada</label>
                <input type="number" name="estimated_quantity" value={formData.estimated_quantity} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface">Costo Estimado</label>
                <input type="number" name="estimated_cost" value={formData.estimated_cost} onChange={handleChange} className="w-full p-2 border rounded bg-surface-container text-on-surface" />
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