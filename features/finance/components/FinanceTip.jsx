export default function FinanceTip() {

  return (
    <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">

      <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">
          lightbulb
        </span>
        Consejo Financiero
      </h4>

      <p className="text-xs text-slate-600 dark:text-slate-300">
        Se observa un incremento del tiempo medio de cobro. 
        Considere ofrecer descuentos por pronto pago.
      </p>

    </div>
  );
}