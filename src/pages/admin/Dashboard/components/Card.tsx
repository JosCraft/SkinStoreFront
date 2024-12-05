import { Users, Package, DollarSign, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { apiService } from "../../../../services/apiServices";

interface Counts {
  cant_users: number;
  cant_material: number;
  cant_ganancias: number;
  cant_ventas: number;
}

const CardDashboard = () => {
  const [items, setItems] = useState<Counts>({
    cant_users: 0,
    cant_material: 0,
    cant_ganancias: 0,
    cant_ventas: 0,
  });

  useEffect(() => {
    apiService
      .get("dashboard/counts")
      .then((data: Counts) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-5 items-center mt-5">
      
      <Card className="w-full sm:w-1/5 flex bg-amber-500 hover:bg-amber-700
        transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300   drop-shadow-xl shadow-xl
      ">
        <CardHeader className="flex items-center space-x-4">
          <Users className="text-primary w-8 h-8" />
          <CardTitle>Usuarios</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <CardDescription className="text-xl text-black " > {items.cant_users}</CardDescription>
        </CardContent>
      </Card>
     
      <Card className="w-full sm:w-1/5 flex bg-amber-500 hover:bg-amber-700
        transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  drop-shadow-xl shadow-xl">
        <CardHeader className="flex items-center space-x-4">
          <Package className="text-primary w-8 h-8" />
          <CardTitle>Materiales</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <CardDescription  className="text-xl text-black " >{items.cant_material}</CardDescription>
        </CardContent>
      </Card>

      <Card className="w-full sm:w-1/5 flex bg-amber-500 hover:bg-amber-700
        transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  drop-shadow-xl shadow-xl">
        <CardHeader className="flex items-center space-x-4">
          <DollarSign className="text-primary w-8 h-8" />
          <CardTitle>Ganancias</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <CardDescription  className="text-xl text-black " > Bs {items.cant_ganancias.toFixed(2)}</CardDescription>
        </CardContent>
      </Card>
   
      <Card className="w-full sm:w-1/5 flex bg-amber-500 hover:bg-amber-700
        transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  drop-shadow-xl shadow-xl">
        <CardHeader className="flex items-center space-x-4">
          <ShoppingCart className="text-primary w-8 h-8" />
          <CardTitle>Ventas</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <CardDescription className="text-xl text-black " >{items.cant_ventas}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardDashboard;
