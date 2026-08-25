import React, { useState } from "react";
import { Download } from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

// Estilos profesionales estilo PDF corporativo (inspirado en la paleta Moshell)
const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  headerBanner: {
    backgroundColor: "#112244", // Azul marino corporativo
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 2,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 4,
    padding: 8,
  },
  badgeBox: {
    borderWidth: 1,
    borderColor: "#112244",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#f8fafc",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#112244",
  },
  periodoText: {
    fontSize: 9,
    color: "#64748b",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#112244",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#112244",
    paddingVertical: 6,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 6,
    alignItems: "center",
  },
  cell: { flex: 1, paddingHorizontal: 4, fontSize: 8, color: "#334155" },
  cellSmall: {
    flex: 0.7,
    paddingHorizontal: 4,
    fontSize: 8,
    color: "#334155",
    textAlign: "center",
  },
  cellRight: {
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 8,
    color: "#334155",
    textAlign: "right",
  },
  cellHeader: {
    flex: 1,
    paddingHorizontal: 4,
    fontWeight: "bold",
    fontSize: 8,
    color: "#ffffff",
  },
  cellHeaderSmall: {
    flex: 0.7,
    paddingHorizontal: 4,
    fontWeight: "bold",
    fontSize: 8,
    color: "#ffffff",
    textAlign: "center",
  },
  cellHeaderRight: {
    flex: 1,
    paddingHorizontal: 4,
    fontWeight: "bold",
    fontSize: 8,
    color: "#ffffff",
    textAlign: "right",
  },

  // Totales section
  totalesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalesBox: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#112244",
  },
  totalRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: "#f8fafc",
  },
  totalRowFinal: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: "#112244",
  },
  totalLabel: {
    flex: 1,
    fontSize: 9,
    fontWeight: "bold",
    color: "#112244",
  },
  totalValue: {
    flex: 1,
    fontSize: 9,
    fontWeight: "bold",
    color: "#112244",
    textAlign: "right",
  },
  totalLabelFinal: {
    flex: 1,
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
  },
  totalValueFinal: {
    flex: 1,
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
    fontSize: 8,
    textAlign: "center",
    color: "#94a3b8",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
  },
});

const columns = [
  { key: "codigo", label: "CÓDIGO", size: "cell" },
  { key: "tipo", label: "TIPO", size: "cellSmall" },
  { key: "color", label: "COLOR", size: "cell" },
  { key: "calidad", label: "CALIDAD", size: "cell" },
  { key: "stock_actual", label: "STOCK", size: "cellSmall" },
  { key: "ubicacion", label: "UBICACIÓN", size: "cellSmall" },
  { key: "cantidad", label: "CANTIDAD", size: "cellSmall" },
  { key: "peso", label: "PESO (KG)", size: "cellSmall" },
  { key: "valor_unitario", label: "V. UNIT.", size: "cellRight" },
  { key: "valor_total", label: "VALOR TOTAL", size: "cellRight" },
];

const MyDocument = ({ data, fechas }) => {
  const rows = Array.isArray(data) ? data : [];

  // Calcular totales generales
  const totalStock = rows.reduce(
    (sum, r) => sum + Number(r.inventario?.stock_actual ?? 0),
    0,
  );
  const totalCantidad = rows.reduce(
    (sum, r) => sum + Number(r.movimientos?.[0]?.cantidad ?? 0),
    0,
  );
  const totalPeso = rows.reduce(
    (sum, r) => sum + Number(r.peso_calculado ?? 0),
    0,
  );
  const valorTotalGeneral = rows.reduce((sum, r) => {
    const mov = r.movimientos?.[0] || {};
    const cant = Number(mov.cantidad ?? 0);
    const vU = Number(mov.valor_unitario ?? 0);
    return sum + cant * vU;
  }, 0);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>
            KARDEX DE INVENTARIO - REPORTE GENERAL
          </Text>
        </View>

        <View style={styles.subHeaderContainer}>
          <View style={styles.badgeBox}>
            <Text style={styles.badgeText}>INVENTARIO ACTUALIZADO</Text>
          </View>
          <Text style={styles.periodoText}>
            Período: {fechas?.inicio || "Inicio"} al {fechas?.fin || "Fin"}
          </Text>
        </View>

        {/* TABLA PRINCIPAL */}
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.headerRow}>
            {columns.map((col) => {
              let styleKey = "cellHeader";
              if (col.size === "cellSmall") styleKey = "cellHeaderSmall";
              if (col.size === "cellRight") styleKey = "cellHeaderRight";
              return (
                <Text key={col.key} style={styles[styleKey]}>
                  {col.label}
                </Text>
              );
            })}
          </View>

          {/* Data Rows */}
          {rows.map((row, i) => {
            const codigo = row.codigo || "-";
            const tipo = row.tipo || "-";
            const color = row.color || "-";
            const calidad = row.calidad || "-";

            const stockActual = Number(row.inventario?.stock_actual ?? 0);
            const ubicacion = row.inventario?.ubicacion || "-";

            const primerMovimiento = row.movimientos?.[0] || {};
            const cantidad = Number(primerMovimiento.cantidad ?? 0);
            const peso = Number(row.peso_calculado ?? 0);
            const valorUnitario = Number(primerMovimiento.valor_unitario ?? 0);
            const valorTotal = cantidad * valorUnitario;

            return (
              <View
                key={i}
                style={[
                  styles.row,
                  i % 2 === 1 ? { backgroundColor: "#f8fafc" } : {},
                ]}
              >
                <Text style={styles.cell}>{codigo}</Text>
                <Text style={styles.cellSmall}>{tipo}</Text>
                <Text style={styles.cell}>{color}</Text>
                <Text style={styles.cell}>{calidad}</Text>
                <Text style={styles.cellSmall}>{stockActual}</Text>
                <Text style={styles.cellSmall}>{ubicacion}</Text>
                <Text style={styles.cellSmall}>{cantidad}</Text>
                <Text style={styles.cellSmall}>{peso.toFixed(2)}</Text>
                <Text style={styles.cellRight}>
                  S/ {valorUnitario.toFixed(2)}
                </Text>
                <Text style={styles.cellRight}>S/ {valorTotal.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>

        {/* BLOQUE DE TOTALES ESTILO FACTURA / RESUMEN */}
        <View style={styles.totalesContainer}>
          <View style={styles.totalesBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL STOCK:</Text>
              <Text style={styles.totalValue}>{totalStock}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL CANTIDAD:</Text>
              <Text style={styles.totalValue}>{totalCantidad}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL PESO (KG):</Text>
              <Text style={styles.totalValue}>{totalPeso.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>VALOR TOTAL:</Text>
              <Text style={styles.totalValueFinal}>
                S/ {valorTotalGeneral.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* PIE DE PÁGINA */}
        <Text style={styles.footer}>
          Documento generado automáticamente el{" "}
          {new Date().toLocaleDateString()} a las{" "}
          {new Date().toLocaleTimeString()} — Sistema ERP Textil
        </Text>
      </Page>
    </Document>
  );
};

export default function ExportPDFButton({ data, fechas, id }) {
  const [loading, setLoading] = useState(false);

  const handleExportPDF = async () => {
    if (!data || data.length === 0) {
      alert(
        "Por favor, seleccione al menos un material con el check para exportar.",
      );
      return;
    }

    setLoading(true);
    try {
      const blob = await pdf(
        <MyDocument data={data} fechas={fechas} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `kardex_inventario_${new Date().toISOString().split("T")[0]}.pdf`;
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
