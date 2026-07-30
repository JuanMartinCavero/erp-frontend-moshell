import React, { useState } from 'react';
import { FileText, Plus, Factory, Check } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';
import { useMachines } from '../hooks/useMachines';

export default function TechnicalDetailsTab({ techSheet, isEditing, onUpdate, onUpdateMachine, pedido }) {
  const [editedSpecs, setEditedSpecs] = useState({});
  const [showMachineSelector, setShowMachineSelector] = useState(false);
  
  const { machines, loading: loadingMachines } = useMachines();

  const handleSave = async () => {
    const result = await onUpdate(editedSpecs);
    if (result.success) setEditedSpecs({});
  };

  const handleMachineSelect = async (machineId) => {
    const result = await onUpdateMachine(machineId);
    if (result.success) {
      setShowMachineSelector(false);
    } else {
      alert('Error al asignar máquina: ' + result.error);
    }
  };

  const maquinaSeleccionada = techSheet?.machine;

  // ✅ Obtener colores únicos de los detalles del pedido
  const getColorsFromPedido = () => {
    if (!pedido?.detalles) return [];
    const colors = pedido.detalles
      .map(d => d.color)
      .filter(color => color && color.trim() !== '');
    return [...new Set(colors)];
  };

  const colores = getColorsFromPedido();

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Base Fabric Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" /> Base Fabric
            </h4>
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <input 
                type="text" 
                value={editedSpecs.composition ?? techSheet.composition ?? ''} 
                onChange={(e) => setEditedSpecs({...editedSpecs, composition: e.target.value})} 
                className="w-full p-2 border rounded" 
                placeholder="Composition" 
              />
              <input 
                type="text" 
                value={editedSpecs.weight ?? techSheet.weight ?? ''} 
                onChange={(e) => setEditedSpecs({...editedSpecs, weight: e.target.value})} 
                className="w-full p-2 border rounded" 
                placeholder="Weight" 
              />
              <input 
                type="text" 
                value={editedSpecs.knit_type ?? techSheet.knit_type ?? ''} 
                onChange={(e) => setEditedSpecs({...editedSpecs, knit_type: e.target.value})} 
                className="w-full p-2 border rounded" 
                placeholder="Knit Type" 
              />
              <button onClick={handleSave} className="w-full bg-[#42526E] text-white py-2 rounded">
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Composition:</span>
                <span className="font-semibold">{techSheet.composition || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Weight:</span>
                <span className="font-semibold">{techSheet.weight || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Knit Type:</span>
                <span className="font-semibold">{techSheet.knit_type || "N/A"}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Colorways Card - DINAMIZADO con colores del pedido */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-bold mb-6 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-dashed" /> Colorways
          </h4>
          <div className="flex items-center gap-4 flex-wrap">
            {colores.length > 0 ? (
              colores.map((color, idx) => (
                <div 
                  key={idx} 
                  className="w-10 h-10 rounded-full shadow-inner ring-2 ring-white ring-offset-1" 
                  style={{ backgroundColor: color.toLowerCase() }} 
                  title={color} 
                />
              ))
            ) : (
              <p className="text-sm text-gray-400">No hay colores definidos en el pedido</p>
            )}
            {isEditing && (
              <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Máquina Asociada Card */}
      <Card className="col-span-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold flex items-center gap-2">
              <Factory className="w-4 h-4 text-gray-400" /> Máquina Asociada
            </h4>
            {isEditing && (
              <button 
                onClick={() => setShowMachineSelector(!showMachineSelector)}
                className="text-xs font-semibold text-[#42526E] hover:underline"
              >
                {maquinaSeleccionada ? 'Cambiar Máquina' : 'Seleccionar Máquina'}
              </button>
            )}
          </div>

          {showMachineSelector && (
            <div className="mb-6 border rounded-lg overflow-hidden bg-gray-50">
              {loadingMachines ? (
                <div className="p-4 text-center">Cargando máquinas...</div>
              ) : machines.length === 0 ? (
                <div className="p-4 text-center">No hay máquinas disponibles</div>
              ) : (
                <div className="max-h-48 overflow-y-auto">
                  {machines
                  .filter(machine => machine.status === 'en funcionamiento')
                  .map((machine) => (
                    <button
                      key={machine.id}
                      onClick={() => handleMachineSelect(machine.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 border-b"
                    >
                      <div>
                        <p className="font-medium">{machine.nombre}</p>
                        <p className="text-xs text-gray-500">
                          Código: {machine.code} | Tipo: {machine.tipo || 'N/A'} | Estado: 🟢 En funcionamiento
                        </p>
                      </div>
                      {maquinaSeleccionada?.id === machine.id && (
                        <Check className="w-5 h-5 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isEditing && !maquinaSeleccionada && (
            <div className="text-center py-6 text-gray-400 text-sm">
              <Factory className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No hay máquina asociada</p>
            </div>
          )}

          {!isEditing && maquinaSeleccionada && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Código</p>
                <p className="font-semibold font-mono text-indigo-400">{maquinaSeleccionada.code}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Nombre</p>
                <p className="font-semibold">{maquinaSeleccionada.nombre}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Tipo</p>
                <p className="font-semibold">{maquinaSeleccionada.tipo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Estado</p>
                <p className={`font-semibold ${
                  maquinaSeleccionada.status === 'en funcionamiento' ? 'text-emerald-600' :
                  maquinaSeleccionada.status === 'mantenimiento' ? 'text-amber-600' : 'text-gray-500'
                }`}>
                  {maquinaSeleccionada.status === 'en funcionamiento' ? '🟢 En funcionamiento' :
                   maquinaSeleccionada.status === 'mantenimiento' ? '🟡 Mantenimiento' : '⚫ Inhabilitado'}
                </p>
              </div>
            </div>
          )}

          {isEditing && !showMachineSelector && maquinaSeleccionada && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Código</p>
                <p className="font-semibold font-mono text-indigo-400">{maquinaSeleccionada.code}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Nombre</p>
                <p className="font-semibold">{maquinaSeleccionada.nombre}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Tipo</p>
                <p className="font-semibold">{maquinaSeleccionada.tipo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Estado</p>
                <p className={`font-semibold ${
                  maquinaSeleccionada.status === 'en funcionamiento' ? 'text-emerald-600' :
                  maquinaSeleccionada.status === 'mantenimiento' ? 'text-amber-600' : 'text-gray-500'
                }`}>
                  {maquinaSeleccionada.status === 'en funcionamiento' ? '🟢 En funcionamiento' :
                   maquinaSeleccionada.status === 'mantenimiento' ? '🟡 Mantenimiento' : '⚫ Inhabilitado'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}