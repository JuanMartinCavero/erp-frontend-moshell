import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
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
import PedidoPDF from "../../../src/components/PDF/PedidoPDF";

import usePedidos from "../../../hooks/usePedidos";

export default function OrderPage() {
  const navigate = useNavigate();

  const {
    pedidos,
    fetchPedidos,
    fetchReorden,
    addPedido,
    fetchPedidoDetalle,
    updatePedido,
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
  
  // Estados para el modal de VER (solo lectura)
  const [showViewModal, setShowViewModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  
  // Estados para el modal de EDITAR
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [pedidoToEdit, setPedidoToEdit] = useState(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  useEffect(() => {
    if (pedidos.length > 0 && !selectedPedido) {
      setSelectedPedido(pedidos[0]);
    }
  }, [pedidos]);

  // Función para VER pedido (Ojo) - abre modal de solo lectura
  const handleViewPedido = async (pedido) => {
    try {
      // Obtener detalles completos del pedido
      const pedidoCompleto = await fetchPedidoDetalle(pedido.id);
      setPedidoSeleccionado(pedidoCompleto);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error al obtener detalles:", error);
      // Si falla, usar los datos que tenemos
      setPedidoSeleccionado(pedido);
      setShowViewModal(true);
    }
  };

  // Función para EDITAR pedido (Lápiz)
  const handleEditPedido = (pedido) => {
    setPedidoToEdit(pedido);
    setEditModalOpen(true);
  };

  // Función para guardar después de editar
  const handleEditSuccess = async (data) => {
    try {
      await updatePedido(pedidoToEdit.id, data);
      alert("Pedido actualizado exitosamente");
      setEditModalOpen(false);
      setPedidoToEdit(null);
      fetchPedidos(); // Recargar lista
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el pedido");
    }
  };

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
      <OrderHeader onOpenModal={() => setIsModalOpen(true)} /> 
      <OrderStats />
      
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
          onViewPedido={handleViewPedido}
          onEditPedido={handleEditPedido}
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
      
      {/* Modal para Nuevo Pedido */}
      <OrderFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAddPedido}
        editData={null}
      />

   {/* MODAL PARA VER PEDIDO (SOLO LECTURA) */}
{showViewModal && pedidoSeleccionado && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Detalle del Pedido</h2>
        <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-6">
        {/* Datos del Pedido */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>N° Pedido:</strong> {pedidoSeleccionado.numero_pedido}</p>
              <p><strong>Fecha Pedido:</strong> {pedidoSeleccionado.fecha_pedido}</p>
              <p><strong>Fecha Entrega:</strong> {pedidoSeleccionado.fecha_entrega || '-'}</p>
              <p><strong>Tipo Pedido:</strong> {pedidoSeleccionado.tipo_pedido}</p>
            </div>
            <div>
              <p><strong>Estado:</strong> {pedidoSeleccionado.estado}</p>
              <p><strong>Estado Pago:</strong> {pedidoSeleccionado.estado_pago}</p>
              <p><strong>Subtotal:</strong> S/ {Number(pedidoSeleccionado.subtotal || 0).toFixed(2)}</p>
              <p><strong>Total:</strong> S/ {Number(pedidoSeleccionado.total || 0).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Datos del Cliente */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 bg-gray-100 p-2 rounded">DATOS DEL CLIENTE</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Cliente:</strong> {pedidoSeleccionado.cliente?.nombre || '-'}</p>
              <p><strong>RUC:</strong> {pedidoSeleccionado.cliente?.identificacion_fiscal || '-'}</p>
            </div>
            <div>
              <p><strong>Teléfono:</strong> {pedidoSeleccionado.cliente?.telefono || '-'}</p>
              <p><strong>Dirección:</strong> {pedidoSeleccionado.cliente?.direccion || '-'}</p>
            </div>
          </div>
        </div>

        {/* Detalle de Productos */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 bg-gray-100 p-2 rounded">DETALLE DE PRODUCTOS</h3>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border text-left">Producto</th>
                  <th className="p-2 border text-left">Talla</th>
                  <th className="p-2 border text-left">Color</th>
                  <th className="p-2 border text-right">Cantidad</th>
                  <th className="p-2 border text-right">Precio Unit.</th>
                  <th className="p-2 border text-right">Total</th>
                  <th className="p-2 border text-right">Peso (kg)</th>
                </tr>
              </thead>
              <tbody>
                {(pedidoSeleccionado.detalles || pedidoSeleccionado.items || []).map((detalle, idx) => {
                  const cantidad = Number(detalle.cantidad) || 0;
                  const precio = Number(detalle.precio_unitario) || 0;
                  const totalItem = cantidad * precio;
                  return (
                    <tr key={idx}>
                      <td className="p-2 border">{detalle.producto || '-'}</td>
                      <td className="p-2 border">{detalle.talla || '-'}</td>
                      <td className="p-2 border">{detalle.color || '-'}</td>
                      <td className="p-2 border text-right">{cantidad}</td>
                      <td className="p-2 border text-right">S/ {precio.toFixed(2)}</td>
                      <td className="p-2 border text-right">S/ {totalItem.toFixed(2)}</td>
                      <td className="p-2 border text-right">{detalle.peso || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Observaciones */}
        {pedidoSeleccionado.descripcion && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">OBSERVACIONES</h3>
            <p className="text-gray-700">{pedidoSeleccionado.descripcion}</p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 mt-4">
          <PDFDownloadLink
            document={<PedidoPDF pedido={pedidoSeleccionado} />}
            fileName={`pedido-${pedidoSeleccionado.numero_pedido}.pdf`}
          >
            {({ loading }) => (
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {loading ? "Generando..." : "Exportar PDF"}
              </button>
            )}
          </PDFDownloadLink>
          <button
            onClick={() => setShowViewModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Modal para Editar Pedido */}
      <OrderFormModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setPedidoToEdit(null);
        }}
        onSuccess={handleEditSuccess}
        editData={pedidoToEdit}
      />
    </div>
  );
}