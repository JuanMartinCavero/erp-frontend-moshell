// src/features/techsheet/TechSheet.jsx
import React from "react";
import { 
  Download, 
  Edit3, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Plus, 
  MessageSquare,
  Building2,
  ChevronRight,
  Upload
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export default function FichaTecnica() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Product Dev</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Tech Sheets</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cotton Jersey Crew Neck</h1>
          <p className="text-sm text-gray-500 font-medium">
            Ref: TS-2024-0812 <span className="mx-2">•</span> 
            Season: Summer 24 <span className="mx-2">•</span> 
            Client: Nordic Apparel
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="px-4 py-2 bg-[#42526E] hover:bg-[#344563] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
            <Edit3 className="w-4 h-4" /> Edit Sheet
          </button>
        </div>
      </div>

      {/* Workflow Status */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">Workflow Status</h3>
          <div className="relative flex justify-between items-center px-8">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200">
              <div className="h-full bg-[#42526E] w-[66%]"></div>
            </div>
            
            {[
              { label: "Sample Eval", status: "COMPLETED", active: true, icon: CheckCircle2 },
              { label: "Prototype", status: "COMPLETED", active: true, icon: CheckCircle2 },
              { label: "Technical Sheet", status: "IN REVIEW", active: true, icon: FileText },
              { label: "Client Approval", status: "PENDING", active: false, icon: Clock },
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  step.active ? 'bg-[#42526E] text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">{step.label}</span>
                <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${
                  step.status === 'COMPLETED' ? 'text-emerald-600' :
                  step.status === 'IN REVIEW' ? 'text-amber-600' : 'text-gray-400'
                }`}>{step.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="flex gap-8">
        <div className="flex-1 space-y-8">
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-gray-200 px-2">
            {["Technical Details", "Materials & BOM", "Prototypes (3)", "Size Specs"].map((tab, i) => (
              <button 
                key={tab} 
                className={`pb-4 text-sm font-semibold transition-colors relative ${
                  i === 0 ? 'text-[#42526E]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
                {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#42526E]"></div>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" /> Base Fabric
                  </h4>
                  <button className="text-xs font-semibold text-[#42526E] hover:underline">Change</button>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Composition:</span>
                    <span className="font-semibold">100% Organic Cotton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight:</span>
                    <span className="font-semibold">180 GSM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Knit Type:</span>
                    <span className="font-semibold">Single Jersey</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-bold mb-6 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-dashed"></div> Colorways
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#344563] shadow-inner ring-2 ring-white ring-offset-1"></div>
                  <div className="w-10 h-10 rounded-full bg-[#E2E8F0] shadow-inner"></div>
                  <div className="w-10 h-10 rounded-full bg-[#0F172A] shadow-inner"></div>
                  <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Prototype History</CardTitle>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> New Version
              </button>
            </CardHeader>
            <CardContent className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-4 border border-emerald-100 bg-emerald-50/30 rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Prototype V2 (Fitting)</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Evaluated by Jane Smith • 12 Oct 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="success">APPROVED</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Prototype V3 (Sales Sample)</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Requested for Production Quality Check • 24 Oct 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="warning">IN REVIEW</Badge>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-bold mb-4">Reference Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80&random=${i}`} className="w-full h-full object-cover" alt="Ref" />
                </div>
              ))}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1645859515276-d725f85d73bf?w=400&q=80" className="w-full h-full object-cover" alt="Fabric Ref" />
              </div>
              <button className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          <Card className="bg-[#42526E] text-white border-none shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-blue-100 mb-6">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Order Status</span>
              </div>
              <button className="w-full bg-white text-[#42526E] py-3 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors mb-4">
                PAY 50% DEPOSIT
              </button>
              <p className="text-xs text-blue-200 text-center">Required to initiate bulk production ($12,450.00)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Detail</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Nordic Apparel Group</h4>
                  <p className="text-sm text-gray-500">Oslo, Norway</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Manager:</span>
                  <span className="font-semibold">Erik Thorne</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Contact:</span>
                  <button className="font-semibold text-[#42526E] flex items-center gap-1 hover:underline">
                    Message
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Activity Timeline</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:pr-8 md:group-even:pl-8">
                    <h5 className="font-bold text-sm text-gray-900">Tech Sheet Sent</h5>
                    <p className="text-xs text-gray-500 mt-1">Oct 26, 09:12 AM</p>
                  </div>
                </div>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-odd:pr-8 md:group-even:pl-8">
                    <h5 className="font-bold text-sm text-gray-900">Quality Approval</h5>
                    <p className="text-xs text-gray-500 mt-1">Oct 25, 02:45 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}