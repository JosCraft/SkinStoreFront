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
        <LineChart
          series={[{ data: chartData.values, label: "Ganancia" }]}
          xAxis={[{ data: chartData.labels, scaleType: "point", label: "Fecha" }]}
          yAxis={[{ scaleType: "linear", label: "Ganancias" }]}
          height={400}
          margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
        />
      )}
    </div>
  );
};

export default ChartGanancias;
