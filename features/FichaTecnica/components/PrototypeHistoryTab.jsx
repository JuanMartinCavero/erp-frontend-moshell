import React from 'react';
import { CheckCircle2, FileText, Plus, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function PrototypeHistoryTab({ samples }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Prototype History</CardTitle>
        <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> New Version</button>
      </CardHeader>
      <CardContent>
        {samples.length > 0 ? samples.map((s, i) => (
          <div key={i} className="flex justify-between items-center p-4 border rounded-xl mb-3">
            <div className="flex gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100'}`}>
                {s.status === 'APPROVED' ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div><h5 className="font-bold">Prototype {s.version} ({s.type})</h5><p className="text-xs text-gray-500">{s.evaluated_by ? `Evaluated by ${s.evaluated_by}` : ''}</p></div>
            </div>
            <div className="flex gap-4"><Badge variant={s.status === 'APPROVED' ? 'success' : 'warning'}>{s.status}</Badge><ChevronRight className="w-5 h-5 text-gray-400" /></div>
          </div>
        )) : <p className="text-gray-500 text-center py-8">No hay prototipos</p>}
      </CardContent>
    </Card>
  );
}