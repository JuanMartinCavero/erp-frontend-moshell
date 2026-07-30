import { useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import ProviderStats from "../components/ProviderStats";
import ProviderTable from "../components/ProviderTable";
import ModalProvider from "../components/ModalProvider";
import { useProvider } from "../../../hooks/useProvider";
import ConfirmModal from "../components/ConfirmModal";

export default function ProviderPage() {
  const {
    providers,
    stats,
    addProvider,
    editProvider,
    fetchProviders,
    removeProvider,
  } = useProvider();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerToDelete, setProviderToDelete] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteClick = (provider) => {
    setProviderToDelete(provider);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!providerToDelete) return;

    await removeProvider(providerToDelete.id);

    setIsDeleteOpen(false);
    setProviderToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteOpen(false);
    setProviderToDelete(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchProviders(value);
  };

  const handleCreate = () => {
    setSelectedProvider(null);
    setIsModalOpen(true);
  };

  const handleEdit = (provider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    if (selectedProvider) {
      await editProvider(selectedProvider.id, data);
    } else {
      await addProvider(data);
    }
  };

  return (
    <>
      <ProviderHeader onCreate={handleCreate} />

      <ProviderStats stats={stats} />

      <div className="my-4">
        <input
          type="text"
          placeholder="Buscar por RUC o nombre..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-80 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ProviderTable
        providers={providers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ModalProvider
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        provider={selectedProvider}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Eliminar proveedor"
        message={`¿Está seguro de eliminar el proveedor ${providerToDelete?.razon_social}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteCancel}
      />
    </>
  );
}
