import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { DataTable } from "@/components/datatable/DataTable";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// Crear este archivo en @/components/datatable/columns/getColumnsDiagnosticos.js
import { getColumnsDiagnosticos } from "@/components/datatable/columns/getColumnsDiagnosticos";
import DiagnosticoCreateEdit from "./DiagnosticoCreateEdit";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Plus } from "lucide-react";

//Exportar
import ExportPDFButton from "@/components/organisms/pdfs/ExportPDFButton";
import { Download } from "lucide-react";
import ExportOptionsDropdown from "@/components/molecules/ExportOptionsDropdown";
import { tienePermiso } from "@/utils/permisos";

const DiagnosticosPage = () => {
  const navigate = useNavigate();
  const {
    data: diagnosticos,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total: totalDiagnosticos,
  } = usePaginatedQuery({
    key: "diagnostico",
    endpoint: "diagnostico",
    pageSize: 10,
  });

  // Debug en consola
  useEffect(() => {
    if (diagnosticos) {
      console.group("Datos de diagnósticos");
      console.log("Total de registros:", diagnosticos.length);
      console.log("Primer diagnóstico:", diagnosticos[0]);
      console.log("Estructura completa:", {
        id: diagnosticos[0]?.idDiagnostico,
        fecha: diagnosticos[0]?.fechaDiagnostico,
        dispositivo: {
          id: diagnosticos[0]?.dispositivo?.idDispositivo,
          modelo: diagnosticos[0]?.dispositivo?.modeloDispositivo,
          marca:
            diagnosticos[0]?.dispositivo?.marcaDispositivo
              ?.descripcionMarcaDispositivo,
        },
        empleado: {
          id: diagnosticos[0]?.empleado?.idEmpleado,
          nombre: `${diagnosticos[0]?.empleado?.persona?.nombre} ${diagnosticos[0]?.empleado?.persona?.apellido}`,
        },
      });
      console.groupEnd();
    }

    if (isError) {
      console.error("Error al cargar diagnósticos");
    }
  }, [diagnosticos, isError]);

  const handleAddDiagnostico = () => {
    navigate("/diagnosticos/nuevo");
  };

  if (isError)
    return <ErrorApiRefetch isRefetching={isFetching} refetch={refetch} />;

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <CrudHeader
          title="Gestión de Diagnósticos"
          subTitle="Listado, registro y modificación de diagnósticos."
        >
          <div className="flex items-center gap-2">
            <ButtonRefetch isFetching={isRefetching} refetch={refetch} />

            {/* Exportar */}
            {tienePermiso("Diagnóstico", "Ver Reporte Diagnóstico") && (
              <ExportOptionsDropdown
                pdfComponent={
                  <ExportPDFButton
                    data={diagnosticos ?? []}
                    columns={getColumnsDiagnosticos({ refetch })}
                    title="Diagnosticos"
                  />
                }
                buttonProps={{
                  variant: "outline",
                  size: "sm",
                  className: "gap-2",
                  label: "Exportar",
                  icon: <Download className="h-4 w-4" />,
                }}
                dropdownLabel="Exportar datos"
              />
            )}

            {tienePermiso("Diagnóstico", "Agregar Diagnóstico") && (
              <Button
                variant="default"
                onClick={handleAddDiagnostico}
                className="cursor-pointer justify-start data-[state=open]:bg-secondary-foreground"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CrudHeader>

        <Card className="mt-4 border-none bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={diagnosticos ?? []}
              columns={getColumnsDiagnosticos({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="fechaDiagnostico" // Cambiar según necesidad
              totalUsers={totalDiagnosticos}
              fetchNextPage={fetchNextPage}
              isError={isError}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
            />
          </CardContent>
        </Card>
      </div>
    </CrudsTemplate>
  );
};

export default DiagnosticosPage;
