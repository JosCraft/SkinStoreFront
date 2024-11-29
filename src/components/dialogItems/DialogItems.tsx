import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "../../hooks/use-toast";
import {useAtom} from "jotai";
import { Material, MaterialCar } from "../interface/interface";
import { apiService } from "../../services/apiServices";
import { useEffect, useState } from "react";
import { Button } from '../ui/button';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { priceTotalAtom, listMaterialAtom, addedItems } from "../../context/context";

interface DialogItemsProps {
  selecTipo: number;
  precio: number;
}

export const DialogItems = (
  { selecTipo, precio }: DialogItemsProps
) => {
  const [items, setItems] = useState<Material[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [priceTotal, setPriceTotal] = useAtom(priceTotalAtom);
  const [listMaterial, setListMaterial] = useAtom(listMaterialAtom);
  const [addItems, setAddedItems] = useAtom(addedItems);


  useEffect(() => {
    if(isVisible){
      if(selecTipo !== -1){
        console.log(selecTipo);
        apiService
        .get(`material?id_tipo=${selecTipo}`)
        .then((data: Material[]) => {
          console.log(data);
          setItems(data);
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
  
  }, [selecTipo, isVisible]);

  //estar escuchando los cambios que tenga addedItems
  useEffect(() => {
    setAddedItems(new Set(listMaterial.map((item) => item.material.id)));
  }, [listMaterial, setAddedItems]);


  const handleAddToCart = (item: Material) => {
    const price_base = parseFloat((precio * parseFloat(item.medida)).toFixed(2));
    setPriceTotal(priceTotal + price_base);
    setListMaterial([...listMaterial, {material: item, precio: price_base}]);
    setAddedItems((prev) => new Set(prev).add(item.id));
    toast({
      title: 'Material agregado al carrito',
    });
  };

  const handleRemoveToCart = (item: Material) => {
    const price_base = parseFloat((precio * parseFloat(item.medida)).toFixed(2));
    setPriceTotal(priceTotal - price_base);
    setListMaterial(listMaterial.filter((material: MaterialCar) => material.material.id !== item.id));
 
    setAddedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(item.id);
      return newSet;
    });
    toast({
      title: 'Material eliminado del carrito',
    });
  }

  return (
    <Dialog open={isVisible} onOpenChange={setIsVisible}>
      <DialogTrigger asChild>
        <Button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded-md px-4 py-2 transition-colors duration-200">
          Comprar
        </Button>
      </DialogTrigger>
  
      <DialogContent 
        aria-describedby="dialog-description" 
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Seleccione los materiales que llevará
          </DialogTitle>
        </DialogHeader>

        <div id="dialog-description" className="py-4 space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              id={`item-${item.id}`}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm text-amber-700 font-medium">Pie:</span>
                <span className="text-lg font-semibold text-amber-900">
                  {item.medida}
                </span>
                <span className="text-sm text-amber-700 font-medium">Precio:</span>
                <span className="text-amber-900 font-semibold">
                  Bs {(precio.toFixed(2) * item.medida).toFixed(2)} 
                </span>
              </div>
              {addItems.has(item.id) ?
                <>
                <button
                    className="flex items-center bg-red-800 hover:bg-red-600 text-white font-semibold rounded-full p-2 transition-colors duration-200" 
                    onClick={() => {handleRemoveToCart(item)}}
                    aria-label="Agregar al carrito"
                    >
                      <CiTrash className="text-xl" />
                    </button>

                </>
                :
                <>  
                  <button
                    className="flex items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full p-2 transition-colors duration-200" 
                    onClick={() => {handleAddToCart(item)}}
                    aria-label="Agregar al carrito"
                    >
                      <MdOutlineLocalGroceryStore className="text-xl" />
                    </button>
                </>
              }
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogItems
