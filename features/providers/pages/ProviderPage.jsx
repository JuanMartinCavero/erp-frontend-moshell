import ProviderHeader from "../components/ProviderHeader";
import ProviderStats from "../components/ProviderStats";
import ProviderTable from "../components/ProviderTable";
import { useProvider } from "../../../hooks/useProvider";

export default function ProviderPage() {
  const { providers,stats, addProvider, removeProvider, editProvider , fetchStats } =
    useProvider();

  return (
    <>
      <ProviderHeader addProvider={addProvider} />

      <ProviderStats stats={stats} />

      <ProviderTable
        providers={providers}
        removeProvider={removeProvider}
        editProvider={editProvider}
      />
    </>
  );
}
