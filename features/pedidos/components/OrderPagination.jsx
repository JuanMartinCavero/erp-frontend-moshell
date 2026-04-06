export default function OrderPagination({ pagination, fetchPedidos }) {
  if (!pagination) return null;

  const { current_page, last_page } = pagination;

  const goToPage = (page) => {
    fetchPedidos({ page });
  };

  return (
    <div className="p-6 border-t border-slate-200 flex items-center justify-between">
      <p className="text-xs text-slate-500">
        Página {current_page} de {last_page}
      </p>

      <div className="flex gap-2">

        <button
          disabled={current_page === 1}
          onClick={() => goToPage(current_page - 1)}
          className="size-8 border rounded"
        >
          ←
        </button>

        {Array.from({ length: last_page }, (_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`size-8 border rounded ${
                current_page === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={current_page === last_page}
          onClick={() => goToPage(current_page + 1)}
          className="size-8 border rounded"
        >
          →
        </button>

      </div>
    </div>
  );
}