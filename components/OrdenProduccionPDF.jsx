// src/components/OrdenProduccionPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Logo real del proyecto: src/logo.png (este componente vive en src/components/)
import logoMoshell from '../src/logo.png';

// ============================================================
// TIPOGRAFÍA — si tienes los .ttf de Montserrat en /public/fonts,
// descomenta esto para acercarte aún más al Excel original.
// ------------------------------------------------------------
// Font.register({
//   family: 'Montserrat',
//   fonts: [
//     { src: '/fonts/Montserrat-Regular.ttf', fontWeight: 400 },
//     { src: '/fonts/Montserrat-Bold.ttf', fontWeight: 700 },
//   ],
// });
// const FONT_TITLE = 'Montserrat';
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

// Datos fijos de MOSHELL como emisor/proveedor de la orden de producción.
// (Sección "DATOS DEL PROVEEDOR" de la plantilla — dato fijo de la empresa,
// no depende de la orden.)
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

  // ===== BARRA DE TÍTULO (a todo lo ancho de la página) =====
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

  // ===== TARJETA: N° DE ORDEN + LOGO =====
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

  // ===== DATOS CLIENTE / PROVEEDOR =====
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

  // ===== TABLA — HEADER DE DOBLE FILA =====
  theadWrap: { flexDirection: 'row', height: 26 },
  thMerged: {
    backgroundColor: NAVY,
    borderRight: `1px solid ${GOLD}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thMergedText: {
    fontFamily: FONT_TITLE,
    fontSize: 8,
    color: GOLD,
    textAlign: 'center',
  },
  thTallasWrap: {
    backgroundColor: NAVY,
    borderRight: `1px solid ${GOLD}`,
  },
  thTallasTitle: {
    fontFamily: FONT_TITLE,
    fontSize: 8,
    color: GOLD,
    textAlign: 'center',
    paddingTop: 3,
    paddingBottom: 2,
    borderBottom: `1px solid ${GOLD}`,
  },
  thTallasSub: { flexDirection: 'row', flex: 1 },
  thSubCell: {
    flex: 1,
    fontFamily: FONT_TITLE,
    fontSize: 7.5,
    color: GOLD,
    textAlign: 'center',
    paddingTop: 3,
    borderRight: `1px solid ${GOLD}`,
  },

  // Anchos de columnas (coinciden con las proporciones del Excel)
  colModelo: { width: '17%' },
  colDescripcion: { width: '20%' },
  colTallas: { width: '30%' },
  colUnidad: { width: '11%' },
  colPrecio: { width: '11%' },
  colTotal: { width: '11%', borderRight: 'none' },

  // ===== FILAS DE DATOS =====
  row: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}` },
  rowEven: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}`, backgroundColor: ROW_ALT },
  cell: { fontSize: 7.5, textAlign: 'center', paddingVertical: 4, borderRight: `1px solid ${BORDER}` },
  cellLeft: { fontSize: 7.5, textAlign: 'left', paddingVertical: 4, paddingLeft: 4, borderRight: `1px solid ${BORDER}` },

  // ===== TOTALES (sin caja general — solo el mini-bloque derecho lleva borde) =====
  totalsWrap: { marginTop: 4 },
  totalsRow: { flexDirection: 'row', height: 20 },
  totalBarWide: {
    width: '68%',
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalBarWideText: { fontFamily: FONT_TITLE, fontSize: 10, color: GOLD, letterSpacing: 1 },
  spacerWide: { width: '68%' },
  qtyCell: {
    width: '10%',
    border: `1px solid ${BORDER}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyCellText: { fontSize: 8, color: TEXT_DARK },
  spacerQty: { width: '10%' },
  labelCell: {
    width: '11%',
    backgroundColor: NAVY,
    border: `1px solid ${BORDER}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelCellText: { fontFamily: FONT_TITLE, fontSize: 8, color: GOLD },
  amountCell: {
    width: '11%',
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

export const OrdenProduccionPDF = ({ orden, productos, cliente, logoBase64 }) => {
  const hasProductos = productos && productos.length > 0;
  const logoSrc = logoBase64 || logoMoshell;

  const subtotal = productos?.reduce((sum, p) => sum + (Number(p.total) || 0), 0) || 0;
  const cantidadTotal =
    productos?.reduce(
      (sum, p) =>
        sum + (Number(p.unidad) || Number(p.talla_s || 0) + Number(p.talla_m || 0) + Number(p.talla_l || 0)),
      0
    ) || 0;
  const igv = subtotal * 0.18;
  const total = subtotal + igv;
  const mitadSubtotal = subtotal / 2;
  const igvMitad = mitadSubtotal * 0.18;
  const totalMitad = mitadSubtotal + igvMitad;

  const numeroOrden = orden?.numero_orden || '000-0000';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== BARRA DE TÍTULO ===== */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>ORDEN DE PRODUCCIÓN / MUESTRA  -  MOSHELL</Text>
        </View>

        <View style={styles.content}>
          {/* ===== N° ORDEN + LOGO ===== */}
          <View style={styles.topCard}>
            <View style={styles.numeroBox}>
              <Text style={styles.numeroText}>N° {numeroOrden}</Text>
            </View>
            <Image src={logoSrc} style={styles.logo} />
          </View>

          {/* ===== DATOS CLIENTE / PROVEEDOR ===== */}
          <View style={styles.datosWrap}>
            <View style={styles.datosCol}>
              <Text style={styles.datosHeader}>DATOS DE CLIENTE:</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>RAZÓN SOCIAL: </Text>{cliente?.razon_social || cliente?.nombre || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>RUC: </Text>{cliente?.ruc || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CONTACTO: </Text>{cliente?.contacto || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CELULAR: </Text>{cliente?.celular || cliente?.telefono || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>E-MAIL: </Text>{cliente?.email || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>DIRECCIÓN: </Text>{cliente?.direccion || ''}</Text>
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

          {/* ===== TABLA PRODUCTOS ===== */}
          <View style={styles.theadWrap}>
            <View style={[styles.thMerged, styles.colModelo]}>
              <Text style={styles.thMergedText}>Modelo</Text>
            </View>
            <View style={[styles.thMerged, styles.colDescripcion]}>
              <Text style={styles.thMergedText}>Descripción</Text>
            </View>
            <View style={[styles.thTallasWrap, styles.colTallas]}>
              <Text style={styles.thTallasTitle}>Tallas</Text>
              <View style={styles.thTallasSub}>
                <Text style={styles.thSubCell}>S</Text>
                <Text style={styles.thSubCell}>M</Text>
                <Text style={[styles.thSubCell, { borderRight: 'none' }]}>L</Text>
              </View>
            </View>
            <View style={[styles.thMerged, styles.colUnidad]}>
              <Text style={styles.thMergedText}>Unidad</Text>
            </View>
            <View style={[styles.thMerged, styles.colPrecio]}>
              <Text style={styles.thMergedText}>Precio</Text>
            </View>
            <View style={[styles.thMerged, styles.colTotal]}>
              <Text style={styles.thMergedText}>Total</Text>
            </View>
          </View>

          {hasProductos &&
            productos.map((item, i) => (
              <View key={i} style={i % 2 === 0 ? styles.row : styles.rowEven}>
                <Text style={[styles.cell, styles.colModelo]}>{item.modelo || '-'}</Text>
                <Text style={[styles.cellLeft, styles.colDescripcion]}>{item.descripcion || '-'}</Text>
                <Text style={[styles.cell, { width: '10%' }]}>{item.talla_s || '-'}</Text>
                <Text style={[styles.cell, { width: '10%' }]}>{item.talla_m || '-'}</Text>
                <Text style={[styles.cell, { width: '10%' }]}>{item.talla_l || '-'}</Text>
                <Text style={[styles.cell, styles.colUnidad]}>{item.unidad || '-'}</Text>
                <Text style={[styles.cell, styles.colPrecio]}>S/ {(Number(item.precio) || 0).toFixed(2)}</Text>
                <Text style={[styles.cell, styles.colTotal]}>S/ {(Number(item.total) || 0).toFixed(2)}</Text>
              </View>
            ))}

          {/* ===== TOTALES ===== */}
          <View style={styles.totalsWrap}>
            <View style={styles.totalsRow}>
              <View style={styles.totalBarWide}>
                <Text style={styles.totalBarWideText}>TOTAL</Text>
              </View>
              <View style={styles.qtyCell}>
                <Text style={styles.qtyCellText}>{cantidadTotal}</Text>
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
              <View style={styles.spacerQty} />
              <View style={styles.labelCell}>
                <Text style={styles.labelCellText}>IGV (18%)</Text>
              </View>
              <View style={styles.amountCell}>
                <Text style={styles.amountCellText}>S/. {igv.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.totalsRow}>
              <View style={styles.spacerWide} />
              <View style={styles.spacerQty} />
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

export default OrdenProduccionPDF;