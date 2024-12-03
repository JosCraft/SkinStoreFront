import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { MyDocument } from '../../../../components/pdf/MyDocument';
import { VentaMaterial, Venta } from '../../../../components/interface/interface';
import { apiService } from '../../../../services/apiServices';

interface ButtonPDFProps {
  ventas: Venta;
}

const ButtonPDF = ({ ventas }: ButtonPDFProps) => {
  const [ventaMaterial, setVentaMaterial] = useState<VentaMaterial[]>([]);

  const fetchVentaMaterial = async (idVenta: number): Promise<VentaMaterial[]> => {
    try {
      const data: VentaMaterial[] = await apiService.get(`ventamaterial/${idVenta}`);
      return data; // Devuelve los datos directamente
    } catch (error) {
      console.error('Error fetching ventamaterial:', error);
      alert('No se pudieron cargar los datos de los materiales.');
      return [];
    }
  };

  const renderPDF = async () => {
    try {
      // Obtén los datos de materiales antes de generar el PDF
      const ventaMateriales = await fetchVentaMaterial(ventas.id);
  
      // Genera el PDF con los datos de ventas y ventaMateriales
      const blob = await pdf(<MyDocument ventas={ventas} ventaMateriales={ventaMateriales} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte_venta_${ventas.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un problema al generar el PDF.');
    }
  };

  return (
    <Button className="bg-amber-500 text-white px-4 py-2 rounded-lg ml-5" onClick={renderPDF}>
      Reporte
    </Button>
  );
};

export default ButtonPDF;
