import { Card, CardContent } from "@/components/ui/card";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { getColumnsNotifications } from "@/components/datatable/columns/getColumnsNotifications";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import { Bell } from "lucide-react";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";

const NotificacionesPage = () => {
  const {
    data: notificaciones,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total: totalNotificaciones,
  } = usePaginatedQuery({
    key: "notificaciones",
    endpoint: "notificaciones/notificaciones",
    pageSize: 10,
  });

  if (isError)
    return <ErrorApiRefetch isRefetching={isFetching} refetch={refetch} />;

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border">
        <CrudHeader
          title="Gestión de Notificaciones"
          subTitle="Listado de notificaciones del sistema."
        >
          <ButtonRefetch isFetching={isRefetching} refetch={refetch} />
          {/* Podrías agregar un botón para limpiar notificaciones o algo extra */}
        </CrudHeader>

        <Card className="mt-4 border-none bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={notificaciones?.items ?? []}
              columns={getColumnsNotifications({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="mensaje" // o "tipo" si filtrás por tipo
              totalUsers={totalNotificaciones}
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

export default NotificacionesPage;
