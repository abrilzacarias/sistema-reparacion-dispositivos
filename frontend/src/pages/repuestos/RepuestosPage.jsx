import { Card, CardContent } from "@/components/ui/card";

import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { getColumnsRepuestos } from "@/components/datatable/columns/getColumnsRepuestos";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Plus, Settings, Wrench } from "lucide-react";
import RepuestosCreateEdit from "./components/RepuestosCreateEdit";
import TiposRepuestoModal from "./components/TipoRepuestoModal";

//Exportar
import ExportPDFButton from "@/components/organisms/pdfs/ExportPDFButton";
import { Download } from "lucide-react";
import ExportOptionsDropdown from "@/components/molecules/ExportOptionsDropdown";
import { tienePermiso } from "@/utils/permisos";

const RepuestosPage = () => {
  const {
    data: repuestos,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total: totalRepuestos,
  } = usePaginatedQuery({
    key: "repuestos",
    endpoint: "repuestos",
    pageSize: 10,
  });

  if (isError)
    return <ErrorApiRefetch isRefetching={isFetching} refetch={refetch} />;

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-x-auto">
        <CrudHeader
          title="Gestión de Repuestos"
          subTitle="Listado, registro y modificación de los repuestos."
        >
          <div className="flex items-center gap-2">
            <ButtonRefetch isRefetching={isRefetching} refetch={refetch} loading={isLoading} />

            {/* Exportar */}
            {tienePermiso("Repuestos", "Ver Reporte Repuesto") && (
              <ExportOptionsDropdown
                pdfComponent={
                  <ExportPDFButton
                    data={repuestos ?? []}
                    columns={getColumnsRepuestos({ refetch })}
                    title="Repuestos"
                  />
                }
                buttonProps={{
                  variant: "outline",
                  className: "gap-2",
                  label: "Exportar",
                  icon: <Download className="h-4 w-4" />,
                }}
                dropdownLabel="Exportar datos"
              />
            )}

            {tienePermiso("Repuestos", "Agregar Tipo de Repuesto") && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="flex size-8 p-0 data-[state=open]:bg-secondary-foreground "
                  >
                    <Plus className="size-4 text-secondary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-54">
                  <DropdownMenuItem
                    asChild
                    className="w-full flex items-center justify-between"
                  >
                    <ModalFormTemplate
                      icon={Settings}
                      title="Agregar Repuesto"
                      description="Complete los campos para agregar un nuevo repuesto."
                      label="Agregar repuesto"
                      variant="ghost"
                      className="p-2 m-0 cursor-pointer w-full justify-start"
                    >
                      <RepuestosCreateEdit refreshRepuestos={refetch} />
                    </ModalFormTemplate>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    asChild
                    className="w-full flex items-center justify-between"
                  >
                    <ModalFormTemplate
                      icon={Wrench}
                      title="Agregar Tipo de Repuesto"
                      label="Agregar tipo de repuesto"
                      variant="ghost"
                      contentClassName="max-w-8xl h-auto max-w-4xl max-h-[90vh] overflow-y-auto"
                      className="p-2 m-0 cursor-pointer w-full justify-start"
                    >
                      <TiposRepuestoModal />
                    </ModalFormTemplate>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CrudHeader>

        <Card className="mt-4 border-none  bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={repuestos ?? []}
              columns={getColumnsRepuestos({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="nombreRepuesto"
              totalUsers={totalRepuestos}
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

export default RepuestosPage;
