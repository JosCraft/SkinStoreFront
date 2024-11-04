import React, { useState, useEffect } from 'react'
import { apiService } from '../../services/apiServices'
import { Categoria } from '../interface/interface';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";

interface CateProps {
  onValueChangeCategoria: (categoriaId : number) => void
}

export function CategoriaF ({onValueChangeCategoria}:CateProps){
  const [categorias,setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    apiService.get(`catematerial`)
    .then((data: Categoria[]) => {
        setCategorias(data);
        data.push({id:-1,nombre:"Todos",medida:""});
    })
    .catch(error => {
        console.log(error)
    })
  },[]);

  const handleSelect = (value: string) => {
    const id = parseInt(value, 10);
    onValueChangeCategoria(id);
  }



  return (
    <div className="flex flex-col gap-1">
      <Select onValueChange={handleSelect || 0 } >
        <SelectTrigger className="bg-orange-200 w-[180px] hover:bg-orange-300 focus:bg-orange-300 text-orange-950">
          <SelectValue placeholder="Tipo de Material" />
        </SelectTrigger>
        <SelectContent className="bg-orange-100">
          <SelectGroup>
            <SelectLabel className="text-orange-800">Tipo Material</SelectLabel>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <SelectItem
                  className="text-orange-800 hover:bg-orange-300 focus:bg-orange-300"
                  key={categoria.id}
                  value={categoria.id}
                >
                  {categoria.nombre}
                </SelectItem>
              ))
              
            ) : (
              <SelectLabel className="text-orange-800">Loading...</SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>   
  )
}

export default CategoriaF
