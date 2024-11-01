


const Filter = () => {
    const [selectedCiudad, setSelectedCiudad] = useState<string | null>(null);
    const ciudadesPredeterminadas: Ciudad[] = [
        { id: "1", nombre: "La Paz" },
        { id: "2", nombre: "Cochabamba" },
        { id: "3", nombre: "Santa Cruz" }
    ];


    return (
        <div className="flex flex-col gap-1">
            <Select value={selectedCiudad || ""} onValueChange={handleChange} className="relative">
                <SelectTrigger className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <SelectValue placeholder="Seleccione una Ciudad" />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-300">
                    <SelectGroup>
                        <SelectLabel className="font-medium text-gray-600">Ciudad</SelectLabel>
                        {ciudadesPredeterminadas.length > 0 ? (
                            ciudadesPredeterminadas.map((ciudad) => (
                                <SelectItem
                                    key={ciudad.id}
                                    value={ciudad.id}
                                    className="cursor-pointer hover:bg-blue-100 focus:bg-blue-200 transition duration-150"
                                >
                                    {ciudad.nombre}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectLabel>No hay ciudades disponibles</SelectLabel>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default Filter
