// src/components/PedidoPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Logo real del proyecto
import logoMoshell from '../../../src/logo.png';

// ============================================================
// TIPOGRAFÍA
// ============================================================
const FONT_TITLE = 'Helvetica-Bold';
const FONT_BODY = 'Helvetica';

// ============================================================
// PALETA MOSHELL
// ============================================================
const NAVY = '#0F3A63';
const GOLD = '#F2C230';
const BORDER = '#0F3A63';
const TEXT_DARK = '#1A2530';
const ROW_ALT = '#F3F6FA';

// Datos fijos de MOSHELL como emisor
const MOSHELL_INFO = {
  razonSocial: 'INDUSTRIA TEXTILES MOSHELL S.A.C',
  ruc: '20449230257',
  contacto: 'Mario Suico / Olenka Tasayco / Ana Bautista',
  celular: '+51 983 443 638',
  email: 'info@textilmoshell.com',
  direccion: 'Jr. Abtao 1357 - La Victoria',
};

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

  // ===== BARRA DE TÍTULO =====
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

  // ===== TARJETA: N° DE PEDIDO + LOGO =====
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

  // ===== DATOS CLIENTE (MOSHELL) / CLIENTE =====
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

  // ===== TABLA - HEADER =====
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

  // ===== ANCHOS DE COLUMNAS =====
  colProducto: { width: '20%' },
  colTalla: { width: '10%' },
  colColor: { width: '13%' },
  colCantidad: { width: '10%' },
  colPrecio: { width: '13%' },
  colTotal: { width: '14%' },
  colPeso: { width: '20%' },

  // ===== FILAS DE DATOS =====
  row: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}` },
  rowEven: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}`, backgroundColor: ROW_ALT },
  cell: { fontSize: 7.5, textAlign: 'center', paddingVertical: 4, borderRight: `1px solid ${BORDER}` },
  cellLeft: { fontSize: 7.5, textAlign: 'left', paddingVertical: 4, paddingLeft: 4, borderRight: `1px solid ${BORDER}` },
  cellRight: { fontSize: 7.5, textAlign: 'right', paddingVertical: 4, paddingRight: 4, borderRight: `1px solid ${BORDER}` },

  // ===== TOTALES =====
  totalsWrap: { marginTop: 4 },
  totalsRow: { flexDirection: 'row', height: 20 },
  totalBarWide: {
    width: '63%',
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalBarWideText: { fontFamily: FONT_TITLE, fontSize: 10, color: GOLD, letterSpacing: 1 },
  spacerWide: { width: '63%' },
  labelCell: {
    width: '15%',
    backgroundColor: NAVY,
    border: `1px solid ${BORDER}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelCellText: { fontFamily: FONT_TITLE, fontSize: 8, color: GOLD },
  amountCell: {
    width: '22%',
    border: `1px solid ${BORDER}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCellText: { fontSize: 8, color: TEXT_DARK },

  // ===== ADELANTO / RESTANTE =====
  adelantoWrap: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  adelantoCol: { width: '46%' },
  adelantoHeader: { fontFamily: FONT_TITLE, fontSize: 8.5, color: TEXT_DARK, marginBottom: 3 },
  adelantoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  adelantoRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 3,
    backgroundColor: GOLD,
    marginTop: 1,
  },
  adelantoLabel: { fontSize: 7.5, fontFamily: FONT_TITLE, color: TEXT_DARK, textTransform: 'uppercase' },
  adelantoValue: { fontSize: 7.5, color: TEXT_DARK },

  // ===== OBSERVACIONES =====
  obsBox: { marginTop: 8, padding: 6, border: `1px solid ${BORDER}`, borderRadius: 4 },
  obsHeader: { fontFamily: FONT_TITLE, fontSize: 8, color: TEXT_DARK, marginBottom: 2 },
  obsText: { fontSize: 7.5, color: TEXT_DARK },

  // ===== FOOTER =====
  footer: {
    marginTop: 22,
    paddingTop: 8,
    borderTop: `1px solid ${BORDER}`,
    textAlign: 'center',
    fontSize: 7,
    color: '#7C8AA0',
  },
});

const PedidoPDF = ({ pedido, logoBase64 }) => {
  const detalles = pedido.detalles || pedido.items || [];
  const logoSrc = logoBase64 || logoMoshell;

  let subtotalCalculado = 0;
  detalles.forEach(detalle => {
    const cantidad = Number(detalle.cantidad) || 0;
    const precio = Number(detalle.precio_unitario) || 0;
    subtotalCalculado += cantidad * precio;
  });

  const subtotal = subtotalCalculado > 0 ? subtotalCalculado : (Number(pedido.subtotal) || Number(pedido.total) || 0);
  const igv = Number(pedido.igv) || (subtotal * 0.18);
  const total = Number(pedido.total) || (subtotal + igv);
  const mitadSubtotal = subtotal / 2;
  const igvMitad = mitadSubtotal * 0.18;
  const totalMitad = mitadSubtotal + igvMitad;

  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-PE");
  };

  const numeroPedido = pedido?.numero_pedido || pedido?.id || '000-0000';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== BARRA DE TÍTULO ===== */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>ORDEN DE PEDIDO DE CLIENTE - MOSHELL</Text>
        </View>

        <View style={styles.content}>
          {/* ===== N° PEDIDO + LOGO ===== */}
          <View style={styles.topCard}>
            <View style={styles.numeroBox}>
              <Text style={styles.numeroText}>N° {numeroPedido}</Text>
            </View>
            <Image src={logoSrc} style={styles.logo} />
          </View>

          {/* ===== DATOS CLIENTE (MOSHELL) / CLIENTE ===== */}
          <View style={styles.datosWrap}>
            <View style={styles.datosCol}>
              <Text style={styles.datosHeader}>DATOS DEL CLIENTE:</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>RAZÓN SOCIAL: </Text>{pedido.cliente?.razon_social || pedido.cliente?.nombre || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>RUC: </Text>{pedido.cliente?.identificacion_fiscal || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CONTACTO: </Text>{pedido.cliente?.contacto || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CELULAR: </Text>{pedido.cliente?.telefono || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>E-MAIL: </Text>{pedido.cliente?.email || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>DIRECCIÓN: </Text>{pedido.cliente?.direccion || ''}</Text>
            </View>

            <View style={styles.datosColRight}>
              <Text style={styles.datosHeader}>DATOS DEL PROVEEDOR</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>RAZÓN SOCIAL: </Text>{MOSHELL_INFO.razonSocial}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>RUC: </Text>{MOSHELL_INFO.ruc}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>CONTACTO: </Text>{MOSHELL_INFO.contacto}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>CELULAR: </Text>{MOSHELL_INFO.celular}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>E-MAIL: </Text>{MOSHELL_INFO.email}</Text>
              <Text style={styles.datosLineRight}><Text style={styles.datosLabel}>DIRECCIÓN: </Text>{MOSHELL_INFO.direccion}</Text>
            </View>
          </View>

          {/* ===== TABLA DE PRODUCTOS ===== */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colProducto]}>Producto</Text>
            <Text style={[styles.thText, styles.colTalla]}>Talla</Text>
            <Text style={[styles.thText, styles.colColor]}>Color</Text>
            <Text style={[styles.thText, styles.colCantidad]}>Cant.</Text>
            <Text style={[styles.thText, styles.colPrecio]}>Precio</Text>
            <Text style={[styles.thText, styles.colTotal]}>Total</Text>
            <Text style={[styles.thText, styles.colPeso]}>Peso (kg)</Text>
          </View>

          {detalles.map((detalle, idx) => {
            const cantidad = Number(detalle.cantidad) || 0;
            const precio = Number(detalle.precio_unitario) || 0;
            const totalItem = cantidad * precio;
            return (
              <View key={idx} style={idx % 2 === 0 ? styles.row : styles.rowEven}>
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
            <View style={styles.row}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#7C8AA0', fontSize: 7, padding: 8 }}>
                No hay productos registrados
              </Text>
            </View>
          )}

          {/* ===== TOTALES ===== */}
          <View style={styles.totalsWrap}>
            <View style={styles.totalsRow}>
              <View style={styles.totalBarWide}>
                <Text style={styles.totalBarWideText}>TOTAL</Text>
              </View>
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>SUBTOTAL</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>S/. {subtotal.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>IGV (18%)</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>S/. {igv.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>TOTAL</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={[styles.amountCellText, { fontFamily: FONT_TITLE }]}>S/. {total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* ===== ADELANTO / RESTANTE ===== */}
          <View style={styles.adelantoWrap}>
            <View style={styles.adelantoCol}>
              <Text style={styles.adelantoHeader}>50% ADELANTO</Text>
              <View style={styles.adelantoRow}>
                <Text style={styles.adelantoLabel}>SUBTOTAL / 2</Text>
                <Text style={styles.adelantoValue}>S/ {mitadSubtotal > 0 ? mitadSubtotal.toFixed(2) : '-'}</Text>
              </View>
              <View style={styles.adelantoRow}>
                <Text style={styles.adelantoLabel}>IGV (18%)</Text>
                <Text style={styles.adelantoValue}>S/ {igvMitad > 0 ? igvMitad.toFixed(2) : '-'}</Text>
              </View>
              <View style={styles.adelantoRowFinal}>
                <Text style={styles.adelantoLabel}>TOTAL</Text>
                <Text style={styles.adelantoValue}>S/ {totalMitad > 0 ? totalMitad.toFixed(2) : '-'}</Text>
              </View>
            </View>

            <View style={styles.adelantoCol}>
              <Text style={styles.adelantoHeader}>50% RESTANTE</Text>
              <View style={styles.adelantoRow}>
                <Text style={styles.adelantoLabel}>SUBTOTAL / 2</Text>
                <Text style={styles.adelantoValue}>S/ {mitadSubtotal > 0 ? mitadSubtotal.toFixed(2) : '-'}</Text>
              </View>
              <View style={styles.adelantoRow}>
                <Text style={styles.adelantoLabel}>IGV (18%)</Text>
                <Text style={styles.adelantoValue}>S/ {igvMitad > 0 ? igvMitad.toFixed(2) : '-'}</Text>
              </View>
              <View style={styles.adelantoRowFinal}>
                <Text style={styles.adelantoLabel}>TOTAL</Text>
                <Text style={styles.adelantoValue}>S/ {totalMitad > 0 ? totalMitad.toFixed(2) : '-'}</Text>
              </View>
            </View>
          </View>

          {/* ===== OBSERVACIONES ===== */}
          {pedido.descripcion && (
            <View style={styles.obsBox}>
              <Text style={styles.obsHeader}>OBSERVACIONES</Text>
              <Text style={styles.obsText}>{pedido.descripcion}</Text>
            </View>
          )}

          {/* ===== FOOTER ===== */}
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

export default PedidoPDF;