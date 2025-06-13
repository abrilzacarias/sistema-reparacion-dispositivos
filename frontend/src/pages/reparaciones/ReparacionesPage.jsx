import { Card, CardContent } from "@/components/ui/card";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { getColumnsReparaciones } from "@/components/datatable/columns/getColumnsReparaciones";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Button } from "@/components/ui/button";
import { Plus, Wrench, Settings } from "lucide-react";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import ReparacionesCreateEdit from "./components/ReparacionesCreateEdit";
import TiposReparacionModal from "./components/TipoReparacionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border overflow-x-auto">
        <CrudHeader
          title="Gestión de Reparaciones"
          subTitle="Listado, registro y modificación de las reparaciones."
        >
          <ButtonRefetch isFetching={isRefetching} refetch={refetch} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="flex size-8 p-0 data-[state=open]:bg-secondary-foreground"
              >
                <Plus className="size-4 text-secondary" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-54">

              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  icon={Settings}
                  title="Agregar Tipo de Reparación"
                  label="Agregar tipo de reparación"
                  variant="ghost"
                  contentClassName="max-w-8xl h-auto max-w-4xl max-h-[90vh] overflow-y-auto"
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <TiposReparacionModal />
                </ModalFormTemplate>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CrudHeader>

        <Card className="mt-4 border-none bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={reparaciones ?? []}
              columns={getColumnsReparaciones({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="Cliente" // o el campo por el que quieras filtrar
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
