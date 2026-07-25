// src/pages/FichaTecnica/components/FichaTecnicaPDF.jsx
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

// Datos fijos de MOSHELL
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

  // ===== TARJETA: REFERENCIA + LOGO =====
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
  refBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  refText: {
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

  // ===== ANCHOS DE COLUMNAS (Materiales) =====
  colMatCodigo: { width: '15%' },
  colMatNombre: { width: '25%' },
  colMatUnidad: { width: '15%' },
  colMatCantidad: { width: '20%' },
  colMatProveedor: { width: '25%' },

  // ===== ANCHOS DE COLUMNAS (Muestras) =====
  colMuestraVersion: { width: '15%' },
  colMuestraTipo: { width: '20%' },
  colMuestraEstado: { width: '20%' },
  colMuestraFeedback: { width: '45%' },

  // ===== FILAS DE DATOS =====
  row: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}` },
  rowEven: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}`, backgroundColor: ROW_ALT },
  cell: { fontSize: 7.5, textAlign: 'center', paddingVertical: 4, borderRight: `1px solid ${BORDER}` },
  cellLeft: { fontSize: 7.5, textAlign: 'left', paddingVertical: 4, paddingLeft: 4, borderRight: `1px solid ${BORDER}` },

  // ===== ESTADO BADGE =====
  badgeApproved: { backgroundColor: '#2D8F6F', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 7 },
  badgePending: { backgroundColor: '#E8A838', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 7 },
  badgeRejected: { backgroundColor: '#C94A4A', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 7 },

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

export const FichaTecnicaPDF = ({ techSheet, cliente, pedido, materiales, muestras, logoBase64 }) => {
  const logoSrc = logoBase64 || logoMoshell;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== BARRA DE TÍTULO ===== */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>FICHA TÉCNICA RESUMEN - MOSHELL</Text>
        </View>

        <View style={styles.content}>
          {/* ===== REFERENCIA + LOGO ===== */}
          <View style={styles.topCard}>
            <View style={styles.refBox}>
              <Text style={styles.refText}>Ref: {techSheet?.reference || 'N/A'}</Text>
            </View>
            <Image src={logoSrc} style={styles.logo} />
          </View>

          {/* ===== DATOS CLIENTE / PROVEEDOR ===== */}
          <View style={styles.datosWrap}>
            <View style={styles.datosCol}>
              <Text style={styles.datosHeader}>DATOS DEL CLIENTE:</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>RAZÓN SOCIAL: </Text>{cliente?.razon_social || cliente?.nombre || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>RUC: </Text>{cliente?.identificacion_fiscal || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CONTACTO: </Text>{cliente?.contacto || ''}</Text>
              <Text style={styles.datosLine}><Text style={styles.datosLabel}>CELULAR: </Text>{cliente?.telefono || ''}</Text>
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

          {/* ===== INFORMACIÓN DEL PRODUCTO ===== */}
          <View style={{ marginBottom: 10, padding: 6, backgroundColor: ROW_ALT, borderRadius: 4 }}>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Producto:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{techSheet?.name || 'N/A'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Pedido:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{pedido?.numero_pedido || 'Sin asignar'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Cantidad:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{pedido?.cantidad || techSheet?.estimated_quantity || 'N/A'}</Text>
            </View>
          </View>

          {/* ===== MATERIALES ===== */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colMatCodigo]}>Código</Text>
            <Text style={[styles.thText, styles.colMatNombre]}>Material</Text>
            <Text style={[styles.thText, styles.colMatUnidad]}>Unidad</Text>
            <Text style={[styles.thText, styles.colMatCantidad]}>Cantidad</Text>
            <Text style={[styles.thText, styles.colMatProveedor]}>Proveedor</Text>
          </View>

          {(materiales || []).length > 0 ? (
            materiales.map((material, i) => (
              <View key={i} style={i % 2 === 0 ? styles.row : styles.rowEven}>
                <Text style={[styles.cell, styles.colMatCodigo]}>{material.codigo || '-'}</Text>
                <Text style={[styles.cellLeft, styles.colMatNombre]}>{material.nombre}</Text>
                <Text style={[styles.cell, styles.colMatUnidad]}>{material.unidad || 'u'}</Text>
                <Text style={[styles.cell, styles.colMatCantidad]}>{material.pivot?.cantidad_estimada || '-'}</Text>
                <Text style={[styles.cellLeft, styles.colMatProveedor]}>{material.proveedor?.nombre || '-'}</Text>
              </View>
            ))
          ) : (
            <View style={styles.row}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#7C8AA0', fontSize: 7, padding: 8 }}>
                No hay materiales definidos
              </Text>
            </View>
          )}

          {/* ===== MUESTRAS ===== */}
          <View style={[styles.tableHeader, { marginTop: 12 }]}>
            <Text style={[styles.thText, styles.colMuestraVersion]}>Versión</Text>
            <Text style={[styles.thText, styles.colMuestraTipo]}>Tipo</Text>
            <Text style={[styles.thText, styles.colMuestraEstado]}>Estado</Text>
            <Text style={[styles.thText, styles.colMuestraFeedback]}>Feedback</Text>
          </View>

          {(muestras || []).length > 0 ? (
            muestras.map((muestra, i) => {
              const isApproved = muestra.status === 'APPROVED';
              const isRejected = muestra.status === 'REJECTED';
              const isPending = muestra.status === 'PENDING';
              return (
                <View key={i} style={i % 2 === 0 ? styles.row : styles.rowEven}>
                  <Text style={[styles.cell, styles.colMuestraVersion]}>v{muestra.version}</Text>
                  <Text style={[styles.cell, styles.colMuestraTipo]}>{muestra.tipo_muestra || muestra.type || 'N/A'}</Text>
                  <View style={[styles.cell, styles.colMuestraEstado, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={[
                      isApproved ? styles.badgeApproved : 
                      isRejected ? styles.badgeRejected : 
                      styles.badgePending
                    ]}>
                      {muestra.status || 'PENDING'}
                    </Text>
                  </View>
                  <Text style={[styles.cellLeft, styles.colMuestraFeedback, { fontSize: 7, paddingLeft: 4 }]}>
                    {muestra.feedback || '-'}
                  </Text>
                </View>
              );
            })
          ) : (
            <View style={styles.row}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#7C8AA0', fontSize: 7, padding: 8 }}>
                No hay muestras registradas
              </Text>
            </View>
          )}

          {/* ===== OBSERVACIONES ===== */}
          {techSheet?.description && (
            <View style={styles.obsBox}>
              <Text style={styles.obsHeader}>OBSERVACIONES</Text>
              <Text style={styles.obsText}>{techSheet.description}</Text>
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

export default FichaTecnicaPDF;