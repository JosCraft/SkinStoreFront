import { useState } from 'react';
import { useAtom } from 'jotai';
import { apiService } from '../../services/apiServices';

import { Input } from '../ui/input';
import { toast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

import { selectedCategoriaAtom, selectedCurtiembreAtom, selectedColorAtom } from '../../context/context';

interface FormTipoProps {
  setIsCreate: (isCreate: boolean) => void;
  fetchCurtiembres: () => void;
}

export const FormTipo = ({ setIsCreate, fetchCurtiembres }: FormTipoProps) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number | ''>('');

  const [idCategoria] = useAtom(selectedCategoriaAtom);
  const [idCurtiembre] = useAtom(selectedCurtiembreAtom);
  const [idColor] = useAtom(selectedColorAtom);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      setPrecio('');
    } else {
      setPrecio(parsedValue);
    }
  };

  const submit = () => {
    if (!nombre.trim()) {
      toast({ title: 'Error', description: 'El nombre no puede estar vacío.', status: 'error' });
      return;
    }
    if (precio === '' || precio <= 0) {
      toast({ title: 'Error', description: 'El precio debe ser un número mayor a 0.', status: 'error' });
      return;
    }

    apiService.create('tipo', {
      id: 0,
      nombre,
      precio,
      idCategoria,
      idColor,
      idCurtiembre,
    });
    toast({ title: 'Curtiembre creada con éxito.', status: 'success' });
    setIsCreate(false);
    fetchCurtiembres();
  };

  return (
    <div className="p-4 bg-amber-50 rounded-lg shadow-lg space-y-4">
    <h2 className="text-lg font-semibold text-gray-700">Agregar Nuevo Material</h2>
  
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">Nombre</label>
      <Input
        value={nombre}
        onChange={handleNombreChange}
        placeholder="Nombre del material"
        className="w-full border-stone-900 rounded-lg shadow-sm focus:ring focus:ring-amber-500 focus:outline-none"
      />
    </div>
  
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">Precio</label>
      <Input
        value={precio.toString()}
        onChange={handlePrecioChange}
        placeholder="Precio en formato numérico"
        type="number"
        step="0.01"
        className="w-full border-stone-900 rounded-lg shadow-sm focus:ring focus:ring-amber-500 focus:outline-none"
      />
    </div>
  
    <div className="flex justify-center space-x-4 mt-4">
      <Button
        onClick={() => setIsCreate(false)}
        className="bg-amber-500 hover:bg-amber-700 text-white rounded-lg px-4 py-2"
      >
        Cancelar
      </Button>
      <Button
        onClick={submit}
        className="bg-amber-600 hover:bg-amber-800 text-white rounded-lg px-4 py-2"
      >
        Guardar
      </Button>
    </div>
  </div>
  
  );
};
