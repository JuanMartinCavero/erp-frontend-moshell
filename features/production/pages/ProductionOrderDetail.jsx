import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  AlertCircle,
  Users,
  Package,
  DollarSign,
  Download,
} from "lucide-react";

import { productionApi } from "../../../services/productionApi";
import { nextPhase } from "../../../services/productionTracking";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Progress } from "../../../components/ui/Progress";

// ✅ Importación para PDF
import { pdf } from "@react-pdf/renderer";
import { OrdenProduccionPDF } from "../../../components/OrdenProduccionPDF"; // Ajusta la ruta según tu estructura
import api from "../../../services/api";

export default function ProductionOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movingPhase, setMovingPhase] = useState(false);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await productionApi.getOrder(id);

      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar la orden");
    } finally {
      setLoading(false);
    }
  };

  const handleNextPhase = async () => {
    try {
      setMovingPhase(true);
      const response = await nextPhase(order.id);

      if (response.success) await loadOrder();
      else alert(response.message);
    } catch {
      alert("Error al pasar a la siguiente fase");
    } finally {
      setMovingPhase(false);
    }
  };

  const [starting, setStarting] = useState(false);

  const handleStartProduction = async () => {
    try {
      setStarting(true);
      const response = await productionApi.startProduction(order.id);

      if (response.data.success) {
        await loadOrder();
      } else {
        alert(response.data.message || "No se pudo iniciar la producción");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error al iniciar la producción");
    } finally {
      setStarting(false);
    }
  };

  // ✅ Función para exportar PDF
  // ProductionOrderDetail.jsx - handleExportPDF

  const handleExportPDF = async () => {
    try {
      setExporting(true);

      if (!order) {
        alert("No hay datos para exportar");
        return;
      }

      // ✅ Obtener el pedido y sus detalles
      let pedido = order?.technicalSheet?.pedido;
      let detalles = pedido?.detalles || [];

      // ✅ Si no hay detalles, hacer una llamada adicional para obtenerlos
      if (!detalles.length && order?.technicalSheet?.pedido_id) {
        try {
          const response = await api.get(
            `/pedidos/${order.technicalSheet.pedido_id}`,
          );
          pedido = response.data;
          detalles = pedido?.detalles || [];
        } catch (err) {
          console.warn("No se pudieron cargar los detalles del pedido:", err);
        }
      }

      // ✅ Si aún no hay detalles, intentar con la relación desde technicalSheet
      if (!detalles.length && order?.technicalSheet) {
        try {
          const tsResponse = await api.get(
            `/technical-sheets/${order.technicalSheet.id}`,
          );
          const tsData = tsResponse.data.data;
          pedido = tsData?.pedido;
          detalles = pedido?.detalles || [];
        } catch (err) {
          console.warn(
            "No se pudieron cargar los detalles desde technical-sheets:",
            err,
          );
        }
      }

      // ✅ Transformar detalles a productos para el PDF
      const productos = detalles.map((detalle) => ({
        modelo: detalle.producto || "-",
        descripcion:
          `${detalle.color || ""} ${detalle.talla || ""}`.trim() || "-",
        talla_s: detalle.talla === "S" ? detalle.cantidad : "-",
        talla_m: detalle.talla === "M" ? detalle.cantidad : "-",
        talla_l: detalle.talla === "L" ? detalle.cantidad : "-",
        unidad: detalle.cantidad || 0,
        precio: detalle.precio_unitario || 0,
        total: (detalle.cantidad || 0) * (detalle.precio_unitario || 0),
      }));

      const cliente =
        order?.technicalSheet?.client || order?.technicalSheet?.cliente;

      // ✅ Generar el PDF
      const blob = await pdf(
        <OrdenProduccionPDF
          orden={order}
          productos={productos}
          materiales={[]}
          cliente={cliente}
          pedido={pedido}
          logoBase64={null}
        />,
      ).toBlob();

      // Crear URL de descarga
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = `orden_produccion_${order.order_number || order.id}.pdf`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Error al generar el PDF: " + error.message);
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Sin programar";
    const [y, m, d] = date.split("-");
    return new Date(y, m - 1, d).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "S/ 0.00";
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  const priorityStyle = {
    HIGH: "bg-red-100 text-red-700 border-red-200",
    MEDIUM: "bg-blue-100 text-blue-700 border-blue-200",
    LOW: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const qualityStyle = {
    PASSED: "bg-green-100 text-green-700 border-green-200",
    FAILED: "bg-red-100 text-red-700 border-red-200",
    REWORK: "bg-yellow-100 text-yellow-700 border-yellow-200",
    PENDING: "bg-gray-100 text-gray-700 border-gray-200",
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-2 border-gray-300 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="mx-auto mb-3 text-red-500" />
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => navigate("/production")}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <button
            onClick={() => navigate("/production")}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>

          <h1 className="text-2xl font-bold">{order.order_number}</h1>
          <p className="text-gray-500">Orden de producción</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* ✅ Botón Exportar PDF */}
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="px-4 py-2 bg-[#1A3A5C] text-white rounded-lg hover:bg-[#2D4A6C] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {exporting ? "Generando..." : "Exportar PDF"}
          </button>

          <span
            className={`px-3 py-1 rounded-full text-sm border ${priorityStyle[order.priority]}`}
          >
            {order.priority}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm border ${qualityStyle[order.quality_status || "PENDING"]}`}
          >
            Calidad: {order.quality_status || "PENDING"}
          </span>
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* CLIENTE */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">
              {order.technicalSheet?.client?.nombre || "Sin cliente"}
            </p>
            <p className="text-sm text-gray-500">
              {order.technicalSheet?.client?.empresa || "Sin empresa"}
            </p>
          </CardContent>
        </Card>

        {/* CANTIDAD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Cantidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{order.quantity ?? 0}</p>
            <p className="text-sm text-gray-500">unidades</p>
          </CardContent>
        </Card>

        {/* COSTO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Costo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {formatCurrency(order.technicalSheet?.estimated_cost)}
            </p>
            <p className="text-sm text-gray-500">
              Real: {formatCurrency(order.actual_cost)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FASE + PROGRESO */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de producción</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <p className="font-semibold text-lg">
                Fase: {order.current_phase?.nombre || "Sin fase"}
              </p>
              <p className="text-sm text-gray-500">Progreso general</p>
            </div>

            {/* RENDERIZADO CONDICIONAL DE BOTONES Y ESTADOS */}
            {!order.actual_start_date ? (
              /* 1. Si no ha iniciado: mostrar "Iniciar Producción" */
              <button
                onClick={handleStartProduction}
                disabled={starting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {starting ? "Iniciando..." : "Iniciar Producción"}
              </button>
            ) : order.actual_end_date ? (
              /* 2. Si YA finalizó (actual_end_date existe): bloquear y mostrar estado concluido */
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-gray-400 text-white rounded-lg">
                  Última fase
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 border border-green-200">
                  Pedido concluido
                </span>
              </div>
            ) : (
              /* 3. Si está en curso: permitir hacer clic para avanzar o finalizar */
              <button
                onClick={handleNextPhase}
                disabled={movingPhase}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {movingPhase
                  ? "Actualizando..."
                  : order.is_last_phase
                    ? "Finalizar pedido"
                    : "Avanzar fase"}
              </button>
            )}
          </div>

          <Progress value={order.progress ?? 0} className="h-3" />

          <p className="text-sm text-gray-500 text-right">
            {order.progress ?? 0}% completado
          </p>
        </CardContent>
      </Card>

      {/* FECHAS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fecha Estimada de Entrega</CardTitle>
          </CardHeader>
          <CardContent>{formatDate(order.estimated_end_date)}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fecha Inicio</CardTitle>
          </CardHeader>
          <CardContent>{formatDate(order.actual_start_date)}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fecha Finalizado</CardTitle>
          </CardHeader>
          <CardContent>{formatDate(order.actual_end_date)}</CardContent>
        </Card>
      </div>

      {/* OBSERVACIONES */}
      {order.quality_observations && (
        <Card>
          <CardHeader>
            <CardTitle>Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{order.quality_observations}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
