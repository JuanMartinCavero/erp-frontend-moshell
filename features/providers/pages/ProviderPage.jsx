import { useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import ProviderStats from "../components/ProviderStats";
import ProviderTable from "../components/ProviderTable";
import ModalProvider from "../components/ModalProvider";
import { useProvider } from "../../../hooks/useProvider";

export default function ProviderPage() {
  const { providers, stats, addProvider, editProvider } = useProvider();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

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

      <ProviderTable
        providers={providers}
        onEdit={handleEdit}
      />

      <ModalProvider
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        provider={selectedProvider}
      />
    </>
  );
}