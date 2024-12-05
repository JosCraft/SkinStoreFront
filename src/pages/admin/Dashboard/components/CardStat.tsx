import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { apiService } from "../../../../services/apiServices";
import { GiAnimalHide } from "react-icons/gi";

interface MaterialSell {
  id: number;
  nombre: string;
  cantVentas: number;
}

const CardStat = () => {
  const [items, setItems] = useState<MaterialSell[]>([]);

  useEffect(() => {
    apiService
      .get("dashboard/material_by_sell")
      .then((data: MaterialSell[]) => {
        setItems(data.slice(0, 5));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="text-center mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Materiales más vendidos</h1>
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
                {item.cantVentas}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardStat;