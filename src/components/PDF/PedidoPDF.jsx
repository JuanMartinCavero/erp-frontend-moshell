// src/components/PedidoPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Colores MOSHELL
const COLORS = {
  primary: '#1A3A5C',
  secondary: '#4A5A6A',
  accent: '#2D8F6F',
  warning: '#E8A838',
  danger: '#C94A4A',
  lightBg: '#F5F7FA',
  border: '#E2E8F0',
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
  // ===== INFO CLIENTE =====
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
  colProducto: { width: '22%' },
  colTalla: { width: '10%' },
  colColor: { width: '13%' },
  colCantidad: { width: '10%' },
  colPrecio: { width: '15%' },
  colTotal: { width: '15%' },
  colPeso: { width: '15%' },
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

const PedidoPDF = ({ pedido, logoBase64 }) => {
  const detalles = pedido.detalles || pedido.items || [];
  
  let subtotalCalculado = 0;
  detalles.forEach(detalle => {
    const cantidad = Number(detalle.cantidad) || 0;
    const precio = Number(detalle.precio_unitario) || 0;
    subtotalCalculado += cantidad * precio;
  });
  
  const subtotal = subtotalCalculado > 0 ? subtotalCalculado : (Number(pedido.subtotal) || Number(pedido.total) || 0);
  const igv = Number(pedido.igv) || (subtotal * 0.18);
  const total = Number(pedido.total) || (subtotal + igv);
  const adelanto = total / 2;
  const restante = total / 2;

  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-PE");
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
            <Text style={styles.headerRightBold}>PEDIDO DE CLIENTE</Text>
            <Text>N°: {pedido.numero_pedido || pedido.id || 'N/A'}</Text>
            <Text>Fecha: {formatFecha(pedido.fecha_pedido)}</Text>
          </View>
        </View>

        {/* ===== INFO CLIENTE ===== */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cliente:</Text>
              <Text style={styles.infoValue}>{pedido.cliente?.nombre || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>RUC:</Text>
              <Text style={styles.infoValue}>{pedido.cliente?.identificacion_fiscal || '-'}</Text>
            </View>
          </View>
          <View style={styles.infoCol}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Teléfono:</Text>
              <Text style={styles.infoValue}>{pedido.cliente?.telefono || '-'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dirección:</Text>
              <Text style={styles.infoValue}>{pedido.cliente?.direccion || '-'}</Text>
            </View>
          </View>
        </View>

        {/* ===== TABLA DE PRODUCTOS ===== */}
        <Text style={styles.sectionTitle}>DETALLE DE PRODUCTOS</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colProducto]}>Producto</Text>
            <Text style={[styles.tableHeaderText, styles.colTalla]}>Talla</Text>
            <Text style={[styles.tableHeaderText, styles.colColor]}>Color</Text>
            <Text style={[styles.tableHeaderText, styles.colCantidad]}>Cant.</Text>
            <Text style={[styles.tableHeaderText, styles.colPrecio]}>Precio</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
            <Text style={[styles.tableHeaderText, styles.colPeso]}>Peso (kg)</Text>
          </View>
          {detalles.map((detalle, idx) => {
            const cantidad = Number(detalle.cantidad) || 0;
            const precio = Number(detalle.precio_unitario) || 0;
            const totalItem = cantidad * precio;
            return (
              <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowEven}>
                <Text style={[styles.cellLeft, styles.colProducto]}>{detalle.producto || '-'}</Text>
                <Text style={[styles.cell, styles.colTalla]}>{detalle.talla || '-'}</Text>
                <Text style={[styles.cell, styles.colColor]}>{detalle.color || '-'}</Text>
                <Text style={[styles.cellRight, styles.colCantidad]}>{cantidad}</Text>
                <Text style={[styles.cellRight, styles.colPrecio]}>S/ {precio.toFixed(2)}</Text>
                <Text style={[styles.cellRight, styles.colTotal]}>S/ {totalItem.toFixed(2)}</Text>
                <Text style={[styles.cellRight, styles.colPeso]}>{detalle.peso || 0}</Text>
              </View>
            );
          })}
          {detalles.length === 0 && (
            <View style={styles.tableRow}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#94A3B8', fontSize: 7, padding: 4 }}>
                No hay productos registrados
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
        {pedido.descripcion && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.sectionTitle}>OBSERVACIONES</Text>
            <Text style={{ fontSize: 8, color: '#4A5A6A' }}>{pedido.descripcion}</Text>
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

export default PedidoPDF;