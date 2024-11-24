import { useState, useEffect } from "react";
import NavBarStyle from "./NavBarStyle";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";
import { FaHome, FaInfoCircle, FaStore } from 'react-icons/fa';
import { DialogCar } from "../components/dialogCar/DialogCar";
import { jwtDecode } from "jwt-decode"; // Solo si necesitas decodificar el token (opcional).

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Función para verificar el token
    const checkAuthentication = () => {
        const token = localStorage.getItem('authToken'); // Recupera el token
        if (token) {
            try {
                // Opcional: Decodificar el token para verificar su validez
                const decoded = jwtDecode(token); 
                const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true; // Verifica la expiración
                setIsAuthenticated(!isExpired);
            } catch (error) {
                console.error("Token inválido", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []); // Se ejecuta al cargar el componente

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogin = () => {
        window.location.href = "/login"; // Cambia a la ruta de login.
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Elimina el token.
        setIsAuthenticated(false);
        window.location.reload(); // Opcional: Recarga la página.
    };

    return (
        <header className="bg-amber-900 text-amber-50 shadow-md">
            <NavBarStyle>
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <a href="/" className="link hover:text-amber-400 transition-colors duration-200">
                                <FaHome size={20} />
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="link hover:text-amber-400 transition-colors duration-200">
                                <FaInfoCircle size={20} />
                                Sobre Nosotros
                            </a>
                        </li>
                        <li>
                            <a href="/shop" className="link hover:text-amber-400 transition-colors duration-200">
                                <FaStore size={20} />
                                Tienda
                            </a>
                        </li>
                    </ul>

                    {isAuthenticated ? (
                        <>
                            <DialogCar />
                            <Button
                                className="bg-red-500 text-white hover:bg-red-700 rounded shadow-sm ml-4"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="bg-blue-500 text-white hover:bg-blue-700 rounded shadow-sm"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    )}

                    <Button
                        className="bg-orange-400 md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded hover:bg-orange-600"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </nav>

                {isOpen && (
                    <div className="bg-orange-900 text-amber-50 hover:text-amber-400 md:hidden">
                        <ul className="flex flex-col space-y-2 px-4 py-2">
                            <li>
                                <a href="/" className="block py-2 px-4 link text-white hover:bg-orange-400 rounded transition-colors duration-200">
                                    <FaHome size={20} /> Inicio
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="block py-2 px-4 link text-white hover:bg-orange-400 rounded transition-colors duration-200">
                                    <FaInfoCircle size={20} />
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="/shop" className="block py-2 px-4 link hover:text-amber-400 transition-colors duration-200">
                                    <FaStore size={20} />
                                    Tienda
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </NavBarStyle>
        </header>
    );
};

export default Navbar;
