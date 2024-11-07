import React from 'react'
import { apiService } from '../../services/apiServices'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
  } from "../ui/select";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Curtiembre } from '../interface/interface';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '../../hooks/use-toast';

interface CurtiembreFProps {
    onValueChangeCurtiembre: (id: number) => void;
}

export const SelectCurtiembre = ({ onValueChangeCurtiembre }:CurtiembreFProps) => {
    const [curtiembres, setCurtiembres] = useState<Curtiembre[]>([]);
    const [isCreate, setIsCreate] = useState(false);
    
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');

    useEffect(() => {
            fetchCurtiembres();
    },[]);

    const fetchCurtiembres = () => {
        apiService.get(`curtiembre`)
        .then((data: Curtiembre[]) => {
            setCurtiembres(data);
        })
        .catch(error => {
            console.log(error)
        })
        }

    const handleSelect = (id: number) => {
        onValueChangeCurtiembre(id);
    };

    const handleValueNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(e.target.value);
    }

    const handelValueNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumero(e.target.value);
    }   

    const submit = () => {
        apiService.create('curtiembre', {id:0, nombre: nombre, numero: numero});
        setIsCreate(!isCreate);
        toast({
            title: 'Curtiembre Creada',
          });
          fetchCurtiembres();
    }

    const deleteItem = (id: number) => {
        console.log(id);
        apiService.delete(`curtiembre/${id}`);
        fetchCurtiembres();
    }

    return (
        <>{!isCreate ? (
            <div className='flex aling-items-center'>
                <Select onValueChange={handleSelect} >
                    <SelectTrigger className="">
                    <SelectValue placeholder="Curtiembres" />
                    </SelectTrigger>
                    <SelectContent className="">
                    <SelectGroup>
                        <SelectLabel className="">Curtiembres</SelectLabel>
                        {curtiembres.length > 0 ? (
                        curtiembres.map((curtiembre) => (
                            <SelectItem
                            className=""
                            key={curtiembre.id}
                            value={curtiembre.id}
                            >
                            <div>
                            {curtiembre.nombre}
                            <Button className='bg-red-500 ml-1 hover:bg-red-700' onClick={() => deleteItem(curtiembre.id)}>
                                <FaRegTrashAlt size={20}/>
                            </Button>
                            </div>
                            </SelectItem>
                        ))
                        ) : (
                        <SelectLabel className="text-orange-800">Loading...</SelectLabel>
                        )}
                    </SelectGroup>
                    </SelectContent>
                </Select>
                <Button  className='bg-amber-500 ml-1 hover:bg-amber-700 ' onClick={() => setIsCreate(!isCreate)} >
                        <CiCirclePlus size={50}/>
                </Button>
            </div>
        ):(
            <div>
                <p>Crear Curtiembre</p>
                <Input onChange={handleValueNombre}  placeholder='Nombre Curtiembre'/>
                <Input onChange={handelValueNumero}  placeholder='Numero' />
                <Button onClick={submit}>Guardar</Button>
            </div>
        )}</>
    )
}
