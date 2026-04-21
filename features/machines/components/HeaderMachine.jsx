export default function HeaderMachine() {
  return (
    <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></span>

          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
            placeholder="Buscar máquina..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4"></div>
    </header>
  );
}
