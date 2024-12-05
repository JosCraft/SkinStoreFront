import React from 'react'
import {MainAdmLayout} from '../../../templates'
import { TableUser } from './components'
const Users = () => {
  return (
    <MainAdmLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Usuarios</h1>       
           <TableUser />
      </div>
    </MainAdmLayout>
  )
}

export default Users
