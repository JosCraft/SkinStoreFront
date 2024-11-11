import { useCallback, useEffect, useState } from 'react'
import { Tipo } from '../interface/interface'
import { apiService } from "../../services/apiServices";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from '../ui/button';
import { FormCurtiembre } from './FormCurtiembre';
import { toast } from '../../hooks/use-toast';

interface TipoFProps {
    onValueChange: (id: number) => void;
    idCurtiembre: number;
    idCategoria: number;
}

export const SelectTipo = ({ onValueChange, idCategoria, idCurtiembre }: TipoFProps) => {

    const [tipos, setTipos] = useState<Tipo[]>([])
    const [isCreate, setIsCreate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [originalItems, setOriginalItems] = useState<Tipo[]>([]);

    const fetchTipos = useCallback(() => {
        setLoading(true);
        setError(null);
        apiService.get('tipo')
        .then((data: Tipo[]) => {
            setOriginalItems(data); 
            setTipos(data); 
          })
            .catch(error => setError("Error al cargar tipos"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchTipos();  
    },[fetchTipos]);

    useEffect(() => {
        filterItems();
    }, [idCategoria, idCurtiembre, originalItems]);

    const filterItems = () =>  {
        let filteredItems = originalItems;

        if (idCategoria !== -1) {
            filteredItems = filteredItems.filter(item => item.idCategoria === idCategoria);
        }

        if (idCurtiembre !== -1) {
            filteredItems = filteredItems.filter(item => item.idCurtiembre === idCurtiembre);
        }

        setTipos(filteredItems);
    };

    const handleSelect = useCallback((nombre: string) => {
        const id = tipos.find(tipo => tipo.nombre === nombre)?.id || 0;
        onValueChange(id);
    }, [onValueChange]);

    const deleteItem = useCallback((id: number) => {
        apiService.delete(`tipo/${id}`)
            .then(() => fetchTipos())
            .catch(error => setError("Error al eliminar tipo"));
        toast({
            title: 'Tipo eliminado',
            variant: 'destructive'
        });
    }, [fetchTipos]);

    return (
        <>{
        !isCreate ? (
            <div className="flex items-center space-x-4 mb-2">
                    <Select onValueChange={handleSelect}>
                        <SelectTrigger className="text-orange-950 border border-gray-300 rounded-lg  shadow-sm" aria-label="Seleccione material">
                            <SelectValue placeholder="Materiales" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto">
                            <SelectGroup>
                                <SelectLabel className="text-orange-800 p-2">Material</SelectLabel>
                                {loading ? (
                                    <SelectLabel className="text-orange-800 p-2">Cargando...</SelectLabel>
                                ) : error ? (
                                    <SelectLabel className="text-red-800 p-2">{error}</SelectLabel>
                                ) : (
                                    tipos.map(tipo => (
                                        <SelectItem
                                            key={tipo.id}
                                            value={tipo.nombre}
                                        >
                                            <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-md transition duration-200 ease-in-out w-full">
                                                <span className="text-gray-800 font-medium">{tipo.nombre}</span>
                                                <Button
                                                    aria-label={`Eliminar ${tipo.nombre}`}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 ml-2"
                                                    onClick={() => {
                                                        deleteItem(tipo.id);
                                                    }}
                                                >
                                                    <FaRegTrashAlt size={14} />
                                                </Button>
                                            </div>                                            
                                        </SelectItem>
                                    ))
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        aria-label="Crear nueva curtiembre"
                        className="bg-amber-500 hover:bg-amber-700 text-white p-2 rounded-lg shadow-sm"
                        onClick={() => setIsCreate(true)}
                    >
                        <CiCirclePlus size={24} />
                    </Button>
                </div>
        ) : (
            <FormCurtiembre setIsCreate={setIsCreate} fetchCurtiembres={fetchTipos} />
        )
    }
    </>);
    
}

