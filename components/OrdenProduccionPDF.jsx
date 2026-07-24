// src/components/OrdenProduccionPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Colores MOSHELL
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
  // ===== GRID 2 COLUMNAS =====
  gridContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 8,
  },
  columna: {
    flex: 1,
  },
  // ===== TÍTULOS DE COLUMNA =====
  colTitle: {
    backgroundColor: '#1A3A5C',
    color: '#FFFFFF',
    padding: 4,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  // ===== TABLAS =====
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
  // ===== ANCHOS PRODUCTOS =====
  colModelo: { width: '18%' },
  colDescripcion: { width: '22%' },
  colS: { width: '8%' },
  colM: { width: '8%' },
  colL: { width: '8%' },
  colUnidad: { width: '12%' },
  colPrecio: { width: '12%' },
  colTotal: { width: '12%' },
  // ===== ANCHOS MATERIALES =====
  colMatCodigo: { width: '18%' },
  colMatDescripcion: { width: '30%' },
  colMatUnidad: { width: '15%' },
  colMatPrecio: { width: '18%' },
  colMatTotal: { width: '19%' },
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

export const OrdenProduccionPDF = ({ orden, productos, materiales, cliente, logoBase64 }) => {
  // Calcular totales
  const subtotal = productos?.reduce((sum, p) => sum + (p.total || 0), 0) || 0;
  const igv = subtotal * 0.18;
  const total = subtotal + igv;
  const adelanto = total / 2;
  const restante = total / 2;

  // Totales materiales
  const subtotalMat = materiales?.reduce((sum, m) => sum + (m.total || 0), 0) || 0;
  const igvMat = subtotalMat * 0.18;
  const totalMat = subtotalMat + igvMat;
  const adelantoMat = totalMat / 2;
  const restanteMat = totalMat / 2;

  const hasProductos = productos && productos.length > 0;
  const hasMateriales = materiales && materiales.length > 0;

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
            <Text style={styles.headerRightBold}>ORDEN DE PRODUCCIÓN</Text>
            <Text>N°: {orden?.numero_orden || 'N/A'}</Text>
            <Text>Fecha: {orden?.fecha ? new Date(orden.fecha).toLocaleDateString('es-ES') : new Date().toLocaleDateString('es-ES')}</Text>
            <Text>Cliente: {cliente?.nombre || cliente?.empresa || 'N/A'}</Text>
          </View>
        </View>

        {/* ===== GRID 2 COLUMNAS ===== */}
        <View style={styles.gridContainer}>
          
          {/* ============================================================ */}
          {/* COLUMNA IZQUIERDA: PRODUCTOS */}
          {/* ============================================================ */}
          <View style={styles.columna}>
            <Text style={styles.colTitle}>ORDEN DE PRODUCCIÓN / MUESTRA</Text>

            {/* Tabla de Productos */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.colModelo]}>Modelo</Text>
                <Text style={[styles.tableHeaderText, styles.colDescripcion]}>Descripción</Text>
                <Text style={[styles.tableHeaderText, styles.colS]}>S</Text>
                <Text style={[styles.tableHeaderText, styles.colM]}>M</Text>
                <Text style={[styles.tableHeaderText, styles.colL]}>L</Text>
                <Text style={[styles.tableHeaderText, styles.colUnidad]}>Unidad</Text>
                <Text style={[styles.tableHeaderText, styles.colPrecio]}>Precio</Text>
                <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
              </View>

              {hasProductos ? (
                productos.map((item, i) => (
                  <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowEven}>
                    <Text style={[styles.cell, styles.colModelo]}>{item.modelo || '-'}</Text>
                    <Text style={[styles.cellLeft, styles.colDescripcion]}>{item.descripcion || '-'}</Text>
                    <Text style={[styles.cell, styles.colS]}>{item.talla_s || '-'}</Text>
                    <Text style={[styles.cell, styles.colM]}>{item.talla_m || '-'}</Text>
                    <Text style={[styles.cell, styles.colL]}>{item.talla_l || '-'}</Text>
                    <Text style={[styles.cell, styles.colUnidad]}>{item.unidad || 'u'}</Text>
                    <Text style={[styles.cell, styles.colPrecio]}>S/ {(item.precio || 0).toFixed(2)}</Text>
                    <Text style={[styles.cell, styles.colTotal]}>S/ {(item.total || 0).toFixed(2)}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.tableRow}>
                  <Text style={{ width: '100%', textAlign: 'center', color: '#94A3B8', fontSize: 7, padding: 4 }}>
                    No hay productos registrados
                  </Text>
                </View>
              )}
            </View>

            {/* Totales Productos */}
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

            {/* Adelantos Productos */}
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

          </View>




        </View>

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

export default OrdenProduccionPDF;