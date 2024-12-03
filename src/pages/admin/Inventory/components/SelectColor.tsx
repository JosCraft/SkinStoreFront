import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Color } from '../../../../components/interface/interface';
import { apiService } from '../../../../services/apiServices';
import { selectedColorAtom } from '../../../../context/context';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select'
import { Button } from '../../../../components/ui/button';
import FormColor from './FormColor';
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";


export const SelectColor = () => {


    const [, setIdColor ] = useAtom(selectedColorAtom);
    const [items, setItems] = useState<Color[]>([]);
    const [originalItems, setOriginalItems] = useState<Color[]>([]);
    const [isCreate, setIsCreate] = useState(false);
    const [loading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();    
      }, []);
  
      const fetchItems = () => {
        apiService.get('color')
          .then((data: Color[]) => {
            setOriginalItems(data); 
            setItems(data); 
          })
          .catch(error => {
            console.error(error);
          });
      }

    useEffect(() => {
        setItems(originalItems);
    }
    , [originalItems]);

    const handleColor = (nombre: string) => {
        const selectedColor = items.find(item => item.nombre === nombre);
        if (selectedColor) {
          setIdColor(selectedColor.id);
        }
    };

    const deleteItem = (id: number) => {
        apiService.delete(`color/${id}`)
            .then(() => {
                fetchItems();
            })
            .catch(error => setError(`Error al eliminar color  ${error.message}`));
    }



  return (
    <>{!isCreate ? (
        <div className="flex items-center space-x-4 mb-2">
            <Select onValueChange={handleColor}>
                <SelectTrigger className="text-orange-950 border border-gray-300 rounded-lg shadow-sm" aria-label="Seleccione categoria">
                    <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-auto">
                    <SelectGroup>
                        <SelectLabel className="text-orange-800 p-2">Color</SelectLabel>
                        {loading ? (
                                <SelectLabel className="text-orange-800 p-2">Cargando...</SelectLabel>
                            ) : error ? (
                                <SelectLabel className="text-red-800 p-2">{error}</SelectLabel>
                            ) : (
                                
                                items.map((item) => (
                                    <SelectItem
                                        className="text-orange-800 hover:bg-orange-300 focus:bg-orange-300"
                                        key={item.id}
                                        value={item.nombre}
                                    >
                                        <div className="flex justify-between items-center p-2 hover:bg-orange-100 rounded-md transition duration-200 ease-in-out w-full">
                                            <span className="text-gray-800 font-medium">{item.nombre}</span>                                            
                                            <span className="text-gray-800 font-medium">{item.hex}</span>

                                            <Button
                                                aria-label={`Eliminar ${item.nombre}`}
                                                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-all duration-150 ease-in-out transform hover:scale-105 ml-2"
                                                onClick={() => {
                                                    deleteItem(item.id);
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
        <FormColor setIsCreate={setIsCreate} fetchColors={fetchItems} />
    )}
      </>
  )
}


