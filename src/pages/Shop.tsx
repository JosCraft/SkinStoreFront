import React from 'react'
import { useEffect, useState } from 'react'
import MainLayout from '../templates/MainLayout'
import {SelectType, CurtiembreF, CategoriaF, TipoF } from '../components'


export const Shop = () => {

  const [curtiembre, setCurtiembre] = useState<any>(null);
  const [categoria, setCategoria] = useState<any>(null);
  const [tipo, setTipo] = useState<any>(null);

  const handleCurtiembre = (curtiembre: any) => {
    setCurtiembre(curtiembre);
  }

  const handleCategoria = (categoria: any) => {
    setCategoria(categoria);
  }

  const handleTipo = (tipo: any) => {
    setTipo(tipo);
  }

  return (
    <MainLayout>
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mt-8">Shop Page</h1>
            <p className="text-center mt-4">Welcome to the Shop Page</p>
            <SelectType />     
            <CurtiembreF onValueChange={handleCurtiembre} /> 
            <CategoriaF  />
            <TipoF onValueChange={handleTipo} valueCurtiembre={curtiembre} />
        </div>  
    </MainLayout>
  )
}

export default Shop
