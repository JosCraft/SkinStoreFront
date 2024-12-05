import { useState } from 'react'
import { apiService } from '../../../../services/apiServices'

import { Input } from '../../../../components/ui/input';
import { toast } from '../../../../hooks/use-toast';
import { Button } from '../../../../components/ui/button';

interface FormColorProps {
    setIsCreate: (isCreate: boolean) => void;
    fetchColors: () => void;
}

const FormColor = ({
    setIsCreate,
    fetchColors
}:FormColorProps) => {
       
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');

    const handleValueNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    }

    const handelValueCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodigo(e.target.value);
    }   

    const submit = () => {
        apiService.create('color', {id:0, nombre: nombre, codigo: codigo});
        setIsCreate(false);
        toast({
            title: 'Color Creado',
          });
          fetchColors();
    }

    return (
        <div className="p-4 bg-amber-50 rounded-lg shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Crear Color</h2>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-900">Nombre Color</label>      
                <Input onChange={handleValueNombre}  placeholder='Nombre Color' 
                className="w-full border-stone-900 rounded-lg shadow-sm focus:ring focus:ring-amber-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-stone-900">Codigo</label>
                <Input onChange={handelValueCodigo}  placeholder='Codigo'
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
    )
}

export default FormColor