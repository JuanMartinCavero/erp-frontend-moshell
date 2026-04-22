import React from 'react';
import { Building2, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../../components/ui/Card';

export default function ClientSidebar({ cliente }) {
  return (
    <Card>
      <CardHeader><p className="text-xs font-bold text-gray-400 uppercase">Client Detail</p></CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center"><Building2 className="w-6 h-6 text-gray-500" /></div>
          <div><h4 className="font-bold">{cliente?.empresa || cliente?.nombre || "N/A"}</h4><p className="text-sm text-gray-500">{cliente?.ciudad || cliente?.pais || "N/A"}</p></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Contact:</span>
          <button className="font-semibold text-[#42526E] flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Message</button>
        </div>
      </CardContent>
    </Card>
  );
}