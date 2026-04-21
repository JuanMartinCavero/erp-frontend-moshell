import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function TechnicalDetailsTab({ techSheet, isEditing, onUpdate }) {
  const [editedSpecs, setEditedSpecs] = useState({});

  const handleSave = async () => {
    const result = await onUpdate(editedSpecs);
    if (result.success) setEditedSpecs({});
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" /> Base Fabric
            </h4>
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <input type="text" value={editedSpecs.composition ?? techSheet.composition ?? ''} onChange={(e) => setEditedSpecs({...editedSpecs, composition: e.target.value})} className="w-full p-2 border rounded" placeholder="Composition" />
              <input type="text" value={editedSpecs.weight ?? techSheet.weight ?? ''} onChange={(e) => setEditedSpecs({...editedSpecs, weight: e.target.value})} className="w-full p-2 border rounded" placeholder="Weight" />
              <input type="text" value={editedSpecs.knit_type ?? techSheet.knit_type ?? ''} onChange={(e) => setEditedSpecs({...editedSpecs, knit_type: e.target.value})} className="w-full p-2 border rounded" placeholder="Knit Type" />
              <button onClick={handleSave} className="w-full bg-[#42526E] text-white py-2 rounded">Save Changes</button>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Composition:</span><span className="font-semibold">{techSheet.composition || "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Weight:</span><span className="font-semibold">{techSheet.weight || "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Knit Type:</span><span className="font-semibold">{techSheet.knit_type || "N/A"}</span></div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h4 className="font-bold mb-6 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-dashed" /> Colorways
          </h4>
          <div className="flex items-center gap-4 flex-wrap">
            {techSheet.colorways && JSON.parse(techSheet.colorways).map((color, idx) => (
              <div key={idx} className="w-10 h-10 rounded-full shadow-inner ring-2 ring-white ring-offset-1" style={{ backgroundColor: color }} title={color} />
            ))}
            {isEditing && <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"><Plus className="w-5 h-5" /></button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}