import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../../components/ui/table";
import { apiService } from "../../../../services/apiServices";
import { Venta } from "../../../../components/interface/interface";
import DialogVenta from "./DialogVenta";
import { useEffect, useState } from "react";
const TableVenta = () => {

    const [ventas, setVentas] = useState<Venta[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredVentas, setFilteredVentas] = useState<Venta[]>(ventas);

    useEffect(() => {
      apiService.get('venta')
        .then((data: Venta[]) => {
          setVentas(data);
          setFilteredVentas(data);
          setIsLoading(false);
        })
        .catch((error: string) => {
          setError(error);
          setIsLoading(false);
        });
    }, []);

    

  return (
    <Table className="min-w-full bg-orange-50 border border-orange-300 shadow-md">
    <TableCaption className="text-orange-600 font-semibold">
      Lista de Ventas
    </TableCaption>
    <TableHeader className="bg-orange-200">
            <TableRow>
              <TableHead className="w-[150px] px-4 py-2 text-orange-700">Fecha</TableHead>
              <TableHead className="px-4 py-2 text-orange-700">Precio Total</TableHead>
              <TableHead className="px-4 py-2 text-orange-700">Acciones</TableHead>
            </TableRow>
    </TableHeader>
    <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-orange-500">Cargando...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-red-600">{error}</TableCell>
              </TableRow>
            ) : filteredVentas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-orange-500">No hay materiales disponibles.</TableCell>
              </TableRow>
            ) : (
              filteredVentas.map((venta: Venta) => (
                <TableRow key={venta.id} className="hover:bg-orange-100 border-t border-orange-300">
                  <TableCell className="px-4 py-2 text-orange-800">{venta.fecha}</TableCell>
                  <TableCell className="px-4 py-2 text-orange-800">{venta.totalVenta}</TableCell>
                  <TableCell className="px-4 py-2 text-orange-800">
                    <DialogVenta idVenta={venta.id}/>
                    <button className="bg-amber-500 text-white px-4 py-2 rounded-lg">Generar Reporte</button>
                    </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
    </Table>
  )
}

export default TableVenta
