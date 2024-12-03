import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import Shop from '../pages/Shop';
import { Register } from '../pages/auth';
import { PrivateRoutesAdmin, PublicRoutes } from '../models';
import { AuthGuard } from '../guards';
import { RoutesNotFound } from '../utilities';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('../pages/auth/Login'));
const Admin = lazy(() => import('../pages/admin/Admin'));
import {MyDocument} from '../components/pdf/MyDocument'
const AppRoutes = () => {
  return (
    <Suspense fallback={<>Cargando</>}>
      <BrowserRouter>
        <RoutesNotFound>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/register" element={<Register/>}/>
          <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
          <Route element={<AuthGuard/>}>
            <Route path={`${PrivateRoutesAdmin.BASE}/*`} element={<Admin/>}/>
          </Route>
          <Route path="/pdf" element={<MyDocument/>}/>
        </RoutesNotFound>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;

