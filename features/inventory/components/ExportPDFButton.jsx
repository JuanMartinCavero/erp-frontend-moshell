import React, { useState } from "react";
import { Download } from "lucide-react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: { 
    padding: 20, 
    fontSize: 9,
    fontFamily: "Helvetica"
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 8, 
    textAlign: "center" 
  },
  subtitle: { 
    fontSize: 11, 
    marginBottom: 15, 
    textAlign: "center", 
    color: "#555" 
  },
  table: { 
    display: "flex", 
    flexDirection: "column", 
    width: "100%",
    marginTop: 10
  },
  headerRow: { 
    flexDirection: "row", 
    borderBottom: "2px solid #000", 
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold"
  },
  row: { 
    flexDirection: "row", 
    borderBottom: "1px solid #e0e0e0", 
    paddingVertical: 4 
  },
  cell: { 
    flex: 1, 
    paddingHorizontal: 3,
    fontSize: 8
  },
  cellSmall: { 
    flex: 0.6, 
    paddingHorizontal: 3,
    fontSize: 8
  },
  cellMedium: { 
    flex: 0.8, 
    paddingHorizontal: 3,
    fontSize: 8
  },
  cellHeader: { 
    flex: 1, 
    paddingHorizontal: 3, 
    fontWeight: "bold",
    fontSize: 8
  },
  cellHeaderSmall: { 
    flex: 0.6, 
    paddingHorizontal: 3, 
    fontWeight: "bold",
    fontSize: 8
  },
  footer: {
    marginTop: 20,
    fontSize: 8,
    textAlign: "center",
    color: "#999"
  }
});

// Columnas del PDF
const columns = [
  { key: "fecha", label: "FECHA", size: "cell" },
  { key: "lote", label: "LOTE", size: "cellSmall" },
  { key: "calidad", label: "CALIDAD", size: "cell" },
  { key: "color", label: "COLOR", size: "cell" },
  { key: "titulo", label: "TÍTULO", size: "cell" },
  { key: "cantidad_conos", label: "CONOS", size: "cellSmall" },
  { key: "entrada_cantidad", label: "ENTRADA", size: "cellSmall" },
  { key: "salida_cantidad", label: "SALIDA", size: "cellSmall" },
  { key: "merma_cantidad", label: "MERMA", size: "cellSmall" },
  { key: "precio_unitario", label: "PRECIO", size: "cellSmall" },
  { key: "valor_total", label: "VALOR TOTAL", size: "cell" },
  { key: "existencia", label: "SALDO", size: "cellSmall" },
];

// Componente del documento PDF
const MyDocument = ({ data, material, fechas }) => {
  // Agrupar datos por material para calcular saldos correctamente
  const materialesData = {};
  
  data.forEach(row => {
    if (!materialesData[row.material_id]) {
      materialesData[row.material_id] = {
        material_id: row.material_id,
        rows: [],
        saldo: 0
      };
    }
    materialesData[row.material_id].rows.push(row);
  });

  // Construir datos con saldos calculados
  const rowsWithSaldo = [];
  Object.values(materialesData).forEach(matData => {
    let saldo = 0;
    // Ordenar por fecha
    const sortedRows = matData.rows.sort((a, b) => 
      new Date(a.fecha) - new Date(b.fecha)
    );
    
    sortedRows.forEach(row => {
      const entrada = Number(row.entrada_cantidad) || 0;
      const salida = Number(row.salida_cantidad) || 0;
      saldo = saldo + entrada - salida;
      
      rowsWithSaldo.push({
        ...row,
        saldo_calculado: saldo,
        entrada: entrada,
        salida: salida
      });
    });
  });

  // Si no hay datos, mostrar el stock actual de los materiales
  if (rowsWithSaldo.length === 0 && material && material.stock_actual !== undefined) {
    rowsWithSaldo.push({
      fecha: new Date().toISOString().split('T')[0],
      lote: 'INICIAL',
      calidad: material.calidad || 'N/A',
      color: material.color || 'N/A',
      titulo: material.titulo || '-',
      entrada: material.stock_actual || 0,
      salida: 0,
      precio: material.valor_unitario || 0,
      saldo_calculado: material.stock_actual || 0,
      valor_total: (material.stock_actual || 0) * (material.valor_unitario || 0)
    });
  }

  const hasMerma = rowsWithSaldo.some(row => Number(row.merma_cantidad) > 0);
  const hasConos = rowsWithSaldo.some(row => Number(row.cantidad_conos) > 0);
  
  // Definir columnas visibles
  const visibleColumns = columns.filter(col => {
    if (col.key === "merma_cantidad" && !hasMerma) return false;
    if (col.key === "cantidad_conos" && !hasConos) return false;
    return true;
  });

  // Calcular total de valor
  const totalValor = rowsWithSaldo.reduce((sum, row) => sum + (row.valor_total || 0), 0);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Text style={styles.title}>KARDEX DE INVENTARIO</Text>
        <Text style={styles.subtitle}>
          Material: {material?.codigo || 'N/A'} - {material?.calidad || 'N/A'} | 
          Período: {fechas?.inicio || "Inicio"} al {fechas?.fin || "Fin"}
        </Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={styles.headerRow}>
            {visibleColumns.map((col) => {
              const styleKey = col.size === "cellSmall" ? "cellHeaderSmall" : "cellHeader";
              return (
                <Text key={col.key} style={styles[styleKey]}>
                  {col.label}
                </Text>
              );
            })}
          </View>

          {/* Data */}
          {rowsWithSaldo.map((row, i) => {
            const displayRow = {};
            visibleColumns.forEach((col) => {
              let value = row[col.key] ?? "-";
              if (col.key === 'precio_unitario') {
                value = `S/ ${Number(row.precio).toFixed(2)}`;
              } else if (col.key === 'valor_total') {
                value = `S/ ${Number(row.valor_total || 0).toFixed(2)}`;
              } else if (col.key === 'saldo_calculado' || col.key === 'existencia') {
                value = Number(row.saldo_calculado || row.existencia || 0);
              } else if (col.key === 'entrada_cantidad') {
                value = row.entrada || 0;
              } else if (col.key === 'salida_cantidad') {
                value = row.salida || 0;
              } else if (col.key === 'merma_cantidad') {
                value = Number(row.merma_cantidad || 0);
              } else if (col.key === 'cantidad_conos') {
                value = Number(row.cantidad_conos || 0);
              } else if (typeof value === 'number') {
                if (col.key === 'precio_unitario' || col.key === 'valor_total') {
                  value = `S/ ${Number(value).toFixed(2)}`;
                } else {
                  value = String(value);
                }
              }
              displayRow[col.key] = value;
            });

            return (
              <View key={i} style={styles.row}>
                {visibleColumns.map((col) => {
                  const styleKey = col.size === "cellSmall" ? "cellSmall" : 
                                   col.size === "cellMedium" ? "cellMedium" : "cell";
                  return (
                    <Text key={col.key} style={styles[styleKey]}>
                      {displayRow[col.key] ?? "-"}
                    </Text>
                  );
                })}
              </View>
            );
          })}
          
          {/* Fila de totales */}
          {rowsWithSaldo.length > 0 && (
            <View style={[styles.row, { backgroundColor: '#f0f0f0', fontWeight: 'bold' }]}>
              <Text style={[styles.cell, { fontWeight: 'bold' }]}>TOTALES</Text>
              {visibleColumns.slice(1).map((col) => {
                let total = 0;
                if (col.key === 'valor_total') {
                  total = rowsWithSaldo.reduce((sum, row) => sum + (row.valor_total || 0), 0);
                } else if (col.key === 'saldo_calculado' || col.key === 'existencia') {
                  total = rowsWithSaldo.reduce((sum, row) => sum + (row.saldo_calculado || row.existencia || 0), 0);
                } else if (col.key === 'entrada_cantidad') {
                  total = rowsWithSaldo.reduce((sum, row) => sum + (row.entrada || 0), 0);
                } else if (col.key === 'salida_cantidad') {
                  total = rowsWithSaldo.reduce((sum, row) => sum + (row.salida || 0), 0);
                }
                const styleKey = col.size === "cellSmall" ? "cellSmall" : 
                                 col.size === "cellMedium" ? "cellMedium" : "cell";
                return (
                  <Text key={col.key} style={[styles[styleKey], { fontWeight: 'bold' }]}>
                    {col.key === 'precio_unitario' || col.key === 'valor_total' 
                      ? `S/ ${total.toFixed(2)}` 
                      : typeof total === 'number' ? total : '-'}
                  </Text>
                );
              })}
            </View>
          )}
        </View>

        <Text style={styles.footer}>
          Generado el {new Date().toLocaleDateString()} a las {new Date().toLocaleTimeString()}
        </Text>
      </Page>
    </Document>
  );
};

// ✅ Exportación DEFAULT (principal)
export default function ExportPDFButton({ data, material, fechas, id }) {
  const [loading, setLoading] = useState(false);

  const handleExportPDF = async () => {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }
    
    setLoading(true);
    try {
      const blob = await pdf(
        <MyDocument data={data} material={material} fechas={fechas} />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const nombreArchivo = `kardex_${material?.codigo || "material"}_${new Date().toISOString().split('T')[0]}.pdf`;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Error al generar el PDF: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      id={id}
      onClick={handleExportPDF}
      disabled={loading || !data || data.length === 0}
      className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm hover:bg-red-50 disabled:opacity-50 transition-colors"
    >
      <Download className="w-4 h-4" />
      {loading ? "Generando..." : "Exportar PDF"}
    </button>
  );
}