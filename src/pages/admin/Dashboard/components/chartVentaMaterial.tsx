import * as React from "react";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { apiService } from "../../../../services/apiServices";

interface PlotVenta {
  tipoMaterial: string;
  totalVentas: number;
}



const DashboardCharts = () => {
  const [ventasData, setVentasData] = useState<{ labels: string[]; values: number[] }>({
    labels: [],
    values: [],
  });
  

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Amber color tones
  const amberTones = [
    "#FFFBEB", "#FEF3C7", "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F"
  ];

  // Generate random colors for each label
  const generateRandomColors = (length: number) => {
    return Array.from({ length }, () => amberTones[Math.floor(Math.random() * amberTones.length)]);
  };

  const [barColors, setBarColors] = useState<string[]>([]);

  // Fetch data for ventas chart
  useEffect(() => {
    apiService
      .get("dashboard/ventas_plot")
      .then((data: PlotVenta[]) => {
        const labels = data.map((item) => item.tipoMaterial);
        const values = data.map((item) => item.totalVentas);
        setVentasData({ labels, values });
        setBarColors(generateRandomColors(labels.length));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los datos de ventas.");
        setIsLoading(false);
      });
  }, []);


  return (
    <div className="">
      {isLoading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Bar Chart for Ventas */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded shadow-md">
            <h2 className="text-amber-900 font-bold mb-4">Ventas por Material</h2>
            <BarChart
              series={[{
                data: ventasData.values,
                label: "Ventas",
                color: barColors,
              }]}
              xAxis={[{ data: ventasData.labels, scaleType: "band" }]}
              height={400}
              margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCharts;
