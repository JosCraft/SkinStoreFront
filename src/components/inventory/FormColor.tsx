import { useState } from 'react'
import { apiService } from '../../services/apiServices'

import { Input } from '../ui/input';
import { toast } from '../../hooks/use-toast';
import { Button } from '../ui/button';

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
        <div>
            <p>Crear Color</p>
            <Input onChange={handleValueNombre}  placeholder='Nombre Color'/>
            <Input onChange={handelValueCodigo}  placeholder='Codigo' />
            <Button onClick={submit}>Guardar</Button>
            <Button onClick={() => setIsCreate(false)}>Cancelar</Button>
        </div>
    )
  return (
    <div>
      <p>Crear Color</p>
        <Input placeholder='Nombre Color'/>
        <Input placeholder='Codigo' />
        <Button>Guardar</Button>
        <Button>Cancelar</Button>
    </div>
  )
}

export default FormColor
