import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import { Input } from "../ui/input";
import { apiService } from "../../services/apiServices"; 
import { Material, Tipo } from "../interface/interface";
import { useEffect, useState } from "react";
import FormMaterial from "./formMaterial";

export const TableInventory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [materials, setMaterials] = useState<Material[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        apiService.get('inventario')
        .then((data:Material[]) => {
            setMaterials(data)
            setIsLoading(false)
        })
        .catch((error: string) => {
            setError(error)
        })
    }, [])
  
    const filteredMuestras = Array.isArray(materials)
    ? materials.filter((material) =>
      material.tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];


    return (
        <>          
            <div className="mb-6 mt-5 space-y-6">
                <div className="flex items-start justify-between bg-orange-300 shadow-md rounded-lg p-6 space-x-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[] max-w-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Agregar Nuevo Material</h2>
                        <FormMaterial />
                    </div>

                    <div className="flex flex-col w-full max-w-xs space-y-4">
                        <h2 className="text-xl font-medium text-orange-700">Buscar Material</h2>
                        <Input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-orange-100 border border-orange-300 rounded-lg p-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                </div>
            </div>
            <Table className="min-w-full bg-orange-50 border border-orange-300 shadow-md">
                <TableCaption className="text-orange-600 font-semibold">A list of your recent invoices.</TableCaption>
                <TableHeader className="bg-orange-200">
                    <TableRow>
                        <TableHead className="w-[150px] px-4 py-2 text-orange-700">Nombre</TableHead>
                        <TableHead className="px-4 py-2 text-orange-700">Precio</TableHead>
                        <TableHead className="px-4 py-2 text-orange-700">Medida</TableHead>
                        <TableHead className="px-4 py-2 text-orange-700">Color</TableHead>
                        <TableHead className="px-4 py-2 text-orange-700">Curtiembre</TableHead>
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
                    ) : materials.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-orange-500">No hay materiales disponibles.</TableCell>
                        </TableRow>
                    ) : (
                        materials.map((material: Material) => (
                            <TableRow key={material.id} className="hover:bg-orange-100 border-t border-orange-300">
                                <TableCell className="px-4 py-2 text-orange-800">{material.tipo.nombre}</TableCell>
                                <TableCell className="px-4 py-2 text-orange-800">{material.tipo.precio.toFixed(2)} €</TableCell>
                                <TableCell className="px-4 py-2 text-orange-800">{material.medida}</TableCell>
                                <TableCell className="px-4 py-2 text-orange-800">{material.tipo.color.nombre}</TableCell>
                                <TableCell className="px-4 py-2 text-orange-800">{material.tipo.curtiembre.nombre}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </>
    )
}

export default TableInventory;