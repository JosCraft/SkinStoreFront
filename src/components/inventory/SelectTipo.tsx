import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Tipo } from '../interface/interface';
import { apiService } from "../../services/apiServices";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from '../ui/button';
import { FormCurtiembre } from './FormCurtiembre';
import { toast } from '../../hooks/use-toast';

import { filterItems } from '../../lib/utils';

import { selectedCategoriaAtom, selectedCurtiembreAtom } from '../../context/context';
import { set } from 'react-hook-form';



export const SelectTipo = () => {
    const [items, setItems] = useState<Tipo[]>([]);
    const [originalItems, setOriginalItems] = useState<Tipo[]>([]);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [idCategoria] = useAtom(selectedCategoriaAtom);
    const [idCurtiembre] = useAtom(selectedCurtiembreAtom);

    useEffect(() => {
        fetchItems();    
      }, []);
 
      const fetchItems = () => {
        apiService.get('tipo')
          .then((data: Tipo[]) => {
            setOriginalItems(data); 
            setItems(data); 
          })
          .catch(error => {
            console.error(error);
          });
      }
    useEffect(() => {
        setItems(filterItems(originalItems, idCategoria, idCurtiembre));
    }, [idCategoria, idCurtiembre]);

    console.log('Items ',items, 'OriginalItems ', originalItems);	

    const handleSelect = (nombre: string) => {
        const selectedTipo = items.find(item => item.nombre === nombre);
        if (selectedTipo) {
          console.log(selectedTipo);
        }
    };

    const deleteItem = useCallback((id: number) => {
        apiService.delete(`tipo/${id}`)
            .then(() => {
                toast({
                    title: 'Tipo eliminado',
                    variant: 'destructive',
                });
                setItems(filterItems(originalItems, idCategoria, idCurtiembre));
            })
            .catch(() => setError("Error al eliminar tipo"));
    }, [originalItems, idCategoria, idCurtiembre]);

    return (
        <>
            {!isCreate ? (
                <div className="flex items-center space-x-4 mb-2">
                    <Select onValueChange={handleSelect}>
                        <SelectTrigger className="text-orange-950 border border-gray-300 rounded-lg shadow-sm" aria-label="Seleccione material">
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
                                    items.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.nombre}
                                        >
                                            <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-md transition duration-200 ease-in-out w-full">
                                                <span className="text-gray-800 font-medium">{item.nombre}</span>
                                                <Button
                                                    aria-label={`Eliminar ${item.nombre}`}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 ml-2"
                                                    onClick={() => deleteItem(item.id)}
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
                <FormCurtiembre setIsCreate={setIsCreate} fetchCurtiembres={fetchItems} />
            )}
        </>
    );
};
