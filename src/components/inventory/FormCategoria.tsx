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
    <div>
        <p>Crear Categoria</p>
        <Input onChange={handleValueNombre}  placeholder='Nombre Categoria'/>
        <Input onChange={handelValueMedida}  placeholder='Medida' />
        <Button onClick={submit}>Guardar</Button>
        <Button onClick={() => setIsCreate(false)}>Cancelar</Button>
    </div>
  )
}
