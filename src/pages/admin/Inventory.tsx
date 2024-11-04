import React from 'react'
import MainAdmLayout from '../../templates/MainAdmLayout'
import { TableInventory } from '../../components/inventory'

export const Inventory = () => {
  return (
    <MainAdmLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Inventory</h1>
            <TableInventory />
      </div>
    </MainAdmLayout>
  )
}

export default Inventory;
