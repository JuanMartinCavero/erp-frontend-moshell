import React, { useState } from "react";
import { Download } from "lucide-react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import api from "../../../services/api";

// ============================================================
// PALETA MOSHELL
// ============================================================
const NAVY = "#0F3A63";
const GOLD = "#F2C230";
const BORDER = "#0F3A63";
const TEXT_DARK = "#1A2530";
const ROW_ALT = "#F3F6FA";
const FONT_TITLE = "Helvetica-Bold";
const FONT_BODY = "Helvetica";

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 9,
    fontFamily: FONT_BODY,
    color: TEXT_DARK,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 22,
  },
  headerBar: {
    width: "100%",
    backgroundColor: NAVY,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: FONT_TITLE,
    color: GOLD,
    letterSpacing: 1,
  },
  topCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  numeroBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  numeroText: {
    fontFamily: FONT_TITLE,
    fontSize: 11,
    color: TEXT_DARK,
  },
  logo: { width: 130, height: 42, objectFit: "contain" },
  datosWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  datosCol: { width: "48%" },
  datosColRight: { width: "48%", alignItems: "flex-end" },
  datosHeader: {
    fontFamily: FONT_TITLE,
    fontSize: 8.5,
    color: TEXT_DARK,
    marginBottom: 3,
  },
  datosLine: { fontSize: 7.5, marginBottom: 2, color: TEXT_DARK },
  datosLineRight: {
    fontSize: 7.5,
    marginBottom: 2,
    color: TEXT_DARK,
    textAlign: "right",
  },
  datosLabel: { fontFamily: FONT_TITLE },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: NAVY,
    paddingVertical: 4,
  },
  thText: {
    fontFamily: FONT_TITLE,
    fontSize: 8,
    color: GOLD,
    textAlign: "center",
  },
  colFecha: { width: "10%" },
  colDescripcion: { width: "18%" },
  colQ: { width: "7%" },
  colCu: { width: "9%" },
  colCt: { width: "10%" },
  row: { flexDirection: "row", borderBottom: `1px solid ${BORDER}` },
  rowEven: {
    flexDirection: "row",
    borderBottom: `1px solid ${BORDER}`,
    backgroundColor: ROW_ALT,
  },
  cell: {
    fontSize: 7.5,
    textAlign: "center",
    paddingVertical: 4,
    borderRight: `1px solid ${BORDER}`,
  },
  cellLeft: {
    fontSize: 7.5,
    textAlign: "left",
    paddingVertical: 4,
    paddingLeft: 4,
    borderRight: `1px solid ${BORDER}`,
  },
  cellRight: {
    fontSize: 7.5,
    textAlign: "right",
    paddingVertical: 4,
    paddingRight: 4,
    borderRight: `1px solid ${BORDER}`,
  },
  totalsWrap: { marginTop: 4 },
  totalsRow: { flexDirection: "row", height: 20 },
  totalBarWide: {
    width: "65%",
    backgroundColor: NAVY,
    alignItems: "center",
    justifyContent: "center",
  },
  totalBarWideText: {
    fontFamily: FONT_TITLE,
    fontSize: 10,
    color: GOLD,
    letterSpacing: 1,
  },
  spacerWide: { width: "65%" },
  labelCell: {
    width: "15%",
    backgroundColor: NAVY,
    border: `1px solid ${BORDER}`,
    alignItems: "center",
    justifyContent: "center",
  },
  labelCellText: { fontFamily: FONT_TITLE, fontSize: 8, color: GOLD },
  amountCell: {
    width: "20%",
    border: `1px solid ${BORDER}`,
    alignItems: "center",
    justifyContent: "center",
  },
  amountCellText: { fontSize: 8, color: TEXT_DARK },
  footer: {
    marginTop: 22,
    paddingTop: 8,
    borderTop: `1px solid ${BORDER}`,
    textAlign: "center",
    fontSize: 7,
    color: "#7C8AA0",
  },
});

// ============================================================
// ✅ FUNCIÓN CORREGIDA: CALCULAR COSTO PROMEDIO PONDERADO
// ============================================================
const calculateWeightedAverageCost = (data) => {
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.fecha || a.fecha_movimiento) -
      new Date(b.fecha || b.fecha_movimiento),
  );

  const rowsWithSaldo = [];
  let saldoQ = 0;
  let saldoCT = 0;
  let costoPromedio = 0;

  sortedData.forEach((row) => {
    const entrada = Number(row.entrada_cantidad ?? row.cantidad) || 0;
    const salida = Number(row.salida_cantidad) || 0;

    const precioEntrada =
      Number(row.entrada_valor_unitario) ||
      Number(row.valor_unitario) ||
      Number(row.precio_unitario) ||
      0;

    let entradaCu = 0;
    let entradaCt = 0;
    let salidaCu = 0;
    let salidaCt = 0;

    // ✅ PROCESAMIENTO DE ENTRADA
    if (row.tipo_movimiento === "entrada" || entrada > 0) {
      entradaCu = precioEntrada;
      entradaCt = entrada * precioEntrada;

      saldoCT += entradaCt;
      saldoQ += entrada;

      if (saldoQ > 0) {
        costoPromedio = saldoCT / saldoQ;
      }
    }
    // ✅ PROCESAMIENTO DE SALIDA
    else if (row.tipo_movimiento === "salida" || salida > 0) {
      salidaCu = costoPromedio;
      salidaCt = salida * costoPromedio;

      // ✅ SE PERMITE MATEMÁTICA REAL, COMO EXCEL (incluso saldos negativos)
      saldoCT -= salidaCt;
      saldoQ -= salida;
    }

    rowsWithSaldo.push({
      fecha: row.fecha || row.fecha_movimiento || "-",
      descripcion: row.titulo || row.descripcion || row.referencia || "-",
      entrada_q: entrada,
      entrada_cu: entrada > 0 ? entradaCu : 0,
      entrada_ct: entrada > 0 ? entradaCt : 0,
      salida_q: salida,
      salida_cu: salida > 0 ? salidaCu : 0,
      salida_ct: salida > 0 ? salidaCt : 0,
      saldo_q: saldoQ, // 🚨 Ya no usamos Math.max, permitimos sumar y restar naturalmente
      saldo_cu: costoPromedio,
      saldo_ct: saldoCT,
    });
  });

  return rowsWithSaldo;
};

// ============================================================
// ✅ FUNCIÓN: PROCESAR SOLO SALIDAS (CORREGIDA V2)
// ============================================================
const processOnlyOutputs = (movimientos) => {
  const salidas = movimientos.filter((mov) => mov.tipo_movimiento === "salida");

  const sorted = [...salidas].sort(
    (a, b) => new Date(a.fecha_movimiento) - new Date(b.fecha_movimiento),
  );

  const rows = [];
  let totalSalidasCT = 0;

  sorted.forEach((mov) => {
    const cantidad = Number(
      mov.cantidad ?? mov.cantidad_conos ?? mov.salida_cantidad ?? 0,
    );
    const valorUnitario = Number(
      mov.valor_unitario ?? mov.precio_unitario ?? mov.salida_cu ?? 0,
    );
    const valorTotal = cantidad * valorUnitario;

    totalSalidasCT += valorTotal;

    rows.push({
      fecha: mov.fecha_movimiento
        ? new Date(mov.fecha_movimiento).toLocaleDateString("es-PE")
        : mov.fecha || "-",
      descripcion:
        mov.titulo ||
        mov.calidad ||
        mov.referencia ||
        mov.descripcion ||
        "Salida",
      entrada_q: 0,
      entrada_cu: 0,
      entrada_ct: 0,
      salida_q: cantidad,
      salida_cu: valorUnitario,
      salida_ct: valorTotal,
      saldo_q: 0,
      saldo_cu: 0,
      saldo_ct: 0,
    });
  });

  return {
    rows,
    totalSalidasCT,
  };
};

// ============================================================
// COMPONENTE DEL PDF
// ============================================================
const KardexDocument = ({
  data,
  material,
  fechas,
  logoBase64,
  totalEntradasCT = 0, // ✅ AHORA RECIBIMOS VALORES FINANCIEROS (CT)
  totalSalidasCT = 0,
  saldoFinalCT = 0,
  esMultiple = false,
}) => {
  const isKardexData =
    data.length > 0 && data[0].entrada_cantidad !== undefined;
  const isMaterialData = data.length > 0 && data[0].inventario !== undefined;
  const isProcessedData = data.length > 0 && data[0].salida_q !== undefined;

  let rowsWithSaldo = [];

  if (!data || data.length === 0) {
    return (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>
              KARDEX DE INVENTARIO - MOSHELL
            </Text>
          </View>
          <View style={styles.content}>
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                color: "#7C8AA0",
                fontSize: 10,
              }}
            >
              No hay datos disponibles para exportar
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  if (isKardexData) {
    rowsWithSaldo = calculateWeightedAverageCost(data);
  } else if (isMaterialData) {
    data.forEach((item) => {
      const inventario = item.inventario || {};
      const stock = Number(inventario.stock_actual) || 0;
      const valorUnitario = Number(inventario.valor_unitario) || 0;
      const costoTotal = stock * valorUnitario;

      rowsWithSaldo.push({
        fecha: fechas?.inicio || "-",
        descripcion: item.calidad || item.descripcion || item.nombre || "-",
        entrada_q: stock,
        entrada_cu: valorUnitario,
        entrada_ct: costoTotal,
        salida_q: 0,
        salida_cu: 0,
        salida_ct: 0,
        saldo_q: stock,
        saldo_cu: valorUnitario,
        saldo_ct: costoTotal,
      });
    });
  } else if (isProcessedData) {
    rowsWithSaldo = data.map((item) => ({
      fecha: item.fecha || "-",
      descripcion: item.descripcion || "-",
      entrada_q: item.entrada_q || 0,
      entrada_cu: item.entrada_cu || 0,
      entrada_ct: item.entrada_ct || 0,
      salida_q: item.salida_q || 0,
      salida_cu: item.salida_cu || 0,
      salida_ct: item.salida_ct || 0,
      saldo_q: item.saldo_q || 0,
      saldo_cu: item.saldo_cu || 0,
      saldo_ct: item.saldo_ct || 0,
    }));
  } else {
    rowsWithSaldo = data.map((item) => ({
      fecha: item.fecha || "-",
      descripcion: item.descripcion || item.calidad || item.nombre || "-",
      entrada_q: item.entrada_q || 0,
      entrada_cu: item.entrada_cu || 0,
      entrada_ct: item.entrada_ct || 0,
      salida_q: item.salida_q || 0,
      salida_cu: item.salida_cu || 0,
      salida_ct: item.salida_ct || 0,
      saldo_q: item.saldo_q || 0,
      saldo_cu: item.saldo_cu || 0,
      saldo_ct: item.saldo_ct || 0,
    }));
  }

  if (rowsWithSaldo.length === 0) {
    return (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>
              KARDEX DE INVENTARIO - MOSHELL
            </Text>
          </View>
          <View style={styles.content}>
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                color: "#7C8AA0",
                fontSize: 10,
              }}
            >
              No hay datos disponibles para exportar
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>KARDEX DE INVENTARIO - MOSHELL</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.topCard}>
            <View style={styles.numeroBox}>
              <Text style={styles.numeroText}>
                Material: {material?.codigo || "N/A"} -{" "}
                {material?.calidad || "N/A"}
              </Text>
            </View>
            {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
          </View>

          <View style={styles.datosWrap}>
            <View style={styles.datosCol}>
              <Text style={styles.datosHeader}>DATOS DEL MATERIAL:</Text>
              <Text style={styles.datosLine}>
                <Text style={styles.datosLabel}>CÓDIGO: </Text>
                {material?.codigo || "-"}
              </Text>
              <Text style={styles.datosLine}>
                <Text style={styles.datosLabel}>CALIDAD: </Text>
                {material?.calidad || "-"}
              </Text>
              {esMultiple && (
                <Text style={styles.datosLine}>
                  <Text style={styles.datosLabel}>TIPO: </Text>RESUMEN DE STOCK
                </Text>
              )}
            </View>
            <View style={styles.datosColRight}>
              <Text style={styles.datosHeader}>PERÍODO:</Text>
              <Text style={styles.datosLineRight}>
                <Text style={styles.datosLabel}>INICIO: </Text>
                {fechas?.inicio || "Inicio"}
              </Text>
              <Text style={styles.datosLineRight}>
                <Text style={styles.datosLabel}>FIN: </Text>
                {fechas?.fin || "Fin"}
              </Text>
              <Text style={styles.datosLineRight}>
                <Text style={styles.datosLabel}>STOCK ACTUAL: </Text>
                {material?.stock_actual || 0}
              </Text>
            </View>
          </View>

          {/* TABLA - ENCABEZADO */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colFecha]}>FECHA</Text>
            <Text style={[styles.thText, styles.colDescripcion]}>
              DESCRIPCIÓN
            </Text>
            <Text
              style={[
                styles.thText,
                styles.colQ,
                { width: "23%", textAlign: "center" },
              ]}
              colSpan={3}
            >
              ENTRADAS
            </Text>
            <Text
              style={[
                styles.thText,
                styles.colQ,
                { width: "23%", textAlign: "center" },
              ]}
              colSpan={3}
            >
              SALIDAS
            </Text>
            <Text
              style={[
                styles.thText,
                styles.colQ,
                { width: "23%", textAlign: "center" },
              ]}
              colSpan={3}
            >
              SALDOS
            </Text>
          </View>

          <View style={[styles.tableHeader, { backgroundColor: NAVY }]}>
            <Text style={[styles.thText, styles.colFecha]}></Text>
            <Text style={[styles.thText, styles.colDescripcion]}></Text>
            <Text style={[styles.thText, styles.colQ]}>Q</Text>
            <Text style={[styles.thText, styles.colCu]}>Cu</Text>
            <Text style={[styles.thText, styles.colCt]}>CT</Text>
            <Text style={[styles.thText, styles.colQ]}>Q</Text>
            <Text style={[styles.thText, styles.colCu]}>Cu</Text>
            <Text style={[styles.thText, styles.colCt]}>CT</Text>
            <Text style={[styles.thText, styles.colQ]}>Q</Text>
            <Text style={[styles.thText, styles.colCu]}>Cu</Text>
            <Text style={[styles.thText, styles.colCt]}>CT</Text>
          </View>

          {rowsWithSaldo.map((row, index) => (
            <View
              key={index}
              style={index % 2 === 0 ? styles.row : styles.rowEven}
            >
              <Text style={[styles.cell, styles.colFecha]}>{row.fecha}</Text>
              <Text style={[styles.cellLeft, styles.colDescripcion]}>
                {row.descripcion}
              </Text>
              <Text style={[styles.cellRight, styles.colQ]}>
                {row.entrada_q > 0 ? row.entrada_q : ""}
              </Text>
              <Text style={[styles.cellRight, styles.colCu]}>
                {row.entrada_q > 0 ? row.entrada_cu.toFixed(2) : ""}
              </Text>
              <Text style={[styles.cellRight, styles.colCt]}>
                {row.entrada_q > 0 ? row.entrada_ct.toFixed(2) : ""}
              </Text>
              <Text style={[styles.cellRight, styles.colQ]}>
                {row.salida_q > 0 ? row.salida_q : ""}
              </Text>
              <Text style={[styles.cellRight, styles.colCu]}>
                {row.salida_q > 0 ? row.salida_cu.toFixed(2) : ""}
              </Text>
              <Text style={[styles.cellRight, styles.colCt]}>
                {row.salida_q > 0 ? row.salida_ct.toFixed(2) : ""}
              </Text>
              <Text style={[styles.cellRight, styles.colQ]}>{row.saldo_q}</Text>
              <Text style={[styles.cellRight, styles.colCu]}>
                {row.saldo_cu.toFixed(2)}
              </Text>
              <Text style={[styles.cellRight, styles.colCt]}>
                {row.saldo_ct.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* ✅ TOTALES MODIFICADOS A SOLES */}
          <View style={styles.totalsWrap}>
            <View style={styles.totalsRow}>
              <View style={styles.totalBarWide}>
                <Text style={styles.totalBarWideText}>TOTALES</Text>
              </View>
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>ENTRADAS</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>
                  S/ {totalEntradasCT.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>SALIDAS</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>
                  S/ {totalSalidasCT.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>SALDO FINAL</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>
                  S/ {saldoFinalCT.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={[styles.labelCell, { backgroundColor: GOLD }]}>
                <Text style={[styles.labelCellText, { color: NAVY }]}>
                  COSTO DE VENTAS
                </Text>
              </View>
              <View style={[styles.amountCell, { backgroundColor: GOLD }]}>
                <Text
                  style={[
                    styles.amountCellText,
                    { fontFamily: FONT_TITLE, color: NAVY },
                  ]}
                >
                  S/ {totalSalidasCT.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text>MOSHELL — ERP de Gestión de Producción Textil</Text>
            <Text>
              Documento generado automáticamente el{" "}
              {new Date().toLocaleString("es-PE")}
            </Text>
            <Text>___________________________________</Text>
            <Text style={{ fontFamily: FONT_TITLE, color: NAVY }}>
              Firma Autorizada
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// ============================================================
// BOTÓN DE EXPORTACIÓN
// ============================================================
export default function ExportPDFButton({
  data,
  material,
  fechas,
  id,
  logoBase64,
}) {
  const [loading, setLoading] = useState(false);

  const handleExportPDF = async () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    setLoading(true);
    try {
      let processedData = [];

      // ✅ VARIABLES PARA ALMACENAR TOTALES EN CT (Costo Total)
      let totalEntradasCT = 0;
      let totalSalidasCT = 0;
      let saldoFinalCT = 0;
      let esMultiple = false;

      // 1. KARDEX (por movimientos)
      if (data[0]?.tipo_movimiento) {
        const result = processOnlyOutputs(data);
        processedData = result.rows;
        totalSalidasCT = result.totalSalidasCT;
        esMultiple = true;
      }
      // 2. LISTA DE MATERIALES SELECCIONADOS
      else if (data[0]?.id && data[0]?.codigo) {
        const allMovimientos = [];

        for (const material of data) {
          try {
            const response = await api.get(`/kardex/${material.id}`);
            const kardexData = response.data;

            if (kardexData && kardexData.kardex) {
              kardexData.kardex.forEach((mov) => {
                allMovimientos.push({
                  ...mov,
                  material_codigo: material.codigo,
                  material_calidad: material.calidad,
                });
              });
            }
          } catch (error) {
            console.error(
              `❌ Error obteniendo movimientos del material ${material.id}:`,
              error,
            );
          }
        }

        if (allMovimientos.length > 0) {
          processedData = calculateWeightedAverageCost(allMovimientos);

          totalEntradasCT = processedData.reduce(
            (sum, r) => sum + r.entrada_ct,
            0,
          );
          totalSalidasCT = processedData.reduce(
            (sum, r) => sum + r.salida_ct,
            0,
          );
          saldoFinalCT =
            processedData.length > 0
              ? processedData[processedData.length - 1].saldo_ct
              : 0;
          esMultiple = true;
        } else {
          // Si no hay movimientos, mostrar resumen de stock
          processedData = data.map((item) => {
            const stock = Number(
              item.stock_actual || item.inventario?.stock_actual || 0,
            );
            const valorUnitario = Number(
              item.valor_unitario || item.inventario?.valor_unitario || 0,
            );
            return {
              fecha: "-",
              descripcion:
                item.calidad || item.descripcion || item.nombre || "-",
              entrada_q: stock,
              entrada_cu: valorUnitario,
              entrada_ct: stock * valorUnitario,
              salida_q: 0,
              salida_cu: 0,
              salida_ct: 0,
              saldo_q: stock,
              saldo_cu: valorUnitario,
              saldo_ct: stock * valorUnitario,
            };
          });
          totalEntradasCT = processedData.reduce(
            (sum, r) => sum + r.entrada_ct,
            0,
          );
          saldoFinalCT =
            processedData.length > 0
              ? processedData[processedData.length - 1].saldo_ct
              : 0;
          esMultiple = true;
        }
      }
      // 3. INVENTARIO ANIDADO
      else if (data[0]?.inventario) {
        processedData = data.map((item) => {
          const inventario = item.inventario || {};
          const stock = Number(inventario.stock_actual) || 0;
          const valorUnitario = Number(inventario.valor_unitario) || 0;
          return {
            fecha: "-",
            descripcion: item.calidad || item.descripcion || "-",
            entrada_q: stock,
            entrada_cu: valorUnitario,
            entrada_ct: stock * valorUnitario,
            salida_q: 0,
            salida_cu: 0,
            salida_ct: 0,
            saldo_q: stock,
            saldo_cu: valorUnitario,
            saldo_ct: stock * valorUnitario,
          };
        });
        totalEntradasCT = processedData.reduce(
          (sum, r) => sum + r.entrada_ct,
          0,
        );
        saldoFinalCT =
          processedData.length > 0
            ? processedData[processedData.length - 1].saldo_ct
            : 0;
        esMultiple = true;
      }
      // 4. MÚLTIPLES MATERIALES DIRECTOS
      else if (data[0]?.stock_actual !== undefined) {
        processedData = data.map((item) => {
          const stock = Number(item.stock_actual) || 0;
          const valorUnitario = Number(item.valor_unitario) || 0;
          return {
            fecha: "-",
            descripcion: item.calidad || item.descripcion || item.nombre || "-",
            entrada_q: stock,
            entrada_cu: valorUnitario,
            entrada_ct: stock * valorUnitario,
            salida_q: 0,
            salida_cu: 0,
            salida_ct: 0,
            saldo_q: stock,
            saldo_cu: valorUnitario,
            saldo_ct: stock * valorUnitario,
          };
        });
        totalEntradasCT = processedData.reduce(
          (sum, r) => sum + r.entrada_ct,
          0,
        );
        saldoFinalCT =
          processedData.length > 0
            ? processedData[processedData.length - 1].saldo_ct
            : 0;
        esMultiple = true;
      }
      // 5. CUALQUIER OTRO FORMATO
      else {
        processedData = data.map((item) => {
          const stock = Number(
            item.stock_actual ?? item.stock ?? item.cantidad ?? 0,
          );
          const valorUnitario = Number(
            item.valor_unitario ?? item.precio_unitario ?? 0,
          );
          const descripcion =
            item.calidad || item.descripcion || item.nombre || "-";
          return {
            fecha: "-",
            descripcion: descripcion,
            entrada_q: stock,
            entrada_cu: valorUnitario,
            entrada_ct: stock * valorUnitario,
            salida_q: 0,
            salida_cu: 0,
            salida_ct: 0,
            saldo_q: stock,
            saldo_cu: valorUnitario,
            saldo_ct: stock * valorUnitario,
          };
        });
        totalEntradasCT = processedData.reduce(
          (sum, r) => sum + r.entrada_ct,
          0,
        );
        saldoFinalCT =
          processedData.length > 0
            ? processedData[processedData.length - 1].saldo_ct
            : 0;
        esMultiple = true;
      }

      const blob = await pdf(
        <KardexDocument
          data={processedData}
          material={material}
          fechas={fechas}
          logoBase64={logoBase64}
          totalEntradasCT={totalEntradasCT}
          totalSalidasCT={totalSalidasCT}
          saldoFinalCT={saldoFinalCT}
          esMultiple={esMultiple}
        />,
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