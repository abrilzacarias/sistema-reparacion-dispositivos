import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button"; 
import PDF from './GenericPDF';

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
};

const setNestedValue = (obj, path, value) => {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {};
    return acc[part];
  }, obj);
  target[last] = value;
};

const ExportPDFButton = ({ data, columns, title = "Reporte", buttonLabel = "Descargar PDF", buttonProps = {} }) => {
  const filteredColumns = columns.filter(col => col.accessorKey || col.accessorFn);

  const dataForPdf = data.map(row => {
    const newRow = { ...row };
    filteredColumns.forEach(col => {
      if (col.accessorFn && col.header) {
        newRow[col.header] = col.accessorFn(row);
      } else if (col.accessorKey) {
        const value = getNestedValue(newRow, col.accessorKey);
        if (value && typeof value === 'object') {
          if (value.nombre && value.apellido) {
            setNestedValue(newRow, col.accessorKey, `${value.nombre} ${value.apellido}`);
          } else {
            setNestedValue(newRow, col.accessorKey, JSON.stringify(value));
          }
        }
      }
    });
    return newRow;
  });

  const pdfColumns = filteredColumns.map(col => ({
    label: col.header,
    key: col.accessorKey || col.header,
    width: col.width || "auto",
  }));

  return (
    <PDFDownloadLink
      document={<PDF title={title} data={dataForPdf} columns={pdfColumns} />}
      fileName={`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`}
    >
      {({ loading }) => (
        <Button variant="ghost" {...buttonProps}>
          {loading ? "Generando PDF..." : buttonLabel}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default ExportPDFButton;
