import * as React from 'react';
import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { apiService } from '../../../../services/apiServices';
import { PlotVenta } from '../../../../components/interface/interface';

const ChartVentas = () => {
    const [chartData, setChartData] = useState<{ labels: string[]; values: number[] }>({
        labels: [],
        values: [],
        
      });
    
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        apiService
          .get("dashboard/ventas_plot")
          .then((data: PlotVenta[]) => {
            // Procesar los datos
            console.log(data);
            
            // Separar las claves (tipos de materiales) y valores (totales)
            const labels = data.map((item) => item.tipoMaterial);
            const values = data.map((item) => item.totalVentas); // O usa totalIngresos según la necesidad.
    
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
            <BarChart
              series={[{ data: chartData.values }]}
              xAxis={[{ data: chartData.labels, scaleType: "band" }]}
              height={400}
              margin={{ top: 20, bottom: 50, left: 50, right: 20 }}
            />
          )}
        </div>
      );
};

export default ChartVentas ;
