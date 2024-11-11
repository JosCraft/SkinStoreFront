import { useCallback, useEffect, useState } from 'react'
import { Categoria } from '../interface/interface'
import { apiService } from "../../services/apiServices";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from '../ui/button';
import { FormCategoria } from './FormCategoria';
import { toast } from '../../hooks/use-toast';
import { set } from 'react-hook-form';

interface CategoriaProps {
    onValueChange: (id: number) => void;
}

export const SelectCategoria = ({onValueChange}:CategoriaProps) => {
  
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategorias = useCallback(() => {
        setLoading(true);
        setError(null);
        apiService.get('catematerial')
        .then(data => setCategorias(data))
        .catch(error => setError("Error al cargar categorias"))
        .finally(() => setLoading(false));
    },[]);
    
    useEffect(() => {
        fetchCategorias();
    },[fetchCategorias]);

    const handleCategoria = useCallback((nombre: string) => {
        const id = categorias.find(categoria => categoria.nombre === nombre)?.id || 0;
        onValueChange(id);
    },[onValueChange]);

    const deleteItem = useCallback((id: number) => {
        apiService.delete(`catematerial/${id}`)
        .then(() => fetchCategorias())
        .catch(error => setError("Error al eliminar categoria"));
        toast({
            title: 'Categoria eliminada',
            variant: 'destructive'
        });
    },[fetchCategorias]);

    return (
        <>{!isCreate ? (
            <div className="flex items-center space-x-4 mb-2">
                <Select onValueChange={handleCategoria}>
                    <SelectTrigger className="text-orange-950 border border-gray-300 rounded-lg shadow-sm" aria-label="Seleccione categoria">
                        <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto">
                        <SelectGroup>
                            <SelectLabel className="text-orange-800 p-2">Categoria</SelectLabel>
                            {loading ? (
                                    <SelectLabel className="text-orange-800 p-2">Cargando...</SelectLabel>
                                ) : error ? (
                                    <SelectLabel className="text-red-800 p-2">{error}</SelectLabel>
                                ) : (
                                    
                                    categorias.map((categoria) => (
                                        <SelectItem
                                            className="text-orange-800 hover:bg-orange-300 focus:bg-orange-300"
                                            key={categoria.id}
                                            value={categoria.nombre}
                                        >
                                            <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-md transition duration-200 ease-in-out w-full">
                                                <span className="text-gray-800 font-medium">{categoria.nombre}</span>
                                                <Button
                                                    aria-label={`Eliminar ${categoria.nombre}`}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 ml-2"
                                                    onClick={() => {
                                                        deleteItem(categoria.id);
                                                    }}
                                                >
                                                    <FaRegTrashAlt size={14} />
                                                </Button>
                                            </div>   
                                        </SelectItem>
                                    )
                                    )
                                )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    onClick={() => setIsCreate(true)}
                    className="bg-amber-500 hover:bg-amber-700 focus:bg-orange-300 text-white p-2 rounded-lg shadow-sm"
                >
                    <CiCirclePlus />
                </Button>
            </div>
        ) : (
            <FormCategoria setIsCreate={setIsCreate} fetchCategorias={fetchCategorias} />
        )}
        </>
    )
}



