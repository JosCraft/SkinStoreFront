import { useEffect, useState } from 'react'
import { apiService } from '../../services/apiServices'

import { Input } from '../ui/input';
import { toast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

interface FormCategoriaProps {
    setIsCreate: (isCreate: boolean) => void;
    fetchCategorias: () => void;
}

export const FormCategoria = ({
    setIsCreate,
    fetchCategorias
}:FormCategoriaProps ) => {
   
    const [nombre, setNombre] = useState('');
    const [medida, setMedida] = useState('');

    const handleValueNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    }

    const handelValueMedida = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMedida(e.target.value);
    }

    const submit = () => {
        apiService.create('catematerial', {id:0, nombre: nombre, medida: medida});
        setIsCreate(false);
        toast({
            title: 'Categoria Creada',
          });
          fetchCategorias();
    }

  return (
    <div className="p-4 bg-amber-50 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Crear Categoria</h2>
        <div className='space-y-2'>
        <label className="block text-sm font-medium text-gray-900">Nombre</label>
        <Input onChange={handleValueNombre}  placeholder='Nombre Categoria'
        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-amber-500 focus:outline-none"
        />
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-900">Medida</label>
        <Input onChange={handelValueMedida}  placeholder='Medida' 
          className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-amber-500 focus:outline-none"
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
  )
}
