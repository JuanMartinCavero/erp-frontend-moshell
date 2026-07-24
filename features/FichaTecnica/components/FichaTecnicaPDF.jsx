// src/pages/FichaTecnica/components/FichaTecnicaPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        color: '#1A3A5C',
    },
    header: {
        borderBottom: '3px solid #1A3A5C',
        paddingBottom: 12,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: '#1A3A5C',
    },
    infoGrid: {
        backgroundColor: '#F5F7FA',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        color: '#4A5A6A',
        width: 80,
        fontWeight: 500,
    },
    value: {
        color: '#1A3A5C',
        fontWeight: 600,
    },
    sectionTitle: {
        backgroundColor: '#1A3A5C',
        color: 'white',
        padding: 6,
        fontSize: 12,
        fontWeight: 600,
        marginTop: 16,
        marginBottom: 10,
    },
    table: {
        width: '100%',
        marginBottom: 12,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#4A5A6A',
        padding: 6,
    },
    tableHeaderText: {
        color: 'white',
        fontSize: 9,
        fontWeight: 600,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #E2E8F0',
        padding: 6,
    },
    col1: { width: '15%', textAlign: 'center', fontSize: 9 },
    col2: { width: '25%', textAlign: 'center', fontSize: 9 },
    col3: { width: '15%', textAlign: 'center', fontSize: 9 },
    col4: { width: '20%', textAlign: 'center', fontSize: 9 },
    col5: { width: '25%', textAlign: 'center', fontSize: 9 },
    footer: {
        marginTop: 30,
        paddingTop: 12,
        borderTop: '1px solid #E2E8F0',
        textAlign: 'center',
        fontSize: 8,
        color: '#94A3B8',
    },
});

export const FichaTecnicaPDF = ({ techSheet, cliente, pedido, materiales, muestras }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.title}>FICHA TÉCNICA Resumen - MOSHELL</Text>
                <Text>Ref: {techSheet?.reference || 'N/A'}</Text>
                <Text>Fecha: {new Date().toLocaleDateString('es-ES')}</Text>
            </View>

            {/* INFO GENERAL */}
            <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Producto:</Text>
                    <Text style={styles.value}>{techSheet?.name || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Cliente:</Text>
                    <Text style={styles.value}>{cliente?.nombre || cliente?.empresa || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Pedido:</Text>
                    <Text style={styles.value}>{pedido?.numero_pedido || 'Sin asignar'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Cantidad:</Text>
                    <Text style={styles.value}>{pedido?.cantidad || techSheet?.estimated_quantity || 'N/A'}</Text>
                </View>
            </View>

            {/* MATERIALES */}
            <Text style={styles.sectionTitle}>MATERIALES DEFINIDOS</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.col1]}>Código</Text>
                    <Text style={[styles.tableHeaderText, styles.col2]}>Material</Text>
                    <Text style={[styles.tableHeaderText, styles.col3]}>Unidad</Text>
                    <Text style={[styles.tableHeaderText, styles.col4]}>Cantidad</Text>
                    <Text style={[styles.tableHeaderText, styles.col5]}>Proveedor</Text>
                </View>
                {(materiales || []).length > 0 ? (
                    materiales.map((material, i) => (
                        <View key={i} style={styles.tableRow}>
                            <Text style={styles.col1}>{material.codigo || '-'}</Text>
                            <Text style={styles.col2}>{material.nombre}</Text>
                            <Text style={styles.col3}>{material.unidad || 'u'}</Text>
                            <Text style={styles.col4}>{material.pivot?.cantidad_estimada || '-'}</Text>
                            <Text style={styles.col5}>{material.proveedor?.nombre || '-'}</Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.tableRow}>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#94A3B8' }}>
                            No hay materiales definidos
                        </Text>
                    </View>
                )}
            </View>

            {/* MUESTRAS */}
            <Text style={styles.sectionTitle}>HISTORIAL DE MUESTRAS</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, { width: '15%' }]}>Versión</Text>
                    <Text style={[styles.tableHeaderText, { width: '20%' }]}>Tipo</Text>
                    <Text style={[styles.tableHeaderText, { width: '20%' }]}>Estado</Text>
                    <Text style={[styles.tableHeaderText, { width: '45%' }]}>Feedback</Text>
                </View>
                {(muestras || []).length > 0 ? (
                    muestras.map((muestra, i) => (
                        <View key={i} style={styles.tableRow}>
                            <Text style={{ width: '15%', textAlign: 'center' }}>v{muestra.version}</Text>
                            <Text style={{ width: '20%', textAlign: 'center' }}>{muestra.tipo_muestra || muestra.type || 'N/A'}</Text>
                            <Text style={{ width: '20%', textAlign: 'center' }}>{muestra.status || 'PENDING'}</Text>
                            <Text style={{ width: '45%', fontSize: 9 }}>{muestra.feedback || '-'}</Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.tableRow}>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#94A3B8' }}>
                            No hay muestras registradas
                        </Text>
                    </View>
                )}
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Text>MOSHELL — ERP de Gestión de Producción Textil</Text>
                <Text>Documento generado automáticamente</Text>
            </View>
        </Page>
    </Document>
);