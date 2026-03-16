// src/components/layout/Sidebar.jsx
import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Factory,
  ShieldCheck,
  ShieldUser,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center shrink-0">
          <Factory className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-600 font-bold text-lg leading-tight">
            TexFlow
          </span>
          <span className="text-slate-500 text-xs">Enterprise ERP</span>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${
              isActive
                ? "bg-slate-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <LayoutDashboard className="w-[18px] h-[18px]" />
          Dashboard
        </NavLink>
          
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm"
        >
          <ShoppingCart className="w-[18px] h-[18px]" />
          Orders
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm"
        >
          <Package className="w-[18px] h-[18px]" />
          Inventory
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm"
        >
          <Factory className="w-[18px] h-[18px]" />
          Production
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm"
        >
          <ShieldCheck className="w-[18px] h-[18px]" />
          Quality Control
        </a>
        <NavLink
          to="/admin/roles"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm ${
              isActive
                ? "bg-slate-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <ShieldUser className="w-[18px] h-[18px]" />
          Roles
        </NavLink>
      </nav>

      <div className="p-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
            System Status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
