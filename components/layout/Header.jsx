// src/components/layout/Header.jsx
import React from 'react';
import { Search, Bell, Settings } from "lucide-react";
import ImageWithFallback from '../figma/ImageWithFallback'; // Ajusta la ruta según donde lo pongas

const Header = () => {
  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <h1 className="text-xl font-bold text-slate-900 shrink-0">Executive Overview</h1>
        
        <div className="relative flex-1 max-w-[448px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-[18px] h-[18px]" />
          </div>
          <input 
            type="text" 
            placeholder="Search analytics, orders, machines..."
            className="w-full bg-slate-100 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button className="relative w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="w-px h-8 bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-900 leading-none mb-1">James Wilson</span>
            <span className="text-xs text-slate-500 leading-none">COO</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1771050889377-b68415885c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG9mJTIwcHJvZmVzc2lvbmFsJTIwbWFuJTIwd2l0aCUyMGJlYXJkJTIwaW4lMjBvZmZpY2V8ZW58MXx8fHwxNzczMjYwMTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="James Wilson"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;