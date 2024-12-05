import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { apiService } from "../../../../services/apiServices";
import { User } from "../../../../components/interface/interface";
import { useEffect, useState } from "react";
import DialogUser from "./DialogUser";
const TableUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10);

    useEffect(() => {
        fetchUsers();   
    }, []);

    const fetchUsers = () => {
        apiService
            .get("user")
            .then((data: User[]) => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch((error: string) => {
                setError(error);
                setIsLoading(false);
            });
    }

    const deleteHandler = (id: number) => {
        alert("¿Estas seguro de eliminar el usuario?");
        apiService
            .delete(`user/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

  return (
    <div className="w-full">
      <Table className="min-w-full bg-orange-50 border border-orange-300 shadow-md">
        <TableCaption className="text-orange-600 font-semibold">
          Lista de Usuarios
        </TableCaption>
        <TableHeader className="bg-orange-200">
          <TableRow>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Nombre
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Apellido
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Email
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Rol
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Estado
            </TableHead>
            <TableHead className="w-[150px] px-4 py-2 text-orange-700">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="px-4 py-2">{user.nombre}</TableCell>
              <TableCell className="px-4 py-2">{user.apelldio}</TableCell>
              <TableCell className="px-4 py-2">{user.email}</TableCell>
              <TableCell className="px-4 py-2">{user.role}</TableCell>
              <TableCell className="px-4 py-2">{user.activo ? "Activo" : "Inactivo"}</TableCell>
              <TableCell className="px-4 py-2">
                <DialogUser user={user} fetchUsers={fetchUsers} />
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteHandler(user.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TableUser
