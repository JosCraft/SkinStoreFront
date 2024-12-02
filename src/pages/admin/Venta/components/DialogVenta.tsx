import React,{ useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { VentaMaterial } from '../../../../components/interface/interface';
import { apiService } from '../../../../services/apiServices';


interface DialogVentaProps {
    idVenta: number;
}

const DialogVenta = ({idVenta}:DialogVentaProps) => {

    const [isVisible, setIsVisible] = useState(false);
    const [ventamaterial, setVentaMaterial] = useState<VentaMaterial>();

    const fetchVentaMaterial = async (idVenta:number) => {
        try {
            await apiService.get(`ventamaterial/${idVenta}`)
            .then((data: VentaMaterial) => {
                setVentaMaterial(data);
                console.log(data);
                setIsVisible(true);
            });
            
        } catch (error) {
            console.error('Error fetching ventamaterial:', error);
        }
    };

    useEffect(() => {
        fetchVentaMaterial(idVenta);
    }, [idVenta]);


  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded-md px-4 py-2 transition-colors duration-200">
        Ver Ventas
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
        
      </div>

      <DialogFooter className="border-t pt-4 flex justify-between items-center">
        <div>
          <span className="text-amber-700 font-medium">Total:</span>
        </div>
        <div className="space-x-2">
          <Button
            className="bg-green-500 text-white font-semibold hover:bg-green-600 rounded-md px-4 py-2 transition-colors duration-200"
            
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
  )
}

export default DialogVenta
