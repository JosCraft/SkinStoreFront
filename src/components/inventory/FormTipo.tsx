import { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedCategoriaAtom, selectedCurtiembreAtom } from '../../context/context';

import { apiService } from '../../services/apiServices';

const FormTipo = () => {


  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [idCategoria] = useAtom(selectedCategoriaAtom);
  const [idCurtiembre] = useAtom(selectedCurtiembreAtom);
  const [idColor,] = useState(0);
  



  return (
    <div>
      <p>Crear Tipo</p>
      <input type="text" onChange={(e) => setNombre(e.target.value)} placeholder='Nombre Tipo'/>
      <input type="text" onChange={(e) => setPrecio(e.target.value)} placeholder='Precio' />
      <button onClick={() => apiService.create('tipo', {id:0, nombre: nombre, precio: parseFloat(precio), idCategoria: idCategoria, idColor: idColor, idCurtiembre: idCurtiembre})}>Guardar</button>
    </div>
  )
}

export default FormTipo
