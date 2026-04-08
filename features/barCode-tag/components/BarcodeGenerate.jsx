export default function BarcodeGenerate() {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full w-full">
      <div className="flex flex-col items-start justify-between h-full">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">
              label
            </span>
            Generar Código de Barras
          </h3>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors self-start">
          <span className="material-symbols-outlined text-sm">print</span>
          Imprimir Lote
        </button>
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 flex-1 w-full flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-100 dark:border-slate-800 max-w-xs flex flex-col items-center w-full">
            <div className="w-full border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 text-center">
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">
                TextilERP Material Tag
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Algodón Premium Pima
              </h4>
              <p className="text-xs text-slate-500 text-[10px]">
                Categoría: Hilos de Urdimbre
              </p>
            </div>
            <div className="flex justify-between w-full mb-4">
              <div className="space-y-1">
                <div>
                  <p className="text-[8px] uppercase text-slate-400 font-bold">
                    Lote No.
                  </p>
                  <p className="text-xs font-mono font-bold">HL-98234</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase text-slate-400 font-bold">
                    Fecha Gen.
                  </p>
                  <p className="text-[10px]">24/05/2024</p>
                </div>
              </div>
              <div className="size-12 bg-white p-1 border border-slate-200 flex-shrink-0">
                <img
                  alt="QR Code"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCIFn2o4vf_Owy3Rs07c-tCW48ehu5Mgir1AHeevZtyS4dxAhVPejQNTf17yk51vANLzZ2eTIBmIL_7U5W5jQKSCcktKkb2ZdFiIrcieIo1I_TxLO0bStTEnMrrJmAmigRJa-ksQ8xnAAKLISeWEO7PQkJX9SECeU_TD2vtf84Xvx3218Wbl8AwR3pzw18324j1rPrQKd6rAvwutgOIydZLb4yk9QKYLZyWdZ8ybEvhDVJy56RiIti_YR1iCTxhjA4wxnDC085kREO"
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-1">
              <img
                alt="Barcode"
                className="h-8 w-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtLuI5IudXWV_UHVBJMq-LNTpomex4G_sOsGjK04UhXLpnnZWRkcEBVJ9ttttQH7tfg2jJBdWKZ9DnJBq4sAy6gzYaCWGVtcJWokDlBlVVOaFS434HUyvCrbGYYNWKFnlw2K7msMILygnZF6L3nEVPLfvTjOZjGjVws6qaGMbjGXkNqX45diT4Jo9SP7LVztVDIyT-Pg7_WKoBdnofAFJZNeiDBlhiSHAHLcwNzQYNOjbUjX1DzEtTmXEyxMYetfCswX9zaj_8OHgX"
              />
              <p className="text-[9px] font-mono tracking-[0.3em]">HL98234</p>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-3 mt-auto">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Seleccionar Material
            </label>
            <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded text-xs py-1 px-2">
              <option>Algodón Premium Pima</option>
              <option>Lana Merino 100%</option>
              <option>Poliéster Reciclado</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Cantidad
            </label>
            <input
              className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded text-xs py-1 px-2"
              type="number"
              defaultValue="1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
