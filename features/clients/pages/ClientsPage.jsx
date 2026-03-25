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
    buscar
  } = useClients();

  const [openModal, setOpenModal] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);

  const total = clientes.length;
  const activos = clientes.filter((c) => c.estado).length;
  const inactivos = clientes.filter((c) => !c.estado).length;
  const internacionales = clientes.filter((c) => c.es_internacional).length;
  const nacionales = clientes.filter((c) => !c.es_internacional).length;

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
      console.log(error);
    }
  };

  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setClienteEdit(null);
  };


  return (
    <div className="p-8 space-y-6">
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
  );
};

export default ClientsPage;
