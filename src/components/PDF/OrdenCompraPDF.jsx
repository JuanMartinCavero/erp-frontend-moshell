import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    padding: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 100,
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  table: {
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  colInsumo: { width: "25%" },
  colCalidad: { width: "20%" },
  colColor: { width: "15%" },
  colCantidad: { width: "10%", textAlign: "right" },
  colPrecio: { width: "15%", textAlign: "right" },
  colTotal: { width: "15%", textAlign: "right" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    padding: 5,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 11,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
  },
});

const OrdenCompraPDF = ({ orden }) => {
  const detalles = orden.detalles || [];

  let subtotalCalculado = 0;
  detalles.forEach((detalle) => {
    const cantidad = Number(detalle.cantidad_conos) || 0;
    const precio = Number(detalle.precio_unitario) || 0;
    subtotalCalculado += cantidad * precio;
  });

  const subtotal =
    subtotalCalculado > 0 ? subtotalCalculado : Number(orden.subtotal) || 0;
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-PE");
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
        return "#d97706";
      case "aprobada":
        return "#2563eb";
      case "recibida":
        return "#16a34a";
      case "anulada":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ORDEN DE COMPRA</Text>
          <Text style={styles.subtitle}>ID: {orden.orden_id}</Text>
          <Text style={styles.subtitle}>
            Fecha: {formatFecha(orden.fecha_orden)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATOS DEL PROVEEDOR</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Proveedor:</Text>
            <Text style={styles.value}>
              {orden.proveedor?.razon_social || "-"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>RUC:</Text>
            <Text style={styles.value}>{orden.proveedor?.ruc || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contacto:</Text>
            <Text style={styles.value}>{orden.proveedor_contacto || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Celular:</Text>
            <Text style={styles.value}>{orden.proveedor?.telefono || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha Entrega:</Text>
            <Text style={styles.value}>{formatFecha(orden.fecha_entrega)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text
              style={[
                styles.value,
                { color: getEstadoColor(orden.estado), fontWeight: "bold" },
              ]}
            >
              {orden.estado || "pendiente"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DETALLE DE INSUMOS</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colInsumo}>Insumo</Text>
              <Text style={styles.colCalidad}>Calidad</Text>
              <Text style={styles.colColor}>Color</Text>
              <Text style={styles.colCantidad}>Cant.</Text>
              <Text style={styles.colPrecio}>Precio</Text>
              <Text style={styles.colTotal}>Total</Text>
            </View>
            {detalles.map((detalle, idx) => {
              const cantidad = Number(detalle.cantidad_conos) || 0;
              const precio = Number(detalle.precio_unitario) || 0;
              const totalItem = cantidad * precio;
              return (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.colInsumo}>{detalle.titulo || "-"}</Text>
                  <Text style={styles.colCalidad}>
                    {detalle.calidad || "-"}
                  </Text>
                  <Text style={styles.colColor}>{detalle.color || "-"}</Text>
                  <Text style={styles.colCantidad}>{cantidad}</Text>
                  <Text style={styles.colPrecio}>S/ {precio.toFixed(2)}</Text>
                  <Text style={styles.colTotal}>S/ {totalItem.toFixed(2)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>
            SUBTOTAL: S/ {subtotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>IGV (18%): S/ {igv.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, { fontSize: 14 }]}>
            TOTAL: S/ {total.toFixed(2)}
          </Text>
        </View>

        {orden.observaciones && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OBSERVACIONES</Text>
            <Text>{orden.observaciones}</Text>
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

export default OrdenCompraPDF;
