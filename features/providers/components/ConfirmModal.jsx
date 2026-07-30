export default function ConfirmModal({
  isOpen,
  title = "Confirmar acción",
  message = "¿Está seguro de continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl">
        {/* Header */}
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-medium 
                       bg-slate-100 hover:bg-slate-200
                       dark:bg-slate-700 dark:hover:bg-slate-600
                       text-slate-700 dark:text-slate-200"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl px-4 py-2 text-sm font-medium
                       bg-red-600 hover:bg-red-700
                       text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
