import React from 'react'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Tipo } from '../interface/interface'
import { apiService } from "../../services/apiServices";
import { selectedCurtiembreAtom } from '../../context/context'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

interface TipoFProps {
    onValueChange: (id: number) => void;
    valueCurtiembre: number ;
}

export function TipoF({ onValueChange, valueCurtiembre }: TipoFProps) {  

    const [selectedCurtiembre] = useAtom(selectedCurtiembreAtom)
    const [tipos, setTipos] = useState<Tipo[]>([])

    useEffect(() => {
        
            apiService.get(`tipo/${valueCurtiembre}`)
            .then((data: Tipo[]) => {
                setTipos(data)
            })
            .catch(error => {
                console.log(error)
            })
        
    },[])

    return (
        <div className='flex flex-col gap-1' >
            <Select>
                <SelectTrigger className="bg-orange-200 w-[180px] hover:bg-orange-300 focus:bg-orange-300 text-orange-950">
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-orange-100">
                    <SelectGroup>
                        <SelectLabel className='text-orange-800'>Tipo</SelectLabel>
                        {tipos.length > 0 ? (
                            tipos.map((tipo) => (
                                <SelectItem
                                    className="text-orange-800 hover:bg-orange-300 focus:bg-orange-300"
                                    key={tipo.id}
                                    value={tipo.id}
                                >
                                    {tipo.nombre}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectLabel className="text-orange-800">Loading...</SelectLabel>
                        )}
                        
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TipoF
