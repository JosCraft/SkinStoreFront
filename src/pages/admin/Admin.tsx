import { lazy } from 'react'
import { RoutesNotFound } from '../../utilities';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutesAdmin } from '../../models';

const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Inventory = lazy(() => import('./Inventory/Inventory'));
const Venta = lazy(() => import('./Venta/Venta'));

const Admin = () => {
  return (
    <RoutesNotFound>
        <Route path="/" element={<Navigate  to={PrivateRoutesAdmin.DASHBOARD} />} />
        <Route path={PrivateRoutesAdmin.DASHBOARD} element={<Dashboard/>}/>
        <Route path={PrivateRoutesAdmin.INVENTORY} element={<Inventory/>}/>
        <Route path={PrivateRoutesAdmin.VENTAS} element={<Venta/>}/>
    </RoutesNotFound>
  )
}

export default Admin
