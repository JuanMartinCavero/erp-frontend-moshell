// src/features/pipeline/Pipeline.jsx
import React from "react";
import { MoreHorizontal, Plus, Filter, ArrowDownUp } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";

const pipelineData = {
  columns: [
    {
      id: "col-1",
      title: " DISEÑO",
      count: 3,
      cards: [
        {
          id: "#TX-2024-001",
          priority: "HIGH",
          client: "Nordic Threads S.A.",
          desc: "Autumn Collection: Merino Blend Knit",
          progress: 10,
          progressColor: "bg-[#42526E]",
        },
        {
          id: "#TX-2024-005",
          priority: "MEDIUM",
          client: "Global Fashion Retail",
          desc: "Basic Tee Production (Bulk)",
          progress: 5,
          progressColor: "bg-[#42526E]",
        }
      ]
    },
    {
      id: "col-2",
      title: "TEJIDO",
      count: 2,
      cards: [
        {
          id: "#TX-2024-012",
          priority: "LOW",
          client: "Urban Wear Inc.",
          desc: "Prototype Stage: V-Neck Samples",
          alert: { type: "warning", text: "Pending Tech Sheet Approval" },
          progress: 25,
          progressColor: "bg-[#42526E]",
        }
      ]
    },
    {
      id: "col-3",
      title: "PLATILLADO",
      count: 4,
      cards: [
        {
          id: "#TX-2024-008",
          priority: "HIGH",
          client: "Peak Outfitters",
          desc: "Dyeing Phase: Forest Green Lots",
          alert: { type: "destructive", text: "Stock Alert: Pigment Low" },
          progress: 40,
          progressColor: "bg-red-500",
        }
      ]
    },
    {
      id: "col-1",
      title: "ACABDO",
      count: 3,
      cards: [
        {
          id: "#TX-2024-001",
          priority: "HIGH",
          client: "Nordic Threads S.A.",
          desc: "Autumn Collection: Merino Blend Knit",
          progress: 10,
          progressColor: "bg-[#42526E]",
        },
        {
          id: "#TX-2024-005",
          priority: "MEDIUM",
          client: "Global Fashion Retail",
          desc: "Basic Tee Production (Bulk)",
          progress: 5,
          progressColor: "bg-[#42526E]",
        }
      ]
    },
    {
      id: "col-2",
      title: "lAVADO",
      count: 2,
      cards: [
        {
          id: "#TX-2024-012",
          priority: "LOW",
          client: "Urban Wear Inc.",
          desc: "Prototype Stage: V-Neck Samples",
          alert: { type: "warning", text: "Pending Tech Sheet Approval" },
          progress: 25,
          progressColor: "bg-[#42526E]",
        }
      ]
    },
    {
      id: "col-3",
      title: "VAPORIZADO",
      count: 4,
      cards: [
        {
          id: "#TX-2024-008",
          priority: "HIGH",
          client: "Peak Outfitters",
          desc: "Dyeing Phase: Forest Green Lots",
          alert: { type: "destructive", text: "Stock Alert: Pigment Low" },
          progress: 40,
          progressColor: "bg-red-500",
        }
      ]
    },
    {
      id: "col-1",
      title: "ETIQUETADO",
      count: 3,
      cards: [
        {
          id: "#TX-2024-001",
          priority: "HIGH",
          client: "Nordic Threads S.A.",
          desc: "Autumn Collection: Merino Blend Knit",
          progress: 10,
          progressColor: "bg-[#42526E]",
        },
        {
          id: "#TX-2024-005",
          priority: "MEDIUM",
          client: "Global Fashion Retail",
          desc: "Basic Tee Production (Bulk)",
          progress: 5,
          progressColor: "bg-[#42526E]",
        }
      ]
    },
    {
      id: "col-2",
      title: "ENTREGADO",
      count: 2,
      cards: [
        {
          id: "#TX-2024-012",
          priority: "LOW",
          client: "Urban Wear Inc.",
          desc: "Prototype Stage: V-Neck Samples",
          alert: { type: "warning", text: "Pending Tech Sheet Approval" },
          progress: 25,
          progressColor: "bg-[#42526E]",
        }
      ]
    },
    
  ]
};

export default function Pipeline() {
  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-gray-500 uppercase tracking-wider">FILTERS:</span>
          <button className="px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm font-semibold text-gray-700 hover:bg-gray-50">All Orders</button>
          <button className="px-4 py-1.5 rounded-full border border-gray-200 bg-transparent font-medium text-gray-500 hover:bg-gray-50">High Priority</button>
          <button className="px-4 py-1.5 rounded-full border border-gray-200 bg-transparent font-medium text-gray-500 hover:bg-gray-50">Late Orders</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> 2 Delayed</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 18 Active</span>
          </div>
          <div className="h-5 w-px bg-gray-300"></div>
          <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900">
            <Filter className="w-4 h-4" /> Sort
          </button>
          <button className="bg-[#42526E] hover:bg-[#344563] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-x-auto pb-4">
        {pipelineData.columns.map((column) => (
          <div key={column.id} className="w-[360px] flex-shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 uppercase tracking-tight">{column.title}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-md">{column.count}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              {column.cards.map((card, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{card.id}</span>
                    <Badge
                      variant={
                        card.priority === "HIGH" ? "destructive" : 
                        card.priority === "MEDIUM" ? "secondary" : 
                        "outline"
                      }
                      className={
                        card.priority === "MEDIUM" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""
                      }
                    >
                      {card.priority}
                    </Badge>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 text-base mb-1">{card.client}</h4>
                  <p className="text-sm text-gray-500 mb-4">{card.desc}</p>

                  {card.alert && (
                    <div className={`mb-4 text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-2 ${
                      card.alert.type === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {card.alert.text}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2">
                    <span>Progress</span>
                    <span>{card.progress}%</span>
                  </div>
                  <Progress value={card.progress} indicatorColor={card.progressColor} className="bg-gray-100 h-1.5" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}