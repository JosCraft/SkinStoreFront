import { useState } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import MainLayout from '../../templates/MainLayout';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(''); // Para manejar errores

interface FormData {
    email: string;
    password: string;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
}

const handleInputChange = (e: InputChangeEvent) => {
    const { id, value } = e.target;
    setFormData((prevData: FormData) => ({
        ...prevData,
        [id]: value,
    }));
};

  const submitLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor ingrese todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/login?email=${formData.email}&password=${formData.password}`);

      if (response.status === 200) {
        // Aquí puedes manejar la respuesta del backend, como guardar el token
        console.log('Login exitoso:', response.data);
        // Guardar el token de autenticación en localStorage o estado global
        localStorage.setItem('authToken', response.data.token); // ejemplo de guardar el token
        setError(""); // Limpiar errores en caso de éxito
        // Redirigir a la página principal o dashboard
        window.location.href = '/'; // ejemplo de redirección
      }
    } catch (error) {
      setError('Credenciales incorrectas o error al intentar iniciar sesión');
      console.error('Error de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[600px] mx-auto mt-10 p-6 bg-amber-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mt-8 text-amber-700">Iniciar sesión</h1>

        <form className="space-y-6 mt-4" onSubmit={(e) => e.preventDefault()}>    
          <div className="flex flex-col">
            <Label htmlFor="email" className="text-lg font-medium text-gray-700">
              Correo Electrónico
            </Label>
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
          <div className="flex flex-col">
            <Label htmlFor="password" className="text-lg font-medium text-gray-700">
              Contraseña
            </Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaLock className="text-gray-500 ml-3" />
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Error de login */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Botón de login */}
          <Button
            type="button"
            onClick={submitLogin}
            className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg shadow-sm flex items-center justify-center w-full transition-all ease-in duration-200"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
