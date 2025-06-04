import { Card, CardContent } from "@/components/ui/card";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { getColumnsReparaciones } from "@/components/datatable/columns/getColumnsReparaciones";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import ReparacionesCreateEdit from "./components/ReparacionesCreateEdit";

const ReparacionesPage = () => {
  const {
    data: reparaciones,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total: totalReparaciones,
  } = usePaginatedQuery({
    key: "reparaciones",
    endpoint: "reparaciones",
    pageSize: 10,
  });

  if (isError)
    return <ErrorApiRefetch isRefetching={isFetching} refetch={refetch} />;

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border">
        <CrudHeader
          title="Gestión de Reparaciones"
          subTitle="Listado, registro y modificación de las reparaciones."
        >
          <ButtonRefetch isFetching={isRefetching} refetch={refetch} />
          <ModalFormTemplate
            icon={Wrench}
            title="Agregar Reparación"
            description="Complete los campos para agregar una nueva reparación."
            label="Agregar reparación"
            variant="default"
          >
            <ReparacionesCreateEdit refreshReparaciones={refetch} />
          </ModalFormTemplate>
        </CrudHeader>

        <Card className="mt-4 border-none  bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={reparaciones ?? []}
              columns={getColumnsReparaciones({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="cliente" // o el campo por el que quieras filtrar
              totalUsers={totalReparaciones}
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

export default ReparacionesPage;
