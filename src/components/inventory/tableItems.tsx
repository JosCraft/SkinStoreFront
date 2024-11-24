import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiServices';
import { Material } from '../interface/interface';
import { CiCirclePlus } from 'react-icons/ci';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { selectedTipoAtom } from '../../context/context';
import { useAtom } from 'jotai';
import { Button } from '../ui/button';
import { toast } from '../../hooks/use-toast';

export const TableItems = () => {
  const [items, setItems] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [medida, setMedida] = useState('');
  const [idTipo] = useAtom(selectedTipoAtom);

  const fetchInventario = async () => {
    setLoading(true);
    try {
      const data = await apiService.get('inventario');
      setItems(data.filter((item: Material) => item.idTipo === idTipo));
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? `Error al cargar los datos: ${error.message}`
          : 'Error al cargar los datos'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idTipo !== -1) {
      fetchInventario();
    }
  }, [idTipo]);

  const submit = async () => {
    if (!medida.trim()) {
      toast({
        title: 'Error',
        description: 'La medida no puede estar vacía.',
        status: 'error',
      });
      return;
    }

    try {
      await apiService.create('material', { id: 0, medida, idTipo });
      toast({
        title: 'Material creado con éxito.',
        status: 'success',
      });
      setMedida('');
      setIsCreate(false);
      fetchInventario();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `No se pudo crear el material: ${error.message}`,
        status: 'error',
      });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando inventario...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-semibold text-gray-800 mb-5 ">Lista de Materiales</h1>

      {isCreate ? (
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Medida"
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            className="border border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-amber-500 focus:outline-none"
          />
          <Button onClick={submit} className="bg-green-500 hover:bg-green-700">
            Guardar
          </Button>
          <Button onClick={() => setIsCreate(false)} className="bg-red-500 hover:bg-red-700">
            Cancelar
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setIsCreate(true)}
          className="bg-amber-500 hover:bg-amber-700 text-white p-2 rounded-lg shadow-sm flex items-center"
        >
          <CiCirclePlus size={20} className="mr-2" />
          Agregar Item
        </Button>
      )}

      <div className="overflow-y-auto max-h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medida</TableHead>
              <TableHead>Precio {items[0]?.tipo?.precio} Bs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.medida || 'N/A'}</TableCell>
                  <TableCell>{item.tipo?.precio !== undefined ? `${(item.tipo.precio * parseFloat(item.medida || '1')).toFixed(2)} Bs` : 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-gray-500">
                  No hay materiales disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};
