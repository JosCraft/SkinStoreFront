import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Venta, VentaMaterial } from '../interface/interface';

interface MyDocumentProps {
  ventas: Venta;
  ventaMateriales: VentaMaterial[];
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#555',
  },
  section: {
    marginBottom: 20,
  },
  userInfo: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fdfdfd',
  },
  userInfoText: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    flexGrow: 1,
  },
  tableHeader: {
    backgroundColor: '#e9ecef',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export const MyDocument = ({ ventas, ventaMateriales }: MyDocumentProps) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>SkinStore</Text>
        <Text style={styles.date}>Fecha: {ventas.fecha}</Text>
      </View>

      {/* Información del Usuario */}
      <View style={[styles.section, styles.userInfo]}>
        <Text style={styles.userInfoText}><Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {ventas.usuario.nombre} {ventas.usuario.apellido}</Text>
        <Text style={styles.userInfoText}><Text style={{ fontWeight: 'bold' }}>Correo:</Text> {ventas.usuario.email}</Text>
        <Text style={styles.userInfoText}><Text style={{ fontWeight: 'bold' }}>Número de contacto:</Text> {ventas.usuario.numero}</Text>
      </View>

      {/* Tabla de Materiales Vendidos */}
      <View style={styles.section}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>Materiales Vendidos</Text>
        {ventaMateriales.length > 0 ? (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Nombre</Text>
              <Text style={styles.tableCell}>Medida</Text>
              <Text style={styles.tableCell}>Precio</Text>
            </View>
            {ventaMateriales.map((material, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{material.Material.tipo?.nombre}</Text>
                <Text style={styles.tableCell}>{material.Material.medida}</Text>
                <Text style={styles.tableCell}>${material.Material.tipo?.precio}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Total:</Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}>Bs. {ventas.totalVenta}</Text>
            </View>
          </View>
        ) : (
          <Text>No se encontraron materiales para esta venta.</Text>
        )}
      </View>
    </Page>
  </Document>
);
