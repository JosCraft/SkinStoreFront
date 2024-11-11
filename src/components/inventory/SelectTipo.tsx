import { useEffect, useState } from 'react'
import { Tipo } from '../interface/interface'
import { apiService } from "../../services/apiServices";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'


interface TipoFProps {
    onValueChange: (id: number) => void;
}

const SelectTipo = ({ onValueChange }: TipoFProps) => {

    const [tipos, setTipos] = useState<Tipo[]>([])

    useEffect(() => {
            apiService.get(`tipo`)
            .then((data: Tipo[]) => {
                setTipos(data)
            })
            .catch(error => {
                console.log(error)
            })        
    },[])
    return (
        <div>
        
        </div>
    )
}

export default SelectTipo
