import React from 'react'
import {MainAdmLayout} from '../../../templates'
import { TableInventory } from '../../../components'

export const Inventory = () => {
  return (
    <MainAdmLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Inventario</h1>
            <TableInventory />
      </div>
    </MainAdmLayout>
  )
}

export default Inventory;
