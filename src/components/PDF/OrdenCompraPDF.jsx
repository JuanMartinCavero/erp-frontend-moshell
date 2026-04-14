import React from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";

import { Heading } from "../pdfx/heading/pdfx-heading";
import { Text } from "../pdfx/text/pdfx-text";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../pdfx/table/pdfx-table";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  headerBox: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1 solid #e5e7eb",
  },

  title: {
    fontSize: 18,
    marginBottom: 6,
  },

  infoGrid: {
    marginTop: 10,
    gap: 4,
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },

  label: {
    width: 120,
    fontWeight: 700,
    color: "#333",
  },

  value: {
    flex: 1,
    color: "#111",
  },

  section: {
    marginBottom: 15,
  },

  totalBox: {
    marginTop: 15,
    padding: 10,
    borderTop: "1 solid #000",
    textAlign: "right",
  },
});

export default function OrdenCompraPDF({ orden }) {
  console.log("PDF data:", orden);

  const detalles = (orden.detalles || []).map((d) => {
    const cantidad = Number(d.cantidad_conos || 0);
    const precio = Number(d.precio_unitario || 0);
    const total = cantidad * precio;

    return {
      ...d,
      cantidad_conos: cantidad,
      precio_unitario: precio,
      total,
    };
  });

  const montoTotal = detalles.reduce((sum, d) => sum + d.total, 0);

  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-PE");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER PRINCIPAL */}
        <View style={styles.headerBox}>
          <Heading level={1}>ORDEN DE COMPRA</Heading>        
        </View>

        {/* BLOQUE INFO (tipo tarjeta) */}
        <View style={styles.section}>
          <View
            style={{
              border: "1 solid #e5e7eb",
              borderRadius: 6,
              padding: 12,
            }}
          >
            <View style={styles.infoRow}>
              <Text style={styles.label}>ID Orden</Text>
              <Text style={styles.value}>{orden.orden_id}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Proveedor</Text>
              <Text style={styles.value}>{orden.proveedor_nombre}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Contacto</Text>
              <Text style={styles.value}>{orden.proveedor_contacto}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Celular</Text>
              <Text style={styles.value}>{orden.proveedor_celular}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>RUC</Text>
              <Text style={styles.value}>{orden.proveedor_ruc}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Fecha Orden</Text>
              <Text style={styles.value}>{formatFecha(orden.fecha_orden)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Fecha Entrega</Text>
              <Text style={styles.value}>
                {formatFecha(orden.fecha_entrega)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Estado</Text>
              <Text
                style={{
                  flex: 1,
                  color:
                    orden.estado === "pendiente"
                      ? "#d97706"
                      : orden.estado === "aprobada"
                        ? "#2563eb"
                        : orden.estado === "recibida"
                          ? "#16a34a"
                          : "#6b7280",
                  fontWeight: 700,
                }}
              >
                {orden.estado}
              </Text>
            </View>
          </View>
        </View>

        {/* DETALLE */}
        <View style={styles.section}>
          <Heading level={2}>Detalle de Insumos</Heading>

          <Table variant="grid">
            <TableHeader>
              <TableRow header>
                <TableCell>Insumo</TableCell>
                <TableCell>Calidad</TableCell>
                <TableCell>Color</TableCell>
                <TableCell align="right">Cant.</TableCell>
                <TableCell align="right">P. Unit</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {detalles.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{d.titulo}</TableCell>
                  <TableCell>{d.calidad}</TableCell>
                  <TableCell>{d.color}</TableCell>
                  <TableCell align="right"><Text>{d.cantidad_conos}</Text></TableCell>
                  <TableCell align="right"><Text>{Number(d.precio_unitario).toFixed(2)}</Text></TableCell>
                  <TableCell align="right"><Text>{Number(d.total).toFixed(2)}</Text></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>

        {/* TOTAL FINAL */}
        <View
          style={{
            marginTop: 20,
            padding: 12,
            borderTop: "2 solid #000",
            textAlign: "right",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            TOTAL: {orden.moneda || "PEN"} {montoTotal.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
