import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import Shop from '../pages/Shop';
import { Dashboard, Inventory } from '../pages/admin';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/adm" element={<Dashboard/>}/>
        <Route path="/adm/inventory" element={<Inventory/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
