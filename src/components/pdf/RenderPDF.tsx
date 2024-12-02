import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MyDocument } from './MyDocument';

export const RenderPDF = () => {
  return (
    <div>
      <h1>Descargar PDF</h1>
      <PDFDownloadLink
        document={<MyDocument />}
        fileName="example.pdf"
      >
        {({ loading }: { loading: boolean }) =>
          loading ? 'Generando documento...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};
