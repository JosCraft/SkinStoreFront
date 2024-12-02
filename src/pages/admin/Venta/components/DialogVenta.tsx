import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog';
import { Button } from '../../../../components/ui/button';
import { VentaMaterial } from '../../../../components/interface/interface';
import { apiService } from '../../../../services/apiServices';

interface DialogVentaProps {
  idVenta: number;
  fecha: string;
  totalVenta: number;
}

const DialogVenta = ({ idVenta,fecha,totalVenta }: DialogVentaProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ventamaterial, setVentaMaterial] = useState<VentaMaterial[]>([]);

  const fetchVentaMaterial = async (idVenta: number) => {
    try {
      await apiService.get(`ventamaterial/${idVenta}`)
      .then((data: VentaMaterial[]) => {
        setVentaMaterial(data);
      })
     
    } catch (error) {
      console.error('Error fetching ventamaterial:', error);
      alert('No se pudieron cargar los datos de los materiales.');
    }
  };


  const onOpenChange = (isOpen: boolean) => {
    setIsVisible(isOpen);
    if (isOpen) {
      fetchVentaMaterial(idVenta);
    
    }
  };
  console.log(ventamaterial);
  return (
    <Dialog open={isVisible} onOpenChange={onOpenChange}>
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
            Detalle de la Venta
          </DialogTitle>
        </DialogHeader>

        <div id="dialog-description" className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-700 font-medium">Fecha:</span>
            <span className="text-lg font-semibold text-amber-900">{fecha}</span>
          </div>
          {ventamaterial ? (
            ventamaterial.map((item) => (
              <div
                key={item.Material.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-amber-700 font-medium">Material:</span>
                  <span className="text-lg font-semibold text-amber-900">
                    {item.Material.medida}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-amber-700 font-medium">Costo:</span>
                  <span className="text-lg font-semibold text-amber-900">
                    {(parseFloat(item.Material.tipo?.precio) * parseFloat(item.Material.medida)).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
            
          ) : (
            <p className="text-gray-500">Cargando datos...</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-700 font-medium">Total:</span>
            <span className="text-lg font-semibold text-amber-900">{totalVenta}</span>
            </div>
        </div>

        <DialogFooter className="border-t pt-4 flex justify-between items-center">
          <Button
            className="bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 rounded-md px-4 py-2 transition-colors duration-200"
            onClick={() => setIsVisible(false)}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVenta;
