import React from "react";

const HeaderFinance = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-8 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <span className="material-symbols-outlined text-primary">
            payments
          </span>
        </div>

        <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
          Finanzas y Pagos
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>

          <input
            type="text"
            placeholder="Buscar factura, cliente..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
      </div>
    </header>
  );
};

export default HeaderFinance;
