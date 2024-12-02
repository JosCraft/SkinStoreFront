import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Estilos para el documento
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

// Componente del documento PDF
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Reporte de Ventas</Text>
        <Text>Generado automáticamente.</Text>
      </View>
      <View style={styles.section}>
        <Text>Sección #2</Text>
        <Text>Detalles adicionales aquí.</Text>
      </View>
    </Page>
  </Document>
);
