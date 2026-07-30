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
    marginTop: 6,
  },
  thText: {
    fontFamily: FONT_TITLE,
    fontSize: 8,
    color: GOLD,
    textAlign: 'center',
  },

  colProducto: { width: '22%' },
  colTalla: { width: '12%' },
  colColor: { width: '15%' },
  colCantidad: { width: '12%' },
  colPrecio: { width: '15%' },
  colPeso: { width: '12%' },

  colMuestraVersion: { width: '15%' },
  colMuestraTipo: { width: '20%' },
  colMuestraEstado: { width: '20%' },
  colMuestraFeedback: { width: '45%' },

  row: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}` },
  rowEven: { flexDirection: 'row', borderBottom: `1px solid ${BORDER}`, backgroundColor: ROW_ALT },
  cell: { fontSize: 7.5, textAlign: 'center', paddingVertical: 4, borderRight: `1px solid ${BORDER}` },
  cellLeft: { fontSize: 7.5, textAlign: 'left', paddingVertical: 4, paddingLeft: 4, borderRight: `1px solid ${BORDER}` },

  badgeApproved: { backgroundColor: '#2D8F6F', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 7 },
  badgePending: { backgroundColor: '#E8A838', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 7 },
  badgeRejected: { backgroundColor: '#C94A4A', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 7 },

  coloresWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4, marginBottom: 8 },
  colorCircle: { width: 14, height: 14, borderRadius: 7 },

  obsBox: { marginTop: 8, padding: 6, border: `1px solid ${BORDER}`, borderRadius: 4 },
  obsHeader: { fontFamily: FONT_TITLE, fontSize: 8, color: TEXT_DARK, marginBottom: 2 },
  obsText: { fontSize: 7.5, color: TEXT_DARK },

  footer: {
    marginTop: 22,
    paddingTop: 8,
    borderTop: `1px solid ${BORDER}`,
    textAlign: 'center',
    fontSize: 7,
    color: '#7C8AA0',
  },
});

// ✅ FUNCIÓN SEGURA PARA FORMATEAR PRECIO
const formatPrice = (price) => {
  if (price === null || price === undefined) return 'S/ 0.00';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(num)) return 'S/ 0.00';
  return `S/ ${num.toFixed(2)}`;
};

// ✅ FUNCIÓN SEGURA PARA FORMATEAR NÚMEROS
const formatNumber = (value) => {
  if (value === null || value === undefined) return 0;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 0;
  return num;
};

export const FichaTecnicaPDF = ({ techSheet, cliente, pedido, materiales, muestras, logoBase64 }) => {
  const logoSrc = logoBase64 || logoMoshell;

  const detallesPedido = pedido?.detalles || [];

  const getColores = () => {
    if (!detallesPedido.length) return [];
    const colors = detallesPedido
      .map(d => d.color)
      .filter(color => color && color.trim() !== '');
    return [...new Set(colors)];
  };
  const colores = getColores();

  const getTallas = () => {
    if (!detallesPedido.length) return [];
    const tallas = detallesPedido
      .map(d => d.talla)
      .filter(talla => talla && talla.trim() !== '');
    return [...new Set(tallas)];
  };
  const tallas = getTallas();

  const subtotal = pedido?.subtotal || 0;
  const igv = pedido?.igv || 0;
  const total = pedido?.total || 0;
  const adelanto = pedido?.adelanto_50 || 0;
  const saldo = pedido?.saldo || 0;

  const imagenes = techSheet?.images ? (
    typeof techSheet.images === 'string' ? JSON.parse(techSheet.images) : techSheet.images
  ) : [];

  const muestrasActivas = muestras || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>FICHA TÉCNICA - MOSHELL</Text>
        </View>

        <View style={styles.content}>
          {/* REFERENCIA + LOGO */}
          <View style={styles.topCard}>
            <View style={styles.refBox}>
              <Text style={styles.refText}>Ref: {techSheet?.reference || 'N/A'}</Text>
            </View>
            <Image src={logoSrc} style={styles.logo} />
          </View>

          {/* DATOS CLIENTE / PROVEEDOR */}
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

          {/* INFORMACIÓN DEL PRODUCTO */}
          <View style={{ marginBottom: 8, padding: 6, backgroundColor: ROW_ALT, borderRadius: 4 }}>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Producto:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{techSheet?.name || 'N/A'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Pedido:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{pedido?.numero_pedido || 'Sin asignar'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Temporada:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{techSheet?.season || 'N/A'}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Estado:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{techSheet?.development_status || 'N/A'}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 80, fontFamily: FONT_TITLE, fontSize: 7.5, color: TEXT_DARK }}>Cantidad:</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{pedido?.cantidad || techSheet?.estimated_quantity || 'N/A'}</Text>
            </View>
          </View>

          {/* ESPECIFICACIONES TÉCNICAS + COLORES */}
          <View style={{ marginBottom: 8, padding: 6, border: `1px solid ${BORDER}`, borderRadius: 4 }}>
            <Text style={{ fontFamily: FONT_TITLE, fontSize: 8, color: TEXT_DARK, marginBottom: 4 }}>ESPECIFICACIONES TÉCNICAS</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>Composición: {techSheet?.composition || 'N/A'}</Text>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>Peso: {techSheet?.weight || 'N/A'}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>Tipo Tejido: {techSheet?.knit_type || 'N/A'}</Text>
              {colores.length > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>Colores:</Text>
                  {colores.map((color, idx) => (
                    <View key={idx} style={[styles.colorCircle, { backgroundColor: color.toLowerCase() }]} />
                  ))}
                </View>
              )}
            </View>
            {tallas.length > 0 && (
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>Tallas: </Text>
                <Text style={{ fontSize: 7.5, color: TEXT_DARK }}>{tallas.join(', ')}</Text>
              </View>
            )}
          </View>

          {/* DETALLE DE PRODUCTOS */}
          <Text style={{ fontFamily: FONT_TITLE, fontSize: 9, color: NAVY, marginBottom: 4, marginTop: 6 }}>
            DETALLE DE PRODUCTOS
          </Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colProducto]}>Producto</Text>
            <Text style={[styles.thText, styles.colTalla]}>Talla</Text>
            <Text style={[styles.thText, styles.colColor]}>Color</Text>
            <Text style={[styles.thText, styles.colCantidad]}>Cant.</Text>
            <Text style={[styles.thText, styles.colPrecio]}>Precio</Text>
            <Text style={[styles.thText, styles.colPeso]}>Peso</Text>
          </View>

          {detallesPedido.length > 0 ? (
            detallesPedido.map((detalle, i) => (
              <View key={i} style={i % 2 === 0 ? styles.row : styles.rowEven}>
                <Text style={[styles.cellLeft, styles.colProducto]}>{detalle.producto || '-'}</Text>
                <Text style={[styles.cell, styles.colTalla]}>{detalle.talla || '-'}</Text>
                <Text style={[styles.cell, styles.colColor]}>{detalle.color || '-'}</Text>
                <Text style={[styles.cell, styles.colCantidad]}>{formatNumber(detalle.cantidad)}</Text>
                <Text style={[styles.cell, styles.colPrecio]}>{formatPrice(detalle.precio_unitario)}</Text>
                <Text style={[styles.cell, styles.colPeso]}>{formatNumber(detalle.peso)} kg</Text>
              </View>
            ))
          ) : (
            <View style={styles.row}>
              <Text style={{ width: '100%', textAlign: 'center', color: '#7C8AA0', fontSize: 7, padding: 8 }}>
                No hay productos definidos en el pedido
              </Text>
            </View>
          )}

          {/* TOTALES DEL PEDIDO */}
          <View style={{ marginTop: 8, padding: 6, backgroundColor: ROW_ALT, borderRadius: 4, border: `1px solid ${BORDER}` }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 7.5, fontFamily: FONT_TITLE, color: TEXT_DARK }}>
                Subtotal: S/ {formatNumber(subtotal).toFixed(2)}
              </Text>
              <Text style={{ fontSize: 7.5, fontFamily: FONT_TITLE, color: TEXT_DARK }}>
                IGV: S/ {formatNumber(igv).toFixed(2)}
              </Text>
              <Text style={{ fontSize: 10, fontFamily: FONT_TITLE, color: NAVY }}>
                TOTAL: S/ {formatNumber(total).toFixed(2)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, flexWrap: 'wrap', marginTop: 4 }}>
              <Text style={{ fontSize: 7, color: TEXT_DARK }}>Adelanto: S/ {formatNumber(adelanto).toFixed(2)}</Text>
              <Text style={{ fontSize: 7, color: TEXT_DARK }}>Saldo: S/ {formatNumber(saldo).toFixed(2)}</Text>
              <Text style={{ fontSize: 7, fontFamily: FONT_TITLE, color: TEXT_DARK }}>
                Estado Pago: {pedido?.estado_pago || 'Pendiente'}
              </Text>
            </View>
          </View>

          {/* IMÁGENES DE REFERENCIA */}
          {imagenes.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontFamily: FONT_TITLE, fontSize: 8, color: TEXT_DARK, marginBottom: 4 }}>
                IMÁGENES DE REFERENCIA
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                {imagenes.slice(0, 4).map((img, idx) => (
                  <View key={idx} style={{ width: 40, height: 40, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: 'hidden' }}>
                    <Image src={img} style={{ width: 40, height: 40, objectFit: 'cover' }} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* MUESTRAS */}
          <View style={[styles.tableHeader, { marginTop: 12 }]}>
            <Text style={[styles.thText, styles.colMuestraVersion]}>Versión</Text>
            <Text style={[styles.thText, styles.colMuestraTipo]}>Tipo</Text>
            <Text style={[styles.thText, styles.colMuestraEstado]}>Estado</Text>
            <Text style={[styles.thText, styles.colMuestraFeedback]}>Feedback</Text>
          </View>

          {muestrasActivas.length > 0 ? (
            muestrasActivas.map((muestra, i) => {
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

          {/* OBSERVACIONES */}
          {techSheet?.description && (
            <View style={styles.obsBox}>
              <Text style={styles.obsHeader}>OBSERVACIONES</Text>
              <Text style={styles.obsText}>{techSheet.description}</Text>
            </View>
          )}

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

export default FichaTecnicaPDF;