const HeaderFinance = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-8 py-4 bg-background-light dark:bg-background-dark sticky top-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
          Finanzas y Pagos
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar factura, cliente..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
          />
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
      </div>
    </header>
  );
};

export default HeaderFinance;
