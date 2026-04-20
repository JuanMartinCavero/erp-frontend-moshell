// src/features/techsheet/FichaTecnica.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Download, 
  Edit3, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Plus, 
  MessageSquare,
  Building2,
  ChevronRight,
  Upload,
  Loader,
  AlertCircle,
  Send,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import api from "../../services/api";

export default function FichaTecnica() {
  const { id } = useParams(); // ID de la ficha técnica desde la URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [techSheet, setTechSheet] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [pedido, setPedido] = useState(null);
  const [materiales, setMateriales] = useState([]);
  const [workflowStatus, setWorkflowStatus] = useState({
    sample_eval: "PENDING",
    prototype: "PENDING",
    tech_sheet: "IN_REVIEW",
    client_approval: "PENDING"
  });
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSpecs, setEditedSpecs] = useState({});

  // Cargar datos al montar el componente o cuando cambia el ID
  useEffect(() => {
    if (id) {
      loadTechSheet();
    }
  }, [id]);

const loadTechSheet = async () => {
  console.log("1. Iniciando loadTechSheet, ID:", id);
  try {
    setLoading(true);
    setError(null);
    
    console.log("2. Haciendo petición a API...");
    const response = await api.get(`/technical-sheets/${id}`);
    console.log("3. Respuesta recibida:", response);
    
    const data = response.data.data;
    console.log("4. Data extraída:", data);
    
    setTechSheet(data.techSheet);
    setCliente(data.cliente);
    setPedido(data.pedido);
    setMateriales(data.materiales || []);
    setWorkflowStatus(data.workflow_status || workflowStatus);
    
    console.log("5. States actualizados");
    
  } catch (err) {
    console.error("Error en catch:", err);
    setError(err.response?.data?.message || "Error al cargar la ficha técnica");
  } finally {
    console.log("6. Finalizando, setLoading(false)");
    setLoading(false);
  }
};

  const handleSaveSpecs = async () => {
    try {
      const response = await api.put(`/technical-sheets/${id}`, editedSpecs);
      setTechSheet(response.data.data);
      setIsEditing(false);
      setEditedSpecs({});
      alert("Especificaciones guardadas correctamente");
    } catch (err) {
      alert("Error al guardar: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSendToProduction = async () => {
    const quantity = prompt("Ingrese la cantidad a producir:", techSheet?.estimated_quantity || 100);
    if (quantity) {
      try {
        const response = await api.post(`/technical-sheets/${id}/send-to-production`, { quantity: parseInt(quantity) });
        if (response.data.success) {
          alert("✅ Enviado a producción exitosamente");
          loadTechSheet(); // Recargar datos
        }
      } catch (err) {
        alert("Error: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await api.get(`/technical-sheets/${id}/export-pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ficha_tecnica_${techSheet?.reference || id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error al exportar PDF: " + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'COMPLETED': return 'text-emerald-600';
      case 'IN_REVIEW': return 'text-amber-600';
      default: return 'text-gray-400';
    }
  };

  const getWorkflowIcon = (stepKey) => {
    const status = workflowStatus[stepKey];
    if (status === 'COMPLETED') return CheckCircle2;
    if (status === 'IN_REVIEW') return FileText;
    return Clock;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-[#42526E] mx-auto mb-4" />
          <p className="text-gray-600">Cargando ficha técnica...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <div>
                <h3 className="font-bold">Error</h3>
                <p>{error}</p>
                <button 
                  onClick={loadTechSheet}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!techSheet) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <p className="text-gray-500">No se encontró la ficha técnica</p>
      </div>
    );
  }

  const tabs = [
    "Technical Details",
    "Materials & BOM",
    `Prototypes (${techSheet.samples?.length || 0})`,
    "Size Specs"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Product Dev</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Tech Sheets</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{techSheet.name || "Sin nombre"}</h1>
          <p className="text-sm text-gray-500 font-medium">
            Ref: {techSheet.reference} <span className="mx-2">•</span> 
            Season: {techSheet.season || "N/A"} <span className="mx-2">•</span> 
            Client: {cliente?.empresa || cliente?.nombre || "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportPDF}
            className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#42526E] hover:bg-[#344563] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Edit3 className="w-4 h-4" /> {isEditing ? "Cancel Edit" : "Edit Sheet"}
          </button>
        </div>
      </div>

      {/* Workflow Status */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">Workflow Status</h3>
          <div className="relative flex justify-between items-center px-8">
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200">
              <div className="h-full bg-[#42526E]" style={{ 
                width: `${Object.values(workflowStatus).filter(s => s === 'COMPLETED').length * 25}%` 
              }}></div>
            </div>
            
            {[
              { key: "sample_eval", label: "Sample Eval", icon: CheckCircle2 },
              { key: "prototype", label: "Prototype", icon: CheckCircle2 },
              { key: "tech_sheet", label: "Technical Sheet", icon: FileText },
              { key: "client_approval", label: "Client Approval", icon: Clock },
            ].map((step, i) => {
              const status = workflowStatus[step.key] || "PENDING";
              const isActive = status !== "PENDING";
              const IconComponent = step.icon;
              
              return (
                <div key={i} className="relative z-10 flex flex-col items-center bg-white px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                    isActive ? 'bg-[#42526E] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">{step.label}</span>
                  <span className={`text-[10px] font-bold mt-1 uppercase tracking-wider ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <div className="flex gap-8">
        <div className="flex-1 space-y-8">
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-gray-200 px-2">
            {tabs.map((tab, i) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(i)}
                className={`pb-4 text-sm font-semibold transition-colors relative ${
                  activeTab === i ? 'text-[#42526E]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
                {activeTab === i && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#42526E]"></div>}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" /> Base Fabric
                    </h4>
                    {isEditing && (
                      <button className="text-xs font-semibold text-[#42526E] hover:underline">Change</button>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="space-y-4">
                      <input 
                        type="text"
                        value={editedSpecs.composition !== undefined ? editedSpecs.composition : (techSheet.composition || "")}
                        onChange={(e) => setEditedSpecs({...editedSpecs, composition: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="Composition"
                      />
                      <input 
                        type="text"
                        value={editedSpecs.weight !== undefined ? editedSpecs.weight : (techSheet.weight || "")}
                        onChange={(e) => setEditedSpecs({...editedSpecs, weight: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="Weight"
                      />
                      <input 
                        type="text"
                        value={editedSpecs.type !== undefined ? editedSpecs.type : (techSheet.type || "")}
                        onChange={(e) => setEditedSpecs({...editedSpecs, type: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder="Knit Type"
                      />
                      <button 
                        onClick={handleSaveSpecs}
                        className="w-full bg-[#42526E] text-white py-2 rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Composition:</span>
                        <span className="font-semibold">{techSheet.composition || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Weight:</span>
                        <span className="font-semibold">{techSheet.weight || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Knit Type:</span>
                        <span className="font-semibold">{techSheet.type || "N/A"}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-bold mb-6 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-dashed"></div> Colorways
                  </h4>
                  <div className="flex items-center gap-4 flex-wrap">
                    {techSheet.colors && typeof techSheet.colors === 'string' && (
                      JSON.parse(techSheet.colors).map((color, idx) => (
                        <div 
                          key={idx}
                          className="w-10 h-10 rounded-full shadow-inner ring-2 ring-white ring-offset-1"
                          style={{ backgroundColor: typeof color === 'string' ? color : color.code || '#CCCCCC' }}
                          title={typeof color === 'string' ? color : color.name}
                        ></div>
                      ))
                    )}
                    {techSheet.colors && Array.isArray(techSheet.colors) && (
                      techSheet.colors.map((color, idx) => (
                        <div 
                          key={idx}
                          className="w-10 h-10 rounded-full shadow-inner ring-2 ring-white ring-offset-1"
                          style={{ backgroundColor: typeof color === 'string' ? color : color.code || '#CCCCCC' }}
                          title={typeof color === 'string' ? color : color.name}
                        ></div>
                      ))
                    )}
                    {(!techSheet.colors || (Array.isArray(techSheet.colors) && techSheet.colors.length === 0)) && (
                      <p className="text-gray-500 text-sm">No hay colores definidos</p>
                    )}
                    {isEditing && (
                      <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors">
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold">Materiales y BOM</h4>
                  {isEditing && (
                    <button className="text-xs font-semibold text-[#42526E] hover:underline">
                      + Agregar Material
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {materiales.length > 0 ? (
                    materiales.map((material, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{material.name}</p>
                          <p className="text-xs text-gray-500">
                            Requerido: {material.required} {material.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${
                            material.available >= material.required ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {material.available >= material.required ? 'Disponible' : 'Stock bajo'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Disponible: {material.available} {material.unit}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No hay materiales definidos para esta ficha técnica</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Prototype History</CardTitle>
                <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> New Version
                </button>
              </CardHeader>
              <CardContent className="space-y-4 mt-4">
                {techSheet.samples && techSheet.samples.length > 0 ? (
                  techSheet.samples.map((sample, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition-shadow cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          sample.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {sample.status === 'APPROVED' ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Prototype {sample.version} ({sample.type})</h5>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {sample.evaluated_by ? `Evaluated by ${sample.evaluated_by} • ` : ''}
                            {sample.evaluated_at ? new Date(sample.evaluated_at).toLocaleDateString() : new Date(sample.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={sample.status === 'APPROVED' ? 'success' : 'warning'}>
                          {sample.status}
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay prototipos registrados</p>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 3 && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-bold mb-4">Size Specifications</h4>
                {techSheet.size_specs ? (
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto">
                    {typeof techSheet.size_specs === 'string' 
                      ? JSON.stringify(JSON.parse(techSheet.size_specs), null, 2)
                      : JSON.stringify(techSheet.size_specs, null, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-500 text-center py-8">No hay especificaciones de tallas definidas</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Reference Images */}
          <div>
            <h3 className="text-lg font-bold mb-4">Reference Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {techSheet.images && typeof techSheet.images === 'string' && (
                JSON.parse(techSheet.images).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img src={img} className="w-full h-full object-cover" alt="Reference" />
                  </div>
                ))
              )}
              {techSheet.images && Array.isArray(techSheet.images) && (
                techSheet.images.map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img src={img} className="w-full h-full object-cover" alt="Reference" />
                  </div>
                ))
              )}
              <button className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          <Card className="bg-[#42526E] text-white border-none shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-blue-100 mb-6">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Production Status</span>
              </div>
              {techSheet.development_status === 'IN_PRODUCTION' ? (
                <div className="text-center">
                  <p className="text-sm mb-2">🎉 En producción</p>
                  {techSheet.production_order_id && (
                    <p className="text-xs text-blue-200">Orden #{techSheet.production_order_id}</p>
                  )}
                </div>
              ) : (
                <>
                  <button 
                    onClick={handleSendToProduction}
                    className="w-full bg-white text-[#42526E] py-3 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-colors mb-4 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> SEND TO PRODUCTION
                  </button>
                  <p className="text-xs text-blue-200 text-center">
                    Costo estimado: ${techSheet.estimated_cost?.toLocaleString() || 'N/A'}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Detail</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{cliente?.empresa || cliente?.nombre || "N/A"}</h4>
                  <p className="text-sm text-gray-500">{cliente?.ciudad || cliente?.pais || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Manager:</span>
                  <span className="font-semibold">{techSheet.account_manager || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Contact:</span>
                  <button className="font-semibold text-[#42526E] flex items-center gap-1 hover:underline">
                    <MessageSquare className="w-3 h-3" /> Message
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Info</p>
            </CardHeader>
            <CardContent>
              {pedido ? (
                <div className="space-y-2">
                  <p className="text-sm"><span className="text-gray-500">Pedido #:</span> {pedido.id}</p>
                  <p className="text-sm"><span className="text-gray-500">Cantidad:</span> {pedido.cantidad || techSheet.estimated_quantity}</p>
                  <p className="text-sm"><span className="text-gray-500">Estado:</span> {pedido.estado || "N/A"}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay pedido asociado</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}