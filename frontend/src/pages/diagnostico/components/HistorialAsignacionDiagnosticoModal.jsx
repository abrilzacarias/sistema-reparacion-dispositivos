"use client";

import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Calendar } from "lucide-react";
import { DataTable } from "@/components/datatable/DataTable";
import { getColumnsHistorialAsignacion } from "./columns/getColumnsHistorialAsignacionDiagnostico";

const HistorialAsignacionDiagnosticoModal = ({ idDiagnostico }) => {
  const {
    data: historial,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    total,
    isFetching,
  } = usePaginatedQuery({
    key: ["historial-asignacion", idDiagnostico],
    endpoint: `historial-asignacion-diagnostico/por-diagnostico/${idDiagnostico}`,
    pageSize: 10,
  });

  return (
    <Card className="mt-4 bg-background border-none shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Historial de asignación</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Diagnostico #{idDiagnostico}</span>
          </div>
        </div>

        <DataTable
          data={historial ?? []}
          columns={getColumnsHistorialAsignacion()}
          isLoading={isLoading}
          refetch={refetch}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          totalUsers={total}
          searchTarget="empleadoAsignado"
        />
      </CardContent>
    </Card>
  );
};

export default HistorialAsignacionDiagnosticoModal;
