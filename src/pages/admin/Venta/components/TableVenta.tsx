import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { apiService } from "../../../../services/apiServices";
import { Venta } from "../../../../components/interface/interface";
import DialogVenta from "./DialogVenta";
import ButtonPDF from "./ButtonPDF";
import { useEffect, useState } from "react";

const TableVenta = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    apiService
      .get("venta")
      .then((data: Venta[]) => {
        setVentas(data);
        setIsLoading(false);
      })
      .catch((error: string) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ventas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(ventas.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full">
      <Table className="min-w-full bg-orange-50 border border-orange-300 shadow-md">
        <TableCaption className="text-orange-600 font-semibold">
          Lista de Ventas
        </TableCaption>
        <TableHeader className="bg-orange-200">
          <TableRow>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Fecha
            </TableHead>
            <TableHead className="px-4 py-2 text-orange-700">
              Precio Total
            </TableHead>
            <TableHead className="px-4 py-2 text-orange-700">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-4 text-orange-500"
              >
                Cargando...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-4 text-red-600"
              >
                {error}
              </TableCell>
            </TableRow>
          ) : currentItems.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-4 text-orange-500"
              >
                No hay materiales disponibles.
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((venta: Venta) => (
              <TableRow
                key={venta.id}
                className="hover:bg-orange-100 border-t border-orange-300"
              >
                <TableCell className="px-4 py-2 text-orange-800">
                  {venta.id} {venta.fecha}
                </TableCell>
                <TableCell className="px-4 py-2 text-orange-800">
                  {venta.totalVenta}
                </TableCell>
                <TableCell className="px-4 py-2 text-orange-800">
                  <DialogVenta
                    idVenta={venta.id}
                    fecha={venta.fecha}
                    totalVenta={venta.totalVenta}
                  />
                  <ButtonPDF ventas={venta} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300"
        >
          Anterior
        </Button>
        <span className="text-orange-600 font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default TableVenta;
