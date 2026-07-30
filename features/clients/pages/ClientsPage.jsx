import React, { useEffect, useState } from "react";
import useClients from "../../../hooks/useClients";

import ClientsHeader from "../components/ClientsHeader";
import ClientsFilters from "../components/ClientsFilters";
import ClientsStats from "../components/ClientsStats";
import ClientsTable from "../components/ClientsTable";
import ClientsModal from "../components/ClientsModal";

const ClientsPage = () => {
  const {
    clientes,
    loading,
    removeCliente,
    activar,
    fetchClientes,
    addCliente,
    editCliente,
    buscar,
  } = useClients();

  const [openModal, setOpenModal] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSave = async (data) => {
    try {
      if (clienteEdit) {
        await editCliente(clienteEdit.id, data);
      } else {
        await addCliente(data);
      }

      setOpenModal(false);
      setClienteEdit(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setClienteEdit(null);
    setOpenModal(false);
  };

  const total = clientes.length;
  const activos = clientes.filter((c) => c.estado).length;
  const inactivos = total - activos;
  const internacionales = clientes.filter((c) => c.es_internacional).length;
  const nacionales = total - internacionales;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full p-8 space-y-8">
        <ClientsHeader onNew={() => setOpenModal(true)} />

        <ClientsStats
          total={total}
          activos={activos}
          inactivos={inactivos}
          internacionales={internacionales}
          nacionales={nacionales}
        />

        <ClientsFilters onSearch={buscar} />

        <ClientsTable
          clientes={clientes}
          loading={loading}
          onDelete={removeCliente}
          onActivate={activar}
          onEdit={handleEdit}
        />

        <ClientsModal
          isOpen={openModal}
          onClose={handleCloseModal}
          onSave={handleSave}
          clienteEdit={clienteEdit}
        />
      </div>
    </div>
  );
};

export default ClientsPage;
