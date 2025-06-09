import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { DataTable } from "@/components/datatable/DataTable";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import ExportOptionsDropdown from "@/components/molecules/ExportOptionsDropdown";
import { Button } from "@/components/ui/button";

// Crear este archivo en @/components/datatable/columns/getColumnsDiagnosticos.js
import { getColumnsDiagnosticos } from "@/components/datatable/columns/getColumnsDiagnosticos";
import DiagnosticoCreateEdit from "./DiagnosticoCreateEdit";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";

const DiagnosticosPage = () => {
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
          marca: diagnosticos[0]?.dispositivo?.marcaDispositivo?.descripcionMarcaDispositivo
        },
        empleado: {
          id: diagnosticos[0]?.empleado?.idEmpleado,
          nombre: `${diagnosticos[0]?.empleado?.persona?.nombre} ${diagnosticos[0]?.empleado?.persona?.apellido}`
        }
      });
      console.groupEnd();
      
      // Opcional: Mostrar en formato tabla
      console.table(diagnosticos.map(d => ({
        id: d.idDiagnostico,
        fecha: d.fechaDiagnostico,
        dispositivo: d.dispositivo?.descripcionDispositivo,
        tecnico: `${d.empleado?.persona?.nombre} ${d.empleado?.persona?.apellido}`
      })));
    }
    
    if (isError) {
      console.error("Error al cargar diagnósticos");
    }
  }, [diagnosticos, isError]);

  if (isError)
    return <ErrorApiRefetch isRefetching={isFetching} refetch={refetch} />;

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <CrudHeader
          title="Gestión de Diagnósticos"
          subTitle="Listado, registro y modificación de diagnósticos."
        >
          <div className="flex items-center gap-2">
            <ButtonRefetch isFetching={isRefetching} refetch={refetch} />
            <ExportOptionsDropdown
              excelComponent={
                <Button variant="ghost" className="w-full justify-start">
                  Excel
                </Button>
              }
              pdfComponent={
                <Button variant="ghost" className="w-full justify-start">
                  PDF
                </Button>
              }
              formats={{ excel: true, pdf: true }}
              buttonProps={{
                variant: "outline",
                size: "sm",
                label: "Exportar",
              }}
            />
            {/* Botón Agregar Diagnóstico con ModalFormTemplate */}
            <ModalFormTemplate
              title="Registrar Diagnóstico"
              description="Complete los campos para registrar un nuevo diagnóstico."
              label="Agregar Diagnóstico"
              variant="default"
              className="ml-2"
            >
              <DiagnosticoCreateEdit refreshDiagnosticos={refetch} />
            </ModalFormTemplate>
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