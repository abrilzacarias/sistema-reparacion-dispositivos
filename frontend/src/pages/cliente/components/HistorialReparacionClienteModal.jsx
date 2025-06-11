"use client";

import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Settings, User2 } from "lucide-react";
import { DataTable } from "@/components/datatable/DataTable";
import { getColumnsHistorialReparacionCliente } from "./columns/getColumnsHistorialReparacionCliente";

const HistorialReparacionClienteModal = ({ idPersona, nombre, apellido }) => {
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
    key: ["historial-reparacion-cliente", idPersona],
    endpoint: `clientes/${idPersona}/reparaciones`, // Este endpoint deberías tenerlo definido en tu API
    pageSize: 10,
  });
  const historialConDispositivo = historial?.map(item => ({
    ...item,
    dispositivo: item.diagnostico?.dispositivo?.descripcionDispositivo ?? null,
  })) ?? [];
  return (
    <Card className="mt-4 bg-background border-none shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <User2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Historial de reparaciones</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Cliente #{nombre} {apellido}</span>
          </div>
        </div>

        <DataTable
          data={historialConDispositivo}
          columns={getColumnsHistorialReparacionCliente()}
          isLoading={isLoading}
          refetch={refetch}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          totalUsers={total}
          searchTarget="dispositivo"
        />
      </CardContent>
    </Card>
  );
};

export default HistorialReparacionClienteModal;
