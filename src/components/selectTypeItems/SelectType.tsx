import React from 'react'
import { Button } from '../ui/button'


const SelectType = () => {
  return (
    <div>
            <h2 className="text-2xl font-bold text-center mt-8">Seleccionar</h2>
            <div className="flex justify-center mt-4">
                <Button className='ml-4' >Cuero</Button>
                <Button className='ml-4' >Suela</Button>
                <Button className='ml-4' >Pintura</Button>
                <Button className='ml-4' >Todos</Button>
            </div>
    </div>
  )
}

export default SelectType
