import { jwtDecode } from "jwt-decode"; // Solo si necesitas decodificar el token (opcional).
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";

export const AuthGuard = () => {


     // Función para verificar el token
     const checkAuthentication = () => {
        const token = localStorage.getItem('authToken'); // Recupera el token
        if (token) {
            try {
                // Opcional: Decodificar el token para verificar su validez
                const decoded = jwtDecode(token); 
                const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true; // Verifica la expiración
                return (!isExpired);
            } catch (error) {
                console.error("Token inválido", error);
                return false;
            }
        } else {
            return false;
        }
    };

    return checkAuthentication() ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN} />;
}

export default AuthGuard;