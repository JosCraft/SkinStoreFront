import React, { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { apiService } from '../../../../services/apiServices';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../../../../components/ui/select";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Curtiembre } from '../../../../components/interface/interface';
import { Button } from '../../../../components/ui/button';
import { FormCurtiembre } from './FormCurtiembre';
import { toast } from '../../../../hooks/use-toast';

import { selectedCurtiembreAtom  } from '../../../../context/context';



export const SelectCurtiembre = () => {
    const [curtiembres, setCurtiembres] = useState<Curtiembre[]>([]);
    const [isCreate, setIsCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setiDCurtiembre] = useAtom(selectedCurtiembreAtom);


    const fetchCurtiembres = useCallback(() => {
        setLoading(true);
        setError(null);
        apiService.get('curtiembre')
            .then(data => setCurtiembres(data))
            .catch(error => setError(`Error al cargar curtiembres ${error.message} `))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchCurtiembres();
    }, [fetchCurtiembres]);

    const handleSelect = (nombre: string) => {
        const id = curtiembres.find(curtiembre => curtiembre.nombre === nombre)?.id || 0;
        setiDCurtiembre(id);
    };

    const deleteItem = useCallback((id: number) => {
        apiService.delete(`curtiembre/${id}`)
            .then(() => fetchCurtiembres())
            .catch(error => setError(`Error al eliminar curtiembre: ${error.message}`));
        toast({
            title: 'Curtiembre eliminada',
            variant: 'destructive'
        });
    }, [fetchCurtiembres]);

    return (
        <>
            {!isCreate ? (
                <div className="flex items-center space-x-4 mb-2">
                    <Select onValueChange={handleSelect}>
                        <SelectTrigger className="text-orange-950 border border-gray-300 rounded-lg  shadow-sm" aria-label="Selecciona una curtiembre">
                            <SelectValue placeholder="Curtiembres" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto">
                            <SelectGroup>
                                <SelectLabel className="text-orange-800 p-2">Curtiembres</SelectLabel>
                                {loading ? (
                                    <SelectLabel className="text-orange-800 p-2">Cargando...</SelectLabel>
                                ) : error ? (
                                    <SelectLabel className="text-red-800 p-2">{error}</SelectLabel>
                                ) : (
                                    curtiembres.map(curtiembre => (
                                        <SelectItem
                                            key={curtiembre.id}
                                            value={curtiembre.nombre}
                                        >
                                            <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-md transition duration-200 ease-in-out w-full">
                                                <span className="text-gray-800 font-medium">{curtiembre.nombre}</span>
                                                <Button
                                                    aria-label={`Eliminar ${curtiembre.nombre}`}
                                                    className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 ml-2"
                                                    onClick={() => {
                                                        deleteItem(curtiembre.id);
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
                <FormCurtiembre setIsCreate={setIsCreate} fetchCurtiembres={fetchCurtiembres} />
            )}
        </>
    );
};
