import React, { useState } from 'react';
import { apiService } from '../../services/apiServices';
import { User } from '../../components/interface/interface';

interface UserFormProps {
    user: User;
    fetchUsers?: () => void;
}

const UserForm = ({ user, fetchUsers }: UserFormProps) => {
    // State for form data, initialized with user prop
    const [formData, setFormData] = useState<User>({ ...user });

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            // Update user with the new form data
            const response = await apiService.update('user', user.id, formData);
            console.log('User updated successfully:', response);
            // Fetch users again to reflect the changes
            if (fetchUsers) fetchUsers();            
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre" className="block text-amber-800 font-semibold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="apellido" className="block text-amber-800 font-semibold mb-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        id="apelldio"
                        className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={formData.apelldio } 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-amber-800 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="numero" className="block text-amber-800 font-semibold mb-2">
                        Número
                    </label>
                    <input
                        type="text"
                        id="numero"
                        className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={formData.numero}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-300"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default UserForm;
