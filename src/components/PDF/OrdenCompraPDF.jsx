// src/components/OrdenCompraPDF.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Colores MOSHELL
const COLORS = {
  primary: '#1A3A5C',      // Azul oscuro
  secondary: '#4A5A6A',    // Gris acero
  accent: '#2D8F6F',       // Verde MOSHELL
  warning: '#E8A838',      // Ámbar
  danger: '#C94A4A',       // Rojo
  lightBg: '#F5F7FA',      // Fondo claro
  border: '#E2E8F0',       // Borde
  white: '#FFFFFF',
  text: '#1A3A5C',
  textLight: '#4A5A6A',
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  // ===== HEADER =====
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '3px solid #1A3A5C',
    paddingBottom: 8,
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 60,
    height: 40,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A3A5C',
  },
  headerRight: {
    textAlign: 'right',
    fontSize: 8,
    color: '#4A5A6A',
  },
  headerRightBold: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1A3A5C',
  },
  // ===== INFO PROVEEDOR =====
  infoGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#F5F7FA',
    borderRadius: 4,
    border: '1px solid #E2E8F0',
  },
  infoCol: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  infoLabel: {
    width: 70,
    fontWeight: 'bold',
    fontSize: 8,
    color: '#4A5A6A',
  },
  infoValue: {
    fontSize: 8,
    color: '#1A3A5C',
  },
  // ===== TÍTULO DE SECCIÓN =====
  sectionTitle: {
    backgroundColor: '#1A3A5C',
    color: '#FFFFFF',
    padding: 4,
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 8,
  },
  // ===== TABLA =====
  table: {
    width: '100%',
    marginBottom: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4A5A6A',
    padding: 4,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #E2E8F0',
    padding: 3,
  },
  tableRowEven: {
    flexDirection: 'row',
    borderBottom: '1px solid #E2E8F0',
    padding: 3,
    backgroundColor: '#F5F7FA',
  },
  cell: {
    fontSize: 7,
    textAlign: 'center',
  },
  cellLeft: {
    fontSize: 7,
    textAlign: 'left',
    paddingLeft: 4,
  },
  cellRight: {
    fontSize: 7,
    textAlign: 'right',
    paddingRight: 4,
  },
  // ===== ANCHOS =====
  colInsumo: { width: '22%' },
  colCalidad: { width: '18%' },
  colColor: { width: '15%' },
  colCantidad: { width: '10%' },
  colPrecio: { width: '15%' },
  colTotal: { width: '20%' },
  // ===== TOTALES =====
  totalesBox: {
    marginTop: 6,
    padding: 6,
    backgroundColor: '#F5F7FA',
    border: '1px solid #E2E8F0',
    borderRadius: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 2,
  },
  totalLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#4A5A6A',
    width: 80,
    textAlign: 'right',
    marginRight: 10,
  },
  totalValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1A3A5C',
    width: 70,
    textAlign: 'right',
  },
  totalGrande: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A3A5C',
  },
  // ===== ADELANTOS =====
  adelantoBox: {
    marginTop: 4,
    padding: 6,
    backgroundColor: '#E8F0F8',
    border: '1px solid #1A3A5C',
    borderRadius: 4,
  },
  adelantoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
  },
  adelantoLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1A3A5C',
  },
  adelantoValue: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1A3A5C',
  },
  // ===== ESTADO BADGE =====
  badge: {
    padding: '2px 8px',
    borderRadius: 12,
    fontSize: 7,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // ===== FOOTER =====
  footer: {
    marginTop: 20,
    paddingTop: 8,
    borderTop: '1px solid #E2E8F0',
    textAlign: 'center',
    fontSize: 7,
    color: '#94A3B8',
  },
});

const OrdenCompraPDF = ({ orden, logoBase64 }) => {
  const detalles = orden.detalles || [];

  let subtotalCalculado = 0;
  detalles.forEach((detalle) => {
    const cantidad = Number(detalle.cantidad_conos) || 0;
    const precio = Number(detalle.precio_unitario) || 0;
    subtotalCalculado += cantidad * precio;
  });

  const subtotal = subtotalCalculado > 0 ? subtotalCalculado : Number(orden.subtotal) || 0;
  const igv = subtotal * 0.18;
  const total = subtotal + igv;
  const adelanto = total / 2;
  const restante = total / 2;

  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-PE");
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente": return '#E8A838';
      case "aprobada": return '#2D8F6F';
      case "recibida": return '#1A3A5C';
      case "anulada": return '#4A5A6A';
      default: return '#4A5A6A';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
            <Text style={styles.headerTitle}>MOSHELL</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightBold}>ORDEN DE COMPRA</Text>
            <Text>N°: {orden.orden_id || orden.id || 'N/A'}</Text>
            <Text>Fecha: {formatFecha(orden.fecha_orden)}</Text>
          </View>
        </View>

        {/* ===== INFO PROVEEDOR ===== */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Proveedor:</Text>
              <Text style={styles.infoValue}>{orden.proveedor?.razon_social || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>RUC:</Text>
              <Text style={styles.infoValue}>{orden.proveedor?.ruc || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Contacto:</Text>
              <Text style={styles.infoValue}>{orden.proveedor_contacto || '-'}</Text>
            </View>
          </View>
          <View style={styles.infoCol}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Teléfono:</Text>
              <Text style={styles.infoValue}>{orden.proveedor?.telefono || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Entrega:</Text>
              <Text style={styles.infoValue}>{formatFecha(orden.fecha_entrega)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estado:</Text>
              <Text style={[styles.infoValue, { color: getEstadoColor(orden.estado), fontWeight: 'bold' }]}>
                {orden.estado || 'pendiente'}
              </Text>
            </View>
          </View>
        </View>

        {/* ===== TABLA DE INSUMOS ===== */}
        <Text style={styles.sectionTitle}>DETALLE DE INSUMOS</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colInsumo]}>Insumo</Text>
            <Text style={[styles.tableHeaderText, styles.colCalidad]}>Calidad</Text>
            <Text style={[styles.tableHeaderText, styles.colColor]}>Color</Text>
            <Text style={[styles.tableHeaderText, styles.colCantidad]}>Cant.</Text>
            <Text style={[styles.tableHeaderText, styles.colPrecio]}>Precio</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
          </View>
          {detalles.map((detalle, idx) => {
            const cantidad = Number(detalle.cantidad_conos) || 0;
            const precio = Number(detalle.precio_unitario) || 0;
            const totalItem = cantidad * precio;
            return (
              <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowEven}>
                <Text style={[styles.cellLeft, styles.colInsumo]}>{detalle.titulo || '-'}</Text>
                <Text style={[styles.cell, styles.colCalidad]}>{detalle.calidad || '-'}</Text>
                <Text style={[styles.cell, styles.colColor]}>{detalle.color || '-'}</Text>
                <Text style={[styles.cellRight, styles.colCantidad]}>{cantidad}</Text>
                <Text style={[styles.cellRight, styles.colPrecio]}>S/ {precio.toFixed(2)}</Text>
                <Text style={[styles.cellRight, styles.colTotal]}>S/ {totalItem.toFixed(2)}</Text>
              </View>
            );
          })}
          {detalles.length === 0 && (
            <View style={styles.tableRow}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#94A3B8', fontSize: 7, padding: 4 }}>
                No hay insumos registrados
              </Text>
            </View>
          )}
        </View>

        {/* ===== TOTALES ===== */}
        <View style={styles.totalesBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SUBTOTAL</Text>
            <Text style={styles.totalValue}>S/ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IGV (18%)</Text>
            <Text style={styles.totalValue}>S/ {igv.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontSize: 11 }]}>TOTAL</Text>
            <Text style={[styles.totalValue, styles.totalGrande]}>S/ {total.toFixed(2)}</Text>
          </View>
        </View>

        {/* ===== ADELANTOS ===== */}
        <View style={styles.adelantoBox}>
          <View style={styles.adelantoRow}>
            <Text style={styles.adelantoLabel}>50% ADELANTO</Text>
            <Text style={styles.adelantoValue}>S/ {adelanto.toFixed(2)}</Text>
          </View>
          <View style={styles.adelantoRow}>
            <Text style={styles.adelantoLabel}>IGV (18%)</Text>
            <Text style={styles.adelantoValue}>S/ {(adelanto * 0.18).toFixed(2)}</Text>
          </View>
          <View style={[styles.adelantoRow, { borderTop: '1px solid #1A3A5C', paddingTop: 3 }]}>
            <Text style={[styles.adelantoLabel, { fontSize: 10 }]}>TOTAL ADELANTO</Text>
            <Text style={[styles.adelantoValue, { fontSize: 10, fontWeight: 'bold' }]}>S/ {(adelanto + (adelanto * 0.18)).toFixed(2)}</Text>
          </View>
        </View>

      

        {/* ===== OBSERVACIONES ===== */}
        {orden.observaciones && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.sectionTitle}>OBSERVACIONES</Text>
            <Text style={{ fontSize: 8, color: '#4A5A6A' }}>{orden.observaciones}</Text>
          </View>
        )}

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <Text>MOSHELL — ERP de Gestión de Producción Textil</Text>
          <Text>Documento generado automáticamente el {new Date().toLocaleString('es-ES')}</Text>
          <Text>___________________________________</Text>
          <Text style={{ fontWeight: 'bold', color: '#1A3A5C' }}>Firma Autorizada</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrdenCompraPDF;
