import { useEffect, useState } from "react";
import { Curtiembre } from "../interface/interface";
import { apiService } from "../../services/apiServices";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";

interface CurtiembreFProps {
  onValueChangeCurtiembre: (id: number) => void;
}

export function CurtiembreF({ 
  onValueChangeCurtiembre}: CurtiembreFProps) {

  const [curtiembres, setCurtiembres] = useState<Curtiembre[]>([]);
  
  useEffect(() => {
    apiService.get(`curtiembre`)
    .then((data: Curtiembre[]) => {
        setCurtiembres(data);
        data.push({id: -1, nombre: "Todas", numero: 0})
    })
    .catch(error => {
        console.log(error)
    })
  },[]);

  const handleSelect = (id: number) => {
    onValueChangeCurtiembre(id);
  }
 

    return (
      <div className="flex flex-col gap-1">
      <Select onValueChange={handleSelect} >
        <SelectTrigger className="bg-orange-200 w-[180px] hover:bg-orange-300 focus:bg-orange-300 text-orange-950">
          <SelectValue placeholder="Curtiembres" />
        </SelectTrigger>
        <SelectContent className="bg-orange-100">
          <SelectGroup>
            <SelectLabel className="text-orange-800">Curtiembres</SelectLabel>
            {curtiembres.length > 0 ? (
              curtiembres.map((curtiembre) => (
                <SelectItem
                  className="text-orange-800 hover:bg-orange-300 focus:bg-orange-300"
                  key={curtiembre.id}
                  value={curtiembre.id}
                >
                  {curtiembre.nombre}
                </SelectItem>
              ))
            ) : (
              <SelectLabel className="text-orange-800">Loading...</SelectLabel>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>    
  );
}

export default CurtiembreF
