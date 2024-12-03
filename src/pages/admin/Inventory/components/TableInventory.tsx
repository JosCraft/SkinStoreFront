import React, { useEffect, useState } from "react";
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
import { Input } from "../../../../components/ui/input";
import { apiService } from "../../../../services/apiServices";
import { Material } from "../../../../components/interface/interface";
import FormMaterial from "./FormMaterial";

export const TableInventory = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    apiService
      .get("inventario")
      .then((data: Material[]) => {
        setMaterials(data);
        setIsLoading(false);
      })
      .catch((error: string) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const filteredMaterials = materials.filter((material) =>
    material?.tipo?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los materiales para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMaterials = filteredMaterials.slice(
    startIndex,
    startIndex + itemsPerPage,    
  );

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  return (
    <>
      <div className="mb-6 mt-5 space-y-6">
        <div className="flex items-start justify-between bg-orange-300 shadow-md rounded-lg p-6 space-x-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Agregar Nuevo Material
            </h2>
            <FormMaterial />
          </div>

          <div className="flex flex-col w-full max-w-xs space-y-4">
            <h2 className="text-xl font-medium text-orange-700">
              Buscar Material
            </h2>
            <Input
              type="text"
              placeholder="Buscar por nombre de tipo..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}}
              className="w-full bg-orange-100 border border-orange-300 rounded-lg p-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </div>

      <Table className="min-w-full bg-orange-50 border border-orange-300 shadow-md">
        <TableCaption className="text-orange-600 font-semibold">
          Lista de Materiales
        </TableCaption>
        <TableHeader className="bg-orange-200">
          <TableRow>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Nombre
            </TableHead>
            <TableHead className="px-4 py-2 text-orange-700">Precio</TableHead>
            <TableHead className="px-4 py-2 text-orange-700">Medida</TableHead>
            <TableHead className="px-4 py-2 text-orange-700">Color</TableHead>
            <TableHead className="px-4 py-2 text-orange-700">
              Curtiembre
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-orange-500"
              >
                Cargando...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-red-600"
              >
                {error}
              </TableCell>
            </TableRow>
          ) : currentMaterials.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 text-orange-500"
              >
                No hay materiales disponibles.
              </TableCell>
            </TableRow>
          ) : (
            currentMaterials.map((material: Material) => (
              <TableRow
                key={material.id}
                className="hover:bg-orange-100 border-t border-orange-300"
              >
                <TableCell className="px-4 py-2 text-orange-800">
                  {material.tipo?.nombre}
                </TableCell>
                <TableCell className="px-4 py-2 text-orange-800">
                  {`${(
                    material?.tipo?.precio * parseFloat(material.medida || "1")
                  ).toFixed(2)} Bs`}
                </TableCell>
                <TableCell className="px-4 py-2 text-orange-800">
                  {material.medida}
                </TableCell>
                <TableCell className="px-4 py-2 text-orange-800">
                  {material.tipo?.color.nombre}
                </TableCell>
                <TableCell className="px-4 py-2 text-orange-800">
                  {material.tipo?.curtiembre.nombre}
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
    </>
  );
};

export default TableInventory;
