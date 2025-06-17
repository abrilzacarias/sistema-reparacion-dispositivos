import { Card, CardContent } from "@/components/ui/card";

import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Plus } from "lucide-react";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import MarcasCreateEdit from "./components/MarcasCreateEdit";
import { getColModelos } from "./components/columns/getColumnsModelos";
import ModelosCreateEdit from "./components/ModelosCreateEdit";


const ModelosPage = () => {
  const {
    data: modelos,
    refetch: refetchModelos,
    fetchNextPage: fetchNextPageModelos,
    isLoading: isLoadingModelos,
    isError: isErrorModelos,
    isFetching: isFetchingModelos,
    isRefetching: isRefetchingModelos,
    hasNextPage: hasNextPageModelos,
    total: totalModelos,
  } = usePaginatedQuery({
    key: "modelos",
    endpoint: "modelos/paginado",
    pageSize: "50",
  });

  if (isErrorModelos && activeTab === "modelos")
    return <ErrorApiRefetch isRefetching={isFetchingModelos} refetch={refetchModelos} />;

  const currentData =  {
    data: modelos,
    isLoading: isLoadingModelos,
    isError: isErrorModelos,
    isFetching: isFetchingModelos,
    hasNextPage: hasNextPageModelos,
    fetchNextPage: fetchNextPageModelos,
    total: totalModelos,
    refetch: refetchModelos,
    isRefetching: isRefetchingModelos,
  };

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <CrudHeader title="Gestión de Modelos" subTitle="Administra los modelos de los dispositivos.">
          <div className="flex items-center gap-2">
            <ButtonRefetch
              isRefetching={currentData.isRefetching}
              refetch={currentData.refetch}
            />

            <ModalFormTemplate
                icon={Plus}
                title="Agregar Modelo"
                description="Complete los campos para agregar un nuevo modelo."
                label="Agregar Modelo"
                contentClassName="max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                <ModelosCreateEdit refreshModelos={refetchModelos} />
              </ModalFormTemplate>

          </div>
        </CrudHeader>

            <Card className="border-none bg-secondary dark:bg-background py-0">
              <CardContent className="p-0">
                <DataTable
                  data={currentData.data ?? []}
                  columns={getColModelos({ refetch: refetchModelos })}
                  refetch={currentData.refetch}
                  isLoading={currentData.isLoading}
                  searchTarget={"descripcionModeloDispositivo"}
                  totalUsers={currentData.total}
                  fetchNextPage={currentData.fetchNextPage}
                  isError={currentData.isError}
                  hasNextPage={currentData.hasNextPage}
                  isFetching={currentData.isFetching}
                />
              </CardContent>
            </Card>
      </div>
    </CrudsTemplate>
  );
};

export default ModelosPage;