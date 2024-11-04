import { useAtom } from 'jotai'
import { useState } from 'react'
import { CategoriaF } from './CategoriaF'
import { CurtiembreF } from './CurtiembreF'
import { TipoF } from './TipoF'
import { selectedCategoriaAtom, selectedCurtiembreAtom } from '../../context/context'

const Filter = () => {
    const [, setCategoria] = useAtom(selectedCategoriaAtom)
    const [, setCurtiembre] = useAtom(selectedCurtiembreAtom)


    const handleCategoriaSelect = (value: number) => {
        setCategoria(value)
    }

    const handleCurtiembreSelect = (value: number) => {
        setCurtiembre(value)
    }

    return (
        <div className="flex flex-col gap-1">
            <h2>Filtro </h2>
            <CategoriaF onValueChangeCategoria={handleCategoriaSelect} />
            <CurtiembreF onValueChangeCurtiembre={handleCurtiembreSelect} />            
        </div>
    );
}

export default Filter
