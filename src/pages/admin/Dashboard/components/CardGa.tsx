import { useState, useEffect } from 'react'
import { apiService } from '../../../../services/apiServices';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../../../components/ui/card";
import { GiAnimalHide } from "react-icons/gi";

interface material_gan{
    id: number;
    nombre: string;
    ganancias: number ;
}

const CardGa = () => {

    const [items, setItems] = useState<material_gan[]>([]);

    useEffect(() => {
        apiService
          .get("dashboard/material_by_gain")
          .then((data: material_gan[]) => {
            console.log(data);
            setItems(data.slice(0, 5));
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

  return (
    <div className="text-center mt-10 mb-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Materiales con mejor ganancia</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[18%] flex flex-col items-center bg-amber-400 hover:bg-amber-500 transition-transform transform hover:scale-105 duration-300 shadow-lg rounded-xl"
          >
            <CardHeader className="flex flex-col items-center py-4">
              <GiAnimalHide className="text-primary w-10 h-10 mb-2" />
              <CardTitle className="text-lg font-semibold">{item.nombre}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <CardDescription className="text-2xl font-bold text-black">
                {item.ganancias}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CardGa
