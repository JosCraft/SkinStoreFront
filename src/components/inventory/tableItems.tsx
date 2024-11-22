import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiServices';
import { Material } from '../interface/interface';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export const TableItems = () => {
  const [items, setItems] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchInventario = async () => {
    setLoading(true);
    try {
      const data = await apiService.get('inventario');
      setItems(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error al cargar los datos: ${error.message}`);
      } else {
        setError('Error al cargar los datos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventario();
  }, []);

  if (loading) return <p>Cargando inventario...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Table>
      <TableCaption>Inventario de Materiales</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader>Medida</TableHeader>
          <TableHeader>Precio</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.length > 0 ? (
          items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.medida || 'N/A'}</TableCell>
              <TableCell>{`$${item.tipo?.precio.toFixed(2)}`}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} style={{ textAlign: 'center' }}>
              No hay materiales disponibles.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};


