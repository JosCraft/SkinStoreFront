import React from 'react'
import { useEffect, useState } from 'react'

import MainLayout from '../templates/MainLayout'
import { Filter, ItemCard } from '../components'


export const Shop = () => {

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mt-8">Shop Page</h1>
          <p className="text-center mt-4 text-gray-600">Welcome to the Shop Page</p>
          <div className="flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8 mx-auto">
              <div className="w-full lg:w-1/4">
                  <Filter />
              </div>
              <div className="w-full lg:w-3/4">
                  <ItemCard />
              </div>
          </div>
      </div>  
    </MainLayout>

  )
}

export default Shop
