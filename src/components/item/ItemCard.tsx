import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { DialogItems } from '../dialogItems/DialogItems';
import { Button } from '../ui/button';
import { Tipo } from '../interface/interface';
import { apiService } from '../../services/apiServices';
import { selectedCategoriaAtom, selectedCurtiembreAtom } from '../../context/context';


export const ItemCard = () => {
  const [items, setItems] = useState<Tipo[]>([]);
  const [originalItems, setOriginalItems] = useState<Tipo[]>([]);
  const [selectedCategoria] = useAtom(selectedCategoriaAtom);
  const [selectedCurtiembre] = useAtom(selectedCurtiembreAtom);

  useEffect(() => {
    fetchItems();    
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategoria, selectedCurtiembre, originalItems]);

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

  const filterItems = () => {
    let filteredItems = originalItems;

    if (selectedCategoria !== -1) {
      filteredItems = filteredItems.filter(item => item.idCategoria === selectedCategoria);
    }

    if (selectedCurtiembre !== -1) {
      filteredItems = filteredItems.filter(item => item.idCurtiembre === selectedCurtiembre);
    }

    setItems(filteredItems);
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
      {items.map((item) => (
        <Card 
          key={item.id} 
          className="border border-orange-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-orange-50"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-800">
              {item.nombre.toUpperCase()}
            </CardTitle>
            <CardDescription className="text-sm text-orange-600">
              {item.color.nombre}
            </CardDescription>
          </CardHeader>
  
          <CardContent>
            <div className="flex flex-col space-y-2">
              <span className="text-orange-700 font-medium">
                {item.curtiembre.nombre}
              </span>
              <span className="text-orange-900 font-semibold">
                Bs {item.precio.toFixed(2)}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <DialogItems selecTipo={item.id} precio={item.precio} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  
}

export default ItemCard;
