import React, { useState } from "react";
import { Download } from "lucide-react";
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";

// ============================================================
// PALETA MOSHELL
// ============================================================
const NAVY = '#0F3A63';
const GOLD = '#F2C230';
const BORDER = '#0F3A63';
const TEXT_DARK = '#1A2530';
const ROW_ALT = '#F3F6FA';
const FONT_TITLE = 'Helvetica-Bold';
const FONT_BODY = 'Helvetica';

// ============================================================
// ESTILOS
// ============================================================
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 9,
    fontFamily: FONT_BODY,
    color: TEXT_DARK,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 22,
  },
  headerBar: {
    width: '100%',
    backgroundColor: NAVY,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: FONT_TITLE,
    color: GOLD,
    letterSpacing: 1,
  },
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  logo: { width: 130, height: 42, objectFit: 'contain' },
  datosWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  datosCol: { width: '48%' },
  datosColRight: { width: '48%', alignItems: 'flex-end' },
  datosHeader: {
    fontFamily: FONT_TITLE,
    fontSize: 8.5,
    color: TEXT_DARK,
    marginBottom: 3,
  },
  datosLine: { fontSize: 7.5, marginBottom: 2, color: TEXT_DARK },
  datosLineRight: { fontSize: 7.5, marginBottom: 2, color: TEXT_DARK, textAlign: 'right' },
  datosLabel: { fontFamily: FONT_TITLE },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: NAVY,
    paddingVertical: 4,
  },
  thText: {
    fontFamily: FONT_TITLE,
    fontSize: 8,
    color: GOLD,
    textAlign: 'center',
  },
  colFecha: { width: '10%' },
  colDescripcion: { width: '18%' },
  colQ: { width: '7%' },
  colCu: { width: '9%' },
  colCt: { width: '10%' },
  row: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}` },
  rowEven: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}`, backgroundColor: ROW_ALT },
  cell: { fontSize: 7.5, textAlign: 'center', paddingVertical: 4, borderRight: `1px solid ${BORDER}` },
  cellLeft: { fontSize: 7.5, textAlign: 'left', paddingVertical: 4, paddingLeft: 4, borderRight: `1px solid ${BORDER}` },
  cellRight: { fontSize: 7.5, textAlign: 'right', paddingVertical: 4, paddingRight: 4, borderRight: `1px solid ${BORDER}` },
  totalsWrap: { marginTop: 4 },
  totalsRow: { flexDirection: 'row', height: 20 },
  totalBarWide: {
    width: '65%',
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalBarWideText: { fontFamily: FONT_TITLE, fontSize: 10, color: GOLD, letterSpacing: 1 },
  spacerWide: { width: '65%' },
  labelCell: {
    width: '15%',
    backgroundColor: NAVY,
    border: `1px solid ${BORDER}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelCellText: { fontFamily: FONT_TITLE, fontSize: 8, color: GOLD },
  amountCell: {
    width: '20%',
    border: `1px solid ${BORDER}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCellText: { fontSize: 8, color: TEXT_DARK },
  footer: {
    marginTop: 22,
    paddingTop: 8,
    borderTop: `1px solid ${BORDER}`,
    textAlign: 'center',
    fontSize: 7,
    color: '#7C8AA0',
  },
});

// ============================================================
// COMPONENTE DEL PDF
// ============================================================
const KardexDocument = ({ data, material, fechas, logoBase64 }) => {
  // ============================================================
  // ✅ DETECTAR TIPO DE DATOS
  // ============================================================
  const isKardexData = data.length > 0 && data[0].entrada_cantidad !== undefined;
  const isMaterialData = data.length > 0 && data[0].inventario !== undefined;

  let rowsWithSaldo = [];
  let totalEntradasQ = 0;
  let totalSalidasQ = 0;
  let totalSalidasCT = 0;
  let saldoFinalQ = 0;
  let esMultiple = false;

  if (isKardexData) {
    // ============================================================
    // 🔵 TIPO 1: DATOS DE KARDEX (movimientos)
    // ============================================================
    let saldo = 0;
    let costoPromedio = 0;

    const sortedData = [...data].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    sortedData.forEach(row => {
      const entrada = Number(row.entrada_cantidad) || 0;
      const salida = Number(row.salida_cantidad) || 0;
      const precio = Number(row.costo_unitario) || Number(row.precio_unitario) || Number(row.valor_unitario) || 0;
      
      let costoUnitario = 0;
      let costoTotal = 0;

      if (entrada > 0) {
        const stockAnterior = saldo;
        const costoAnterior = costoPromedio;
        
        saldo += entrada;
        
        if (stockAnterior === 0 || costoAnterior === 0) {
          costoPromedio = precio;
        } else {
          const valorTotalAnterior = stockAnterior * costoAnterior;
          const valorTotalNuevo = entrada * precio;
          costoPromedio = (valorTotalAnterior + valorTotalNuevo) / saldo;
        }
        
        costoUnitario = precio;
        costoTotal = entrada * precio;
        
      } else if (salida > 0) {
        saldo -= salida;
        costoUnitario = costoPromedio;
        costoTotal = salida * costoPromedio;
      }

      rowsWithSaldo.push({
        fecha: row.fecha || '-',
        descripcion: row.titulo || row.descripcion || '-',
        entrada_q: entrada,
        entrada_cu: costoUnitario,
        entrada_ct: costoTotal,
        salida_q: salida,
        salida_cu: costoUnitario,
        salida_ct: costoTotal,
        saldo_q: saldo,
        saldo_cu: costoPromedio,
        saldo_ct: saldo * costoPromedio
      });
    });

    totalEntradasQ = rowsWithSaldo.reduce((sum, r) => sum + r.entrada_q, 0);
    totalSalidasQ = rowsWithSaldo.reduce((sum, r) => sum + r.salida_q, 0);
    totalSalidasCT = rowsWithSaldo.reduce((sum, r) => sum + r.salida_ct, 0);
    saldoFinalQ = rowsWithSaldo.length > 0 ? rowsWithSaldo[rowsWithSaldo.length - 1].saldo_q : 0;

  } else if (isMaterialData) {
    // ============================================================
    // 🟢 TIPO 2: DATOS DE MATERIALES (resumen de stock)
    // ============================================================
    esMultiple = true;
    let stockTotal = 0;
    let valorTotal = 0;

    data.forEach(item => {
      const inventario = item.inventario || {};
      const stock = Number(inventario.stock_actual) || 0;
      const valorUnitario = Number(inventario.valor_unitario) || 0;
      stockTotal += stock;
      valorTotal += stock * valorUnitario;

      rowsWithSaldo.push({
        fecha: fechas?.inicio || '-',
        descripcion: item.descripcion || item.nombre || 'Material',
        entrada_q: stock,
        entrada_cu: 0,
        entrada_ct: 0,
        salida_q: 0,
        salida_cu: 0,
        salida_ct: 0,
        saldo_q: stock,
        saldo_cu: valorUnitario,
        saldo_ct: stock * valorUnitario
      });
    });

    totalEntradasQ = stockTotal;
    totalSalidasQ = 0;
    totalSalidasCT = 0;
    saldoFinalQ = stockTotal;

  } else {
    // ============================================================
    // ⚪ TIPO 3: DATOS VACÍOS O DESCONOCIDOS
    // ============================================================
    // Mostrar mensaje de que no hay datos
    return (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>KARDEX DE INVENTARIO - MOSHELL</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.topCard}>
              <View style={styles.numeroBox}>
                <Text style={styles.numeroText}>Material: {material?.codigo || 'N/A'}</Text>
              </View>
              {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
            </View>
            <Text style={{ textAlign: "center", marginTop: 40, color: '#7C8AA0', fontSize: 10 }}>
              No hay datos disponibles para exportar
            </Text>
            <View style={styles.footer}>
              <Text>MOSHELL — ERP de Gestión de Producción Textil</Text>
              <Text>Documento generado automáticamente el {new Date().toLocaleString('es-PE')}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // ============================================================
  // RENDERIZAR PDF
  // ============================================================
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* BARRA DE TÍTULO */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>KARDEX DE INVENTARIO - MOSHELL</Text>
        </View>

        <View style={styles.content}>
          {/* N° + LOGO */}
          <View style={styles.topCard}>
            <View style={styles.numeroBox}>
              <Text style={styles.numeroText}>Material: {material?.codigo || 'N/A'} - {material?.calidad || 'N/A'}</Text>
            </View>
            {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
          </View>

          {/* DATOS DEL MATERIAL */}
          <View style={styles.datosWrap}>
            <View style={styles.datosCol}>
              <Text style={styles.datosHeader}>DATOS DEL MATERIAL:</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CÓDIGO: </Text>{material?.codigo || '-'}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CALIDAD: </Text>{material?.calidad || '-'}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>COLOR: </Text>{material?.color || '-'}</Text>
              {esMultiple && (
                <Text style={styles.datosLine}><Text style={styles.datosLabel}>TIPO: </Text>RESUMEN DE STOCK</Text>
              )}
            </View>
            <View style={styles.datosColRight}>
              <Text style={styles.datosHeader}>PERÍODO:</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>INICIO: </Text>{fechas?.inicio || 'Inicio'}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>FIN: </Text>{fechas?.fin || 'Fin'}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>STOCK ACTUAL: </Text>{material?.stock_actual || 0}</Text>
            </View>
          </View>

          {/* TABLA - ENCABEZADO */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colFecha]}>FECHA</Text>
            <Text style={[styles.thText, styles.colDescripcion]}>DESCRIPCIÓN</Text>
            <Text style={[styles.thText, styles.colQ, { width: '23%', textAlign: 'center' }]} colSpan={3}>ENTRADAS</Text>
            <Text style={[styles.thText, styles.colQ, { width: '23%', textAlign: 'center' }]} colSpan={3}>SALIDAS</Text>
            <Text style={[styles.thText, styles.colQ, { width: '23%', textAlign: 'center' }]} colSpan={3}>SALDOS</Text>
          </View>

          {/* TABLA - SUB-ENCABEZADO */}
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

          {/* FILAS DE DATOS */}
          {rowsWithSaldo.map((row, index) => (
            <View key={index} style={index % 2 === 0 ? styles.row : styles.rowEven}>
              <Text style={[styles.cell, styles.colFecha]}>{row.fecha}</Text>
              <Text style={[styles.cellLeft, styles.colDescripcion]}>{row.descripcion}</Text>
              <Text style={[styles.cellRight, styles.colQ]}>{row.entrada_q > 0 ? row.entrada_q : ''}</Text>
              <Text style={[styles.cellRight, styles.colCu]}>{row.entrada_q > 0 ? row.entrada_cu.toFixed(2) : ''}</Text>
              <Text style={[styles.cellRight, styles.colCt]}>{row.entrada_q > 0 ? row.entrada_ct.toFixed(2) : ''}</Text>
              <Text style={[styles.cellRight, styles.colQ]}>{row.salida_q > 0 ? row.salida_q : ''}</Text>
              <Text style={[styles.cellRight, styles.colCu]}>{row.salida_q > 0 ? row.salida_cu.toFixed(2) : ''}</Text>
              <Text style={[styles.cellRight, styles.colCt]}>{row.salida_q > 0 ? row.salida_ct.toFixed(2) : ''}</Text>
              <Text style={[styles.cellRight, styles.colQ]}>{row.saldo_q}</Text>
              <Text style={[styles.cellRight, styles.colCu]}>{row.saldo_cu.toFixed(2)}</Text>
              <Text style={[styles.cellRight, styles.colCt]}>{row.saldo_ct.toFixed(2)}</Text>
            </View>
          ))}

          {/* TOTALES */}
          <View style={styles.totalsWrap}>
            <View style={styles.totalsRow}>
              <View style={styles.totalBarWide}>
                <Text style={styles.totalBarWideText}>TOTALES</Text>
              </View>
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>ENTRADAS</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>{totalEntradasQ} u</Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>SALIDAS</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>{totalSalidasQ} u</Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>SALDO FINAL</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>{saldoFinalQ} u</Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={[styles.labelCell, { backgroundColor: GOLD }]}>
                <Text style={[styles.labelCellText, { color: NAVY }]}>COSTO DE VENTAS</Text>
              </View>
              <View style={[styles.amountCell, { backgroundColor: GOLD }]}>
                <Text style={[styles.amountCellText, { fontFamily: FONT_TITLE, color: NAVY }]}>S/ {totalSalidasCT.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text>MOSHELL — ERP de Gestión de Producción Textil</Text>
            <Text>Documento generado automáticamente el {new Date().toLocaleString('es-PE')}</Text>
            <Text>___________________________________</Text>
            <Text style={{ fontFamily: FONT_TITLE, color: NAVY }}>Firma Autorizada</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

<<<<<<< HEAD
export default function ExportPDFButton({ data, fechas, id }) {
=======
// ============================================================
// BOTÓN DE EXPORTACIÓN
// ============================================================
export default function ExportPDFButton({ data, material, fechas, id, logoBase64 }) {
>>>>>>> Martin3
  const [loading, setLoading] = useState(false);

  const handleExportPDF = async () => {
    console.log("📦 Datos para PDF:", { data, material, fechas });

    if (!data || data.length === 0) {
      alert(
        "Por favor, seleccione al menos un material con el check para exportar.",
      );
      return;
    }

    setLoading(true);
    try {
      const blob = await pdf(
<<<<<<< HEAD
        <MyDocument data={data} fechas={fechas} />,
=======
        <KardexDocument 
          data={data} 
          material={material} 
          fechas={fechas}
          logoBase64={logoBase64}
        />
>>>>>>> Martin3
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
