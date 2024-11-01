import React from 'react'
import MainLayout from '../templates/MainLayout'
import {SelectType, CurtiembreF } from '../components'


export const Shop = () => {
  return (
    <MainLayout>
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mt-8">Shop Page</h1>
            <p className="text-center mt-4">Welcome to the Shop Page</p>
            <SelectType />     
            <CurtiembreF />       
        </div>
    </MainLayout>
  )
}

export default Shop
