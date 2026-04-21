import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function MaterialsBOMTab({ materiales, isEditing }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold">Materiales y BOM</h4>
          {isEditing && <button className="text-xs font-semibold text-[#42526E]">+ Agregar Material</button>}
        </div>
        {materiales.length > 0 ? materiales.map((m, idx) => (
          <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg mb-2">
            <div><p className="font-medium">{m.name}</p><p className="text-xs">Requerido: {m.required} {m.unit}</p></div>
            <div className="text-right"><p className={`text-sm font-semibold ${m.available >= m.required ? 'text-emerald-600' : 'text-amber-600'}`}>{m.available >= m.required ? 'Disponible' : 'Stock bajo'}</p><p className="text-xs">Disponible: {m.available} {m.unit}</p></div>
          </div>
        )) : <p className="text-gray-500 text-center py-8">No hay materiales definidos</p>}
      </CardContent>
    </Card>
  );
}