import { Card, CardContent } from "@/components/ui/card";

import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import MarcasCreateEdit from "./components/MarcasCreateEdit";
import { getColumnsMarcas } from "@/components/datatable/columns/getColumnsMarcas";


const MarcasPage = () => {
  const navigate = useNavigate();

  const {
    data: marcas,
    refetch: refetchMarcas,
    fetchNextPage: fetchNextPageMarcas,
    isLoading: isLoadingMarcas,
    isError: isErrorMarcas,
    isFetching: isFetchingMarcas,
    isRefetching: isRefetchingMarcas,
    hasNextPage: hasNextPageMarcas,
    total: totalMarcas,
  } = usePaginatedQuery({
    key: "marcas",
    endpoint: "marcas",
    pageSize: 10,
  });

  if (isErrorMarcas && activeTab === "marcas")
    return <ErrorApiRefetch isRefetching={isFetchingMarcas} refetch={refetchMarcas} />;

  const currentData = {
          data: marcas,
          isLoading: isLoadingMarcas,
          isError: isErrorMarcas,
          isFetching: isFetchingMarcas,
          hasNextPage: hasNextPageMarcas,
          fetchNextPage: fetchNextPageMarcas,
          total: totalMarcas,
          refetch: refetchMarcas,
          isRefetching: isRefetchingMarcas,
        };

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <CrudHeader title="Gestión de Marcas" subTitle="Administra las Marcas de los dispositivos.">
          <div className="flex items-center gap-2">
            <ButtonRefetch
              isFetching={currentData.isRefetching}
              refetch={currentData.refetch}
            />

            <ModalFormTemplate
                icon={Plus}
                title="Agregar Marca"
                description="Complete los campos para agregar una nueva marc  a."
                label="Agregar Marca"
                contentClassName="max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                <MarcasCreateEdit refreshMarcas={refetchMarcas} />
              </ModalFormTemplate>

          </div>
        </CrudHeader>

            <Card className="border-none bg-secondary dark:bg-background py-0">
              <CardContent className="p-0">
                <DataTable
                  data={currentData.data ?? []}
                  columns={getColumnsMarcas({
                            refetch: refetchMarcas,
                            marcasDispositivos: marcas || [],
                          })}
                  refetch={currentData.refetch}
                  isLoading={currentData.isLoading}
                  searchTarget={"descripcionMarcaDispositivo"}
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

export default MarcasPage;