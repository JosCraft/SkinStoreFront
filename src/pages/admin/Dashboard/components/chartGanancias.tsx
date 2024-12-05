import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { apiService } from "../../../../services/apiServices";

interface GananciaData {
  fecha: string;
  ganancia: number;
}

const ChartGanancias = () => {
  const [chartData, setChartData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiService
      .get("dashboard/ganancias_plot")
      .then((data: GananciaData[]) => {
        // Procesar datos para el gráfico
        const labels = data.map((item) => item.fecha);
        const values = data.map((item) => item.ganancia);

        setChartData({ labels, values });
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error al cargar los datos.");
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
         {/* Line Chart for Ganancias */}
         <div className="bg-amber-50 border border-amber-200 p-4 rounded shadow-md">
            <h2 className="text-amber-900 font-bold mb-4">Ganancias por Fecha</h2>
            <LineChart
              series={[{ data: chartData.values, label: "Ganancia" }]}
              xAxis={[{ data: chartData.labels, scaleType: "point", label: "Fecha" }]}
              yAxis={[{ scaleType: "linear", label: "Ganancias" }]}
              height={400}
              margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChartGanancias;
