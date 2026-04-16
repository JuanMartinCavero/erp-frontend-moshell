import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    padding: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  colProducto: { width: '25%' },
  colTalla: { width: '10%' },
  colColor: { width: '15%' },
  colCantidad: { width: '10%', textAlign: 'right' },
  colPrecio: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },
  colPeso: { width: '10%', textAlign: 'right' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    padding: 5,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
});

const PedidoPDF = ({ pedido }) => {
  // Los detalles pueden venir como 'detalles' o 'items' (para compatibilidad)
  const detalles = pedido.detalles || pedido.items || [];
  
  // Calcular subtotal desde los detalles
  let subtotalCalculado = 0;
  detalles.forEach(detalle => {
    const cantidad = Number(detalle.cantidad) || 0;
    const precio = Number(detalle.precio_unitario) || 0;
    subtotalCalculado += cantidad * precio;
  });
  
  // Usar el subtotal calculado o el que viene del pedido
  const subtotal = subtotalCalculado > 0 ? subtotalCalculado : (Number(pedido.subtotal) || Number(pedido.total) || 0);
  const igv = Number(pedido.igv) || (subtotal * 0.18);
  const total = Number(pedido.total) || (subtotal + igv);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PEDIDO DE CLIENTE</Text>
          <Text style={styles.subtitle}>N° {pedido.numero_pedido}</Text>
          <Text style={styles.subtitle}>Fecha: {pedido.fecha_pedido}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATOS DEL CLIENTE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.value}>{pedido.cliente?.nombre || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>RUC:</Text>
            <Text style={styles.value}>{pedido.cliente?.identificacion_fiscal || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{pedido.cliente?.telefono || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{pedido.cliente?.direccion || '-'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DETALLE DE PRODUCTOS</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colProducto}>Producto</Text>
              <Text style={styles.colTalla}>Talla</Text>
              <Text style={styles.colColor}>Color</Text>
              <Text style={styles.colCantidad}>Cant.</Text>
              <Text style={styles.colPrecio}>Precio</Text>
              <Text style={styles.colTotal}>Total</Text>
              <Text style={styles.colPeso}>Peso(kg)</Text>
            </View>
            {detalles.map((detalle, idx) => {
              const cantidad = Number(detalle.cantidad) || 0;
              const precio = Number(detalle.precio_unitario) || 0;
              const totalItem = cantidad * precio;
              return (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.colProducto}>{detalle.producto || '-'}</Text>
                  <Text style={styles.colTalla}>{detalle.talla || '-'}</Text>
                  <Text style={styles.colColor}>{detalle.color || '-'}</Text>
                  <Text style={styles.colCantidad}>{cantidad}</Text>
                  <Text style={styles.colPrecio}>S/ {precio.toFixed(2)}</Text>
                  <Text style={styles.colTotal}>S/ {totalItem.toFixed(2)}</Text>
                  <Text style={styles.colPeso}>{detalle.peso || 0}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>SUBTOTAL: S/ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>IGV (18%): S/ {igv.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { fontSize: 14 }]}>TOTAL: S/ {total.toFixed(2)}</Text>
        </View>

        {pedido.descripcion && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OBSERVACIONES</Text>
            <Text>{pedido.descripcion}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>___________________________________</Text>
          <Text>Firma Autorizada</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PedidoPDF;