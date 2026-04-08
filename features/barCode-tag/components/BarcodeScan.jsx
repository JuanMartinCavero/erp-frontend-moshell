export default function BarcodeScan() {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            qr_code_scanner
          </span>
          Escaneo en Tiempo Real
        </h3>
        <div className="flex items-center gap-1">
          <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-slate-500">Activo</span>
        </div>
      </div>
      <div className="relative flex-1 bg-slate-900 rounded-lg overflow-hidden min-h-[250px]">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558583082-409143c794ca?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-32 border-2 border-primary rounded relative">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-white -m-1 rounded-tl"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-white -m-1 rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-white -m-1 rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-white -m-1 rounded-br"></div>
            <div className="absolute left-0 w-full h-0.5 bg-primary/90 shadow-[0_0_10px_rgba(69,87,104,0.6)] top-1/2 animate-pulse"></div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-xs">
          <div className="bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border border-white/20">
            <span className="material-symbols-outlined text-[12px]">
              settings_overscan
            </span>
            Auto focus
          </div>
          <button className="bg-white/20 hover:bg-white/30 p-1.5 rounded transition-all">
            <span className="material-symbols-outlined text-sm">flash_on</span>
          </button>
        </div>
      </div>
      <div className="mt-3 p-2.5 bg-primary/10 rounded-lg border border-primary/20 flex items-center gap-2">
        <div className="size-7 bg-primary rounded flex items-center justify-center text-white text-sm">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <div className="text-xs">
          <p className="font-bold text-slate-900 dark:text-slate-100">
            HL-98231
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Detectado hace 2 min
          </p>
        </div>
      </div>
    </section>
  );
}
