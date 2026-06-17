// src/features/production/pages/ProductionOrderDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, AlertCircle, Users } from "lucide-react";

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

export default function ProductionOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movingPhase, setMovingPhase] = useState(false);
  const [error, setError] = useState(null);

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

      if (response.success) {
        await loadOrder();
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Error al pasar a la siguiente fase");
    } finally {
      setMovingPhase(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-700";
      case "MEDIUM":
        return "bg-blue-100 text-blue-700";
      case "LOW":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getQualityColor = (status) => {
    switch (status) {
      case "PASSED":
        return "bg-green-100 text-green-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      case "REWORK":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Pendiente";
    return new Date(date).toLocaleDateString("es-PE");
  };

  const formatCurrency = (amount) => {
    if (!amount) return "Pendiente";

    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42526E]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => navigate("/production")}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            Volver al pipeline
          </button>
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-96px)] flex flex-col w-full">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/production")}
        className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Volver al pipeline</span>
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {order.order_number}
          </h1>
          <p className="text-gray-500">Orden de producción</p>
        </div>

        <div className="flex gap-2">
          <Badge className={getPriorityColor(order.priority)}>
            {order.priority}
          </Badge>

          <Badge className={getQualityColor(order.quality_status)}>
            Calidad: {order.quality_status || "PENDING"}
          </Badge>
        </div>
      </div>

      {/* Cliente */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Cliente
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="font-semibold">
              {order.technicalSheet?.client?.nombre || "No asignado"}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Empresa: {order.technicalSheet?.client?.empresa || "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cantidad / Fase / Costo */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Cantidad</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{order.quantity} unidades</p>

            <p className="text-sm text-gray-500">Estado: {order.status}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fase Actual</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {order.current_phase?.nombre || "No asignada"}
            </p>

            <p className="text-sm text-gray-500">Progreso: {order.progress}%</p>

            <button
              onClick={handleNextPhase}
              disabled={movingPhase}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
            >
              {movingPhase ? "Moviendo..." : "Pasar a la siguiente fase"}
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Costo Estimado</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(order.technicalSheet?.estimated_cost)}
            </p>

            <p className="text-sm text-gray-500">
              Costo real: {formatCurrency(order.actual_cost)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Fechas */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha estimada
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p>{formatDate(order.estimated_end_date)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inicio real</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{formatDate(order.actual_start_date)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fin real</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{formatDate(order.actual_end_date)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Observaciones */}

      {order.quality_observations && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Observaciones de calidad</CardTitle>
          </CardHeader>

          <CardContent>
            <p>{order.quality_observations}</p>
          </CardContent>
        </Card>
      )}

      {/* Progreso */}

      <Card>
        <CardHeader>
          <CardTitle>Progreso de producción</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Avance general</span>
            <span>{order.progress}%</span>
          </div>

          <Progress value={order.progress} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
