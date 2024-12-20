import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog";
  import { useAtom } from "jotai";
  import { useState } from "react";
  import { Button } from "../ui/button";
  import { MdOutlineLocalGroceryStore } from "react-icons/md";
  import { priceTotalAtom, listMaterialAtom,addedItems } from "../../context/context";
import { apiService } from "../../services/apiServices";
  
  export const DialogCar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [priceTotal, setPriceTotal] = useAtom(priceTotalAtom);
    const [listMaterial, setListMaterial] = useAtom(listMaterialAtom);
    const [, setAddedItems] = useAtom(addedItems);

    const handleRemoveItem = (id) => {
      const item = listMaterial.find((item) => item.material.id === id);
      const updatedList = listMaterial.filter((item) => item.material.id !== id);
      setListMaterial(updatedList);
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
      const updatedTotal = updatedList.reduce((total, item) => total + item.precio, 0);
      setPriceTotal(updatedTotal);
    };
  
    const handlePurchase = async () => {
      try {
        const fecha = new Date().toISOString().split('T')[0];
        const totalVenta = priceTotal.toFixed(2);
    
        // Crear la venta y obtener el ID
        const ventaResponse = await apiService.create('venta', { id: 0, fecha, totalVenta, idUsuario: 1 });
        const idVenta = ventaResponse.id;
    
        console.log('Venta creada con éxito. ID:', idVenta);
    
        // Actualizar inventario y registrar materiales en la venta
        for (const item of listMaterial) {
          await apiService.delete(`inventario/${item.material.id}`);
          await apiService.create('ventamaterial', { idVenta, idMaterial: item.material.id });
        }
    
        alert('Compra realizada exitosamente!');
        
        // Limpiar el estado
        setListMaterial([]);
        setPriceTotal(0);
        setIsVisible(false);
      } catch (error) {
        console.error('Error al procesar la compra:', error);
        alert('Hubo un error al realizar la compra. Por favor, inténtalo nuevamente.');
      }
    };
  
    return (
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogTrigger asChild>
          <Button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded-md px-4 py-2 transition-colors duration-200">
            <MdOutlineLocalGroceryStore size={20} className="ml-2" />
            <span className="text-amber-50 font-semibold">Bs. {priceTotal.toFixed(2)}</span>
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
            {listMaterial.map((item) => (
              <div
                key={item.material.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-amber-700 font-medium">Pie:</span>
                  <span className="text-lg font-semibold text-amber-900">
                    {item.material.medida}
                  </span>
                  <span className="text-sm text-amber-700 font-medium">Precio:</span>
                  <span className="text-amber-900 font-semibold">
                    Bs {item.precio.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="bg-red-500 text-white font-semibold hover:bg-red-600 rounded-full p-2 transition-colors duration-200"
                  onClick={() => handleRemoveItem(item.material.id)}
                  aria-label="Eliminar item"
                >
                  X
                </Button>
              </div>
            ))}
          </div>
  
          <DialogFooter className="border-t pt-4 flex justify-between items-center">
            <div>
              <span className="text-amber-700 font-medium">Total:</span>
              <span className="text-amber-500 font-semibold ml-2">Bs. {priceTotal.toFixed(2)}</span>
            </div>
            <div className="space-x-2">
              <Button
                className="bg-green-500 text-white font-semibold hover:bg-green-600 rounded-md px-4 py-2 transition-colors duration-200"
                onClick={handlePurchase}
              >
                Comprar
              </Button>
              <Button
                className="bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 rounded-md px-4 py-2 transition-colors duration-200"
                onClick={() => setIsVisible(false)}
              >
                Cerrar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogCar;
  