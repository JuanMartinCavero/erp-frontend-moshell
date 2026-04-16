import { useState } from "react";
import ModalProvider from "../components/ModalProvider";
import { useProvider } from "../../../hooks/useProvider";

export default function ProviderHeader({addProvider}) {
  const [openModal, setOpenModal] = useState(false);

  const handleSave = async (data) => {
    await addProvider(data);
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Directorio de Proveedores
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Gestiona la cadena de suministro y catálogo de materiales.
        </p>
      </div>

      <div>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Nuevo Proveedor
        </button>
        <ModalProvider
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
