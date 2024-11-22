import { useState } from 'react'
import { apiService } from '../../services/apiServices'

import { Input } from '../ui/input';
import { toast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

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
        <div>
            <p>Crear Curtiembre</p>
            <Input onChange={handleValueNombre}  placeholder='Nombre Curtiembre'/>
            <Input onChange={handelValueNumero}  placeholder='Numero' />
            <Button onClick={submit}>Guardar</Button>
            <Button onClick={() => setIsCreate(false)}>Cancelar</Button>
        </div>
    )
}
