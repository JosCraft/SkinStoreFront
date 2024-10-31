import { useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-amber-900 text-amber-50 shadow-md">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <a href="/" className="hover:text-amber-400 transition-colors duration-200">
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="/about" className="hover:text-amber-400 transition-colors duration-200">
                            Sobre Nosotros
                        </a>
                    </li>
                    <li>
                        <a href="/shop" className="hover:text-amber-400 transition-colors duration-200">
                            Tienda
                        </a>
                    </li>
                </ul>

                <Button
                    className="bg-orange-400 md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded hover:bg-orange-600"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>

            </nav>

            {isOpen && (
                <div className="bg-orange-900 text-amber-50 hover:text-amber-400  md:hidden">
                    <ul className="flex flex-col space-y-2 px-4 py-2">
                        <li>
                            <a href="/" className="block py-2 px-4 text-white hover:bg-orange-400 rounded transition-colors duration-200">
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 px-4 text-white hover:bg-orange-400 rounded transition-colors duration-200">
                                Sobre Nosotros
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
