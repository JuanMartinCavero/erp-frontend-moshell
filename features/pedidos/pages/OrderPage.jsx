import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHeader from "../../pedidos/components/OrderHeader";
import OrderStats from "../../pedidos/components/OrderStats";
import OrderFilters from "../../pedidos/components/OrderFilters";
import OrderTable from "../../pedidos/components/OrderTable";
import OrderPagination from "../../pedidos/components/OrderPagination";
import OrderActivity from "../../pedidos/components/OrderActivity";
import OrderQuickView from "../../pedidos/components/OrderQuickView";
import OrderTabs from "../../pedidos/components/OrderTabs";
import OrderClientTabs from "../../pedidos/components/OrderClientTabs";
import ReordenModal from "../../pedidos/components/ReordenModal";
import OrderFormModal from "../../pedidos/components/OrderFormModal";

import usePedidos from "../../../hooks/usePedidos";

export default function OrderPage() {
  const navigate = useNavigate();

  const {
    pedidos,
    fetchPedidos,
    fetchReorden,
    addPedido,
    loading,
    pagination,
  } = usePedidos();

  const [filtro, setFiltro] = useState("todos");
  const [tipoCliente, setTipoCliente] = useState("todos");

  const [reordenData, setReordenData] = useState(null);
  const [openReordenModal, setOpenReordenModal] = useState(false);

  const [estadoActivo, setEstadoActivo] = useState("Todos");

  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPedidos();
  }, []);

  useEffect(() => {
    if (pedidos.length > 0 && !selectedPedido) {
      setSelectedPedido(pedidos[0]);
    }
  }, [pedidos]);

  const pedidosFiltrados = pedidos.filter((p) => {
    if (filtro === "nacionales" && p.es_internacional) return false;
    if (filtro === "internacionales" && !p.es_internacional) return false;

    if (tipoCliente === "nuevos" && p.es_recurrente) return false;
    if (tipoCliente === "recurrentes" && !p.es_recurrente) return false;

    return true;
  });

  const total = pagination ? pagination.total : pedidos.length;
  const nacionales = pedidos.filter((p) => !p.es_internacional).length;
  const internacionales = pedidos.filter((p) => p.es_internacional).length;

  const recentPedidos = pedidos.slice(0, 5);

  const handleReorden = async (pedido) => {
    try {
      const data = await fetchReorden(pedido.id);

      setReordenData(data);
      setOpenReordenModal(true);
    } catch (error) {
      console.log("Error reorden:", error);
    }
  };
  const handleAddPedido = async (data) => {
    await addPedido(data);
    await fetchPedidos();
  };

  return (
    <div className="p-8 space-y-8">
      <OrderHeader onOpenModal={() => setIsModalOpen(true)} /> <OrderStats />
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-3">
        <OrderTabs
          filtro={filtro}
          setFiltro={setFiltro}
          total={total}
          nacionales={nacionales}
          internacionales={internacionales}
        />

        <OrderClientTabs
          tipoCliente={tipoCliente}
          setTipoCliente={setTipoCliente}
        />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <OrderFilters
          estadoActivo={estadoActivo}
          setEstadoActivo={setEstadoActivo}
          fetchPedidos={fetchPedidos}
        />

        <OrderTable
          pedidos={pedidosFiltrados}
          loading={loading}
          handleReorden={handleReorden}
          onSelectPedido={setSelectedPedido}
        />
        {openReordenModal && (
          <ReordenModal
            data={reordenData}
            onClose={() => setOpenReordenModal(false)}
            addPedido={addPedido}
            refreshPedidos={fetchPedidos}
          />
        )}

        <OrderPagination pagination={pagination} fetchPedidos={fetchPedidos} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <OrderActivity recentPedidos={recentPedidos} />
        <OrderQuickView selectedPedido={selectedPedido} />
      </div>
      <OrderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddPedido}
      />
    </div>
  );
}
