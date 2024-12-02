import React from 'react'
import {MainAdmLayout} from '../../../templates'
import { TableVenta } from './components'

const Venta = () => {
  return (
    <MainAdmLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Ventas</h1>
            <TableVenta />
      </div>
    </MainAdmLayout>
  )
}

export default Venta
