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
import { priceTotalAtom, listMaterialAtom } from "../../context/context";

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

  const handleAddToCart = (item: Material) => {
    let price_base = parseFloat((precio * parseFloat(item.medida)).toFixed(2));
    setPriceTotal(priceTotal + price_base);
    setListMaterial([...listMaterial, {material: item, precio: price_base}]);
    toast({
      title: 'Material agregado al carrito',
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
              <button
                className="flex items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full p-2 transition-colors duration-200"
                onClick={() => handleAddToCart(item)}
                aria-label="Agregar al carrito"
              >
                <MdOutlineLocalGroceryStore className="text-xl" />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogItems
