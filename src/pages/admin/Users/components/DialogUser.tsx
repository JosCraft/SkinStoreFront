import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import { User } from "../../../../components/interface/interface";
import { UserForm } from "../../../../components";
import { apiService } from "../../../../services/apiServices";

interface DialogUserProps {
    user: User;
    fetchUsers?: () => void;
}

const DialogUser = ({ user, fetchUsers }: DialogUserProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>(user.role); // Assuming `user` has a `role` property

    const handleRoleChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken'); // Replace 'token' with the key used to store the token in localStorage

        if (!token) {
            console.error("Token not found in local storage");
            return;
        }

        try {
            console.log(user);
            const updatedData = {
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido, // Cambiar "apelldio" a "apellido"
                email: user.email,
                numero: user.numero,
                role: selectedRole,
                activo: user.activo, // Asegúrate de incluir un valor para `password` (si es opcional, envía una cadena vacía o null)
            };
            
            console.log('Updating role:', updatedData);
         //   const response = await apiService.update('user', user.id, updatedData);
          //  console.log('Role updated successfully:', response);

            if (fetchUsers) fetchUsers();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    return (
        <Dialog open={isVisible} onOpenChange={setIsVisible}>
            <DialogTrigger asChild>
                <Button className="bg-amber-500 text-white font-semibold hover:bg-amber-600 rounded-md px-4 py-2 transition-colors duration-200">
                    <span className="text-amber-50 font-semibold">Editar</span>
                </Button>
            </DialogTrigger>

            <DialogContent
                aria-describedby="dialog-description"
                className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
            >
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Editar Usuario
                    </DialogTitle>
                </DialogHeader>

                <div id="dialog-description" className="py-4 space-y-4">
                    <UserForm user={user} fetchUsers={fetchUsers} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogUser;
