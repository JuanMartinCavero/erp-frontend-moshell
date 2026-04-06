// src/features/inventory/Inventory.jsx
import React from "react";
import { 
  Package, 
  Truck, 
  PlusSquare, 
  History, 
  Users, 
  ShoppingCart, 
  BarChart, 
  AlertTriangle,
  Plus,
  Download,
  ListFilter,
  LayoutGrid
} from "lucide-react";
import { Card, CardContent } from "../../../erp-frontend-moshell/components/ui/Card";
import { Badge } from "../../../erp-frontend-moshell/components/ui/Badge";

export function Inventory() {
  return (
    <div className="p-8 overflow-y-auto">
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                <Package className="w-4 h-4" />
              </div>
              <Badge variant="success" className="bg-emerald-50 text-emerald-700">+2%</Badge>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total SKUs</p>
            <h3 className="text-2xl font-bold text-gray-900">1,240</h3>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-red-600">+5 alerts</span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Low Stock Alerts</p>
            <h3 className="text-2xl font-bold text-gray-900">12</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Truck className="w-4 h-4" />
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Warehouse Receptions</p>
            <h3 className="text-2xl font-bold text-gray-900">08</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-emerald-600">82% fill</span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Purchase Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">34</h3>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button className="bg-[#42526E] hover:bg-[#344563] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Material Entry
          </button>
          <button className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
          <button className="p-1.5 bg-gray-100 rounded text-gray-900">
            <ListFilter className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-900">
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Table Area */}
        <div className="flex-1 space-y-6">
          <Card>
            <div className="p-6 pb-0 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Current Inventory</h3>
              <div className="flex gap-3">
                <Badge variant="destructive" className="bg-red-50 text-red-700">● Low Pigment</Badge>
                <Badge variant="warning" className="bg-amber-50 text-amber-700">● Low Thread</Badge>
              </div>
            </div>
            <div className="p-0 mt-6 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-gray-500 uppercase font-bold border-y border-gray-100 bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 tracking-wider">Material Info</th>
                    <th className="px-6 py-4 tracking-wider">Category</th>
                    <th className="px-6 py-4 tracking-wider">Stock</th>
                    <th className="px-6 py-4 tracking-wider">Min Level</th>
                    <th className="px-6 py-4 tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">Crimson Reactive Dye (RG-4)</p>
                      <p className="text-xs text-gray-500">SKU: CHM-PIG-0042</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">Pigments</td>
                    <td className="px-6 py-4 font-bold text-gray-900">12.5 kg</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">50 kg</td>
                    <td className="px-6 py-4">
                      <Badge variant="destructive" className="bg-red-50 text-red-700 font-bold uppercase">Low Stock</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">Egyptian Cotton Thread 40/2</p>
                      <p className="text-xs text-gray-500">SKU: YRN-COT-2011</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">Yarn</td>
                    <td className="px-6 py-4 font-bold text-gray-900">420 Spools</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">200 Spools</td>
                    <td className="px-6 py-4">
                      <Badge variant="success" className="bg-emerald-50 text-emerald-700 font-bold uppercase">Optimal</Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">Polyester Fiber - Snow White</p>
                      <p className="text-xs text-gray-500">SKU: YRN-POL-5541</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">Synthetics</td>
                    <td className="px-6 py-4 font-bold text-gray-900">85 Spools</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">100 Spools</td>
                    <td className="px-6 py-4">
                      <Badge variant="warning" className="bg-amber-50 text-amber-700 font-bold uppercase">Reorder</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 border-t border-gray-100 text-center">
                <button className="text-sm font-bold text-gray-600 hover:text-gray-900">View All Materials (1,240)</button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Kardex Transactions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Reception - PO #9921</p>
                      <p className="text-xs text-gray-500">Global Chemical Corp • 14:20 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">+250 kg</p>
                    <p className="text-xs text-gray-500">Indigo Pigment</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Issue to Production #221-B</p>
                      <p className="text-xs text-gray-500">Dyeing Dept • 11:05 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">-15.5 kg</p>
                    <p className="text-xs text-gray-500">Crimson Reactive Dye</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar Area */}
        <div className="w-80 space-y-6">
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-400" /> Pending Receptions
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm text-gray-900">SHIP-2023-014</p>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-[10px]">IN TRANSIT</Badge>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-0.5">Fine Cotton Trading Co.</p>
                <p className="text-xs text-gray-500 mb-2">2,000kg Pima Cotton Bales</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <History className="w-3 h-3" /> ETA: Oct 28, 2023
                </p>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm text-gray-900">SHIP-2023-018</p>
                  <Badge variant="warning" className="text-[10px]">DELAYED</Badge>
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-0.5">Synthetic Fibers Inc.</p>
                <p className="text-xs text-gray-500 mb-2">450 Spools Recycled Poly</p>
                <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3 h-3" /> ETA: Pending Update
                </p>
              </div>
              <button className="w-full py-2 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">
                Manage Receptions
              </button>
            </div>
          </Card>

          <Card>
            <div className="p-6 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Top Suppliers</h3>
              <a href="#" className="text-xs font-bold text-gray-500 hover:text-gray-900">View List</a>
            </div>
            <div className="px-6 pb-6 space-y-4">
              {[
                { name: "Global Chemicals", desc: "Pigments & Auxiliaries", rating: 4.9, initial: "GC" },
                { name: "Modern Textiles", desc: "Cotton & Linens", rating: 4.7, initial: "MT" },
                { name: "EuroLink Logistics", desc: "Freight & Customs", rating: 4.2, initial: "EL" },
              ].map((sup, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center text-sm">
                    {sup.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{sup.name}</p>
                    <p className="text-xs text-gray-500 truncate">{sup.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                    <span className="text-amber-400">★</span> {sup.rating}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}