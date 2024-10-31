import React from 'react'
import MainLayout from '../templates/MainLayout'
import { ItemCard } from '../components/item'

export const Shop = () => {
  return (
    <MainLayout>
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mt-8">Shop Page</h1>
            <p className="text-center mt-4">Welcome to the Shop Page</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ml-8 mr-8 ">
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                </div>
        </div>
    </MainLayout>
  )
}

export default Shop
