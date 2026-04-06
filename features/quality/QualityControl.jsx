import React from "react";
import { 
  CheckCircle2, 
  XCircle, 
  CheckSquare, 
  Square,
  ChevronDown,
  Info,
  Banknote,
  Calendar,
  ChevronRight,
  ClipboardCheck,
  PackageCheck
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";

export default function QualityControl() {
  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <span>Operations</span>
        <ChevronRight className="w-3 h-3" />
        <span>Batch QC & Final Process</span>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order ID: TX-883901</h1>
          <p className="text-sm text-gray-500">
            Client: Nordstrom Luxury Apparel <span className="mx-2">|</span> Item: Silk Evening Gown
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1.5 flex items-center gap-1.5 text-sm">
          <CheckCircle2 className="w-4 h-4" /> Production Complete
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {[
          { label: "1. Quality Inspection", active: true },
          { label: "2. Finishing Steps", active: false },
          { label: "3. Packaging & Labeling", active: false },
          { label: "4. Payment & Shipping", active: false },
        ].map((tab) => (
          <button key={tab.label} className={`pb-4 text-sm font-bold relative ${tab.active ? 'text-[#42526E]' : 'text-gray-400'}`}>
            {tab.label}
            {tab.active && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#42526E]"></div>}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        <div className="flex-1 space-y-6">
          <Card>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-gray-500" /> Quality Inspection Checklist
              </h3>
              <span className="text-xs text-gray-500">Last saved 2m ago</span>
            </div>
            <div className="divide-y divide-gray-100 p-2">
              {[
                { title: "Fabric Tensile Strength Test", desc: "Resistance to tearing and pulling", status: "PASSED" },
                { title: "Dye Consistency & Color Matching", desc: "Against Pantone 19-4052 TCX", status: "PASSED" },
                { title: "Seam Integrity & Stitching Density", desc: "12 stitches per inch minimum", status: "FAILED" },
                { title: "Measurement Accuracy", desc: "Tolerance +/- 0.5cm", status: "PENDING" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  {item.status === "PASSED" ? (
                    <Badge variant="success" className="bg-emerald-50 text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                    </Badge>
                  ) : item.status === "FAILED" ? (
                    <Badge variant="destructive" className="bg-red-50 text-red-700 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> FAILED
                    </Badge>
                  ) : (
                    <div className="w-6 h-6 rounded border-2 border-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl text-center">
              <button className="text-sm font-bold text-gray-700 hover:text-gray-900">Add Custom Inspection Point +</button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400" /> Finishing Steps
                </h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><CheckSquare className="w-5 h-5 text-[#42526E]" /></div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Steam Pressing</p>
                    <p className="text-xs text-gray-500">Remove wrinkles and set creases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><CheckSquare className="w-5 h-5 text-[#42526E]" /></div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Anti-static Washing</p>
                    <p className="text-xs text-gray-500">Final rinse with softness agent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><Square className="w-5 h-5 text-gray-300" /></div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Thread Trimming</p>
                    <p className="text-xs text-gray-500">Remove loose ends and lint</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-gray-400" /> Packaging Details
                </h3>
              </div>
              <div className="p-5">
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-4">
                  <span>Step</span>
                  <span>Status</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-900">RFID Tagging</span>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">PENDING</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-900">Care Labeling</span>
                    <Badge variant="success">COMPLETE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-gray-900">Polybagging</span>
                    <Badge variant="outline" className="text-gray-500 bg-gray-100">WAITING</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-600">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Final Payment Trigger</h3>
              <p className="text-sm text-gray-600">
                Release the remaining <span className="font-bold text-gray-900">50% ( $14,250.00 )</span> balance before delivery scheduling.
              </p>
              <button className="w-full py-3 bg-[#42526E] text-white rounded-lg font-bold text-sm hover:bg-[#344563] transition-colors mt-4">
                INVOICE CLIENT
              </button>
            </CardContent>
          </Card>

          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" /> Delivery Scheduling
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Carrier Method</label>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white">
                  <span className="text-sm font-medium">DHL Express Worldwide</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Target Delivery Date</label>
                <div className="flex items-center gap-2">
                  <input type="text" defaultValue="10/25/2024" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium" readOnly />
                  <Info className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Destination:</span>
                  <span className="font-bold">New Jersey Warehouse</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated Cost:</span>
                  <span className="font-bold">$840.00</span>
                </div>
              </div>
              <button className="w-full py-2.5 border border-gray-200 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors mt-2">
                CONFIRM SCHEDULE
              </button>
            </div>
          </Card>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Activity Log</h4>
            <div className="space-y-4 pl-2 border-l-2 border-gray-100 ml-2">
              <div className="relative">
                <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-4 ring-gray-50"></div>
                <p className="text-xs font-bold text-gray-900">Inspection passed by M. Chen</p>
                <p className="text-[10px] text-gray-500">10:45 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 bg-gray-300 rounded-full ring-4 ring-gray-50"></div>
                <p className="text-xs font-bold text-gray-900">Finishing process initiated</p>
                <p className="text-[10px] text-gray-500">09:12 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}