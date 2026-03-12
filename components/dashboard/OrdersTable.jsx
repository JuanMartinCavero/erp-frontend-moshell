// src/components/dashboard/OrdersTable.jsx
import React from 'react';
import { MoreVertical } from "lucide-react";

const OrdersTable = () => {
  const orders = [
    {
      id: "ORD-2024-8812",
      client: "Global Linens Co.",
      clientAvatar: "GL",
      status: "Production",
      priority: "High",
    },
    {
      id: "ORD-2024-8815",
      client: "TexStyle Exports",
      clientAvatar: "TX",
      status: "Quality Check",
      priority: "Medium",
    },
    {
      id: "ORD-2024-8819",
      client: "Wave Fashion",
      clientAvatar: "WF",
      status: "Pending",
      priority: "Medium",
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Production":
        return "bg-blue-50 text-blue-600";
      case "Quality Check":
        return "bg-emerald-50 text-emerald-600";
      case "Pending":
        return "bg-amber-50 text-amber-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-600";
      case "Medium":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
        <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          View All Orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {order.clientAvatar}
                    </div>
                    <span className="text-sm text-slate-600">{order.client}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityStyles(order.priority)}`}>
                    {order.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;