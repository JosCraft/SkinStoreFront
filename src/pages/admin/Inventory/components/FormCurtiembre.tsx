import { useState } from 'react'
import { apiService } from '../../../../services/apiServices'

import { Input } from '../../../../components/ui/input';
import { toast } from '../../../../hooks/use-toast';
import { Button } from '../../../../components/ui/button';

interface FormCurtiembreProps {
    setIsCreate: (isCreate: boolean) => void;
    fetchCurtiembres: () => void;
}

export const FormCurtiembre = ({
    setIsCreate,
    fetchCurtiembres
}:FormCurtiembreProps ) => {
   
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');


    const handleValueNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    }

    const handelValueNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumero(e.target.value);
    }   

    const submit = () => {
        apiService.create('curtiembre', {id:0, nombre: nombre, numero: numero});
        setIsCreate(false);
        toast({
            title: 'Curtiembre Creada',
          });
          fetchCurtiembres();
    }

    return (
        <div className="p-4 bg-amber-50 rounded-lg shadow-lg space-y-4" >
            <h2 className='text-lg font-semibold text-stone-700'>Crear Curtiembre</h2>

            <div className="space-y-2">
                <label className='block text-sm font-medium text-stone-900'>Nombre Curtiembre</label>
                <Input onChange={handleValueNombre}  placeholder='Nombre Curtiembre'
                 className="w-full border-stone-900 rounded-lg shadow-sm focus:ring focus:ring-amber-500 focus:outline-none"
                />
            </div>

            <div className="space-y-2">
                <label className='block text-sm font-medium text-stone-900'>Numero</label>
                <Input onChange={handelValueNumero}  placeholder='Numero' 
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
