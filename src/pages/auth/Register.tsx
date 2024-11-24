import { useState } from 'react';

import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import MainLayout from '../../templates/MainLayout';
import { FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import { apiService } from '../../services/apiServices';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submit = async () => {
    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    // Verificar si los campos obligatorios no están vacíos
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      alert('Por favor, complete todos los campos');
      return;
    }
  
    // Validación básica del formato del email (puedes agregar una expresión regular más compleja si lo prefieres)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, ingrese un correo electrónico válido');
      return;
    }
  
  
    try {
      // Enviar la solicitud al backend
      const response = await apiService.create('register',{
        id: 0,
        nombre: formData.firstName,
        apelldio: formData.lastName,
        numero: formData.phone,
        email: formData.email,
        password: formData.password,
        activo: true,
        role: 'user',
      }); 
  
      // Manejar la respuesta del backend
      if (response && response.success) {
        alert('Registro exitoso');
        // Redirigir al login tras un registro exitoso
        //navigate('/login'); // Suponiendo que tengas una página de login
      } else {
        alert('Error en el registro: ' + (response.message || 'Algo salió mal'));
      }
    } catch (error) {
      console.log(error);
      alert('Hubo un problema al intentar registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[600px] mx-auto mt-10 p-6 bg-amber-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mt-8 text-amber-700">Registro</h1>

        <form className="space-y-6 mt-4">
          {/* Nombre y Apellido */}
          <div className="flex flex-col">
            <Label htmlFor="firstName" className="text-lg font-medium text-gray-700">Nombre y Apellido</Label>
            <div className="flex space-x-4">
              <Input 
                type="text" 
                id="firstName" 
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Nombre" 
                className="flex-1 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Input 
                type="text" 
                id="lastName" 
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Apellido" 
                className="flex-1 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col">
            <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Teléfono</Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaPhone className="text-gray-500 ml-3" />
              <Input 
                type="tel" 
                id="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Teléfono" 
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="flex flex-col">
            <Label htmlFor="email" className="text-lg font-medium text-gray-700">Correo Electrónico</Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaEnvelope className="text-gray-500 ml-3" />
              <Input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo Electrónico" 
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <Label htmlFor="password" className="text-lg font-medium text-gray-700">Contraseña</Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaLock className="text-gray-500 ml-3" />
              <Input 
                type="password" 
                id="password" 
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña" 
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 "
              />
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col">
            <Label htmlFor="confirmPassword" className="text-lg font-medium text-gray-700">Confirmar Contraseña</Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaLock className="text-gray-500 ml-3" />
              <Input 
                type="password" 
                id="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirmar Contraseña" 
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Botón de Registro */}
          <Button 
            type="button" 
            onClick={submit}
            className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg shadow-sm flex items-center justify-center w-full transition-all ease-in duration-200"
          >
            Registrarse
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Register;
