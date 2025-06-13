import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import CrudHeader from "@/components/molecules/CrudHeader";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { DataTable } from "@/components/datatable/DataTable";
import { getColumnsMarcas } from "@/components/datatable/columns/getColumnsMarcas";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import MarcasCreateEdit from "./components/MarcasCreateEdit";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MarcasPage = () => {
  const {
    data: marcas,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total,
  } = usePaginatedQuery({
    key: "marcas",
    endpoint: "marcas",
    pageSize: 10,
  });

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border overflow-x-auto">
        <CrudHeader
          title="Gestión de Marcas"
          subTitle="Listado, registro y modificación de las marcas de dispositivos."
        >
          <ButtonRefetch isFetching={isRefetching} refetch={refetch} />

          <ModalFormTemplate
            icon={Plus}
            title="Agregar Marca"
            description="Complete los campos para agregar una nueva marca de dispositivo."
          >
            <MarcasCreateEdit refreshMarcas={refetch} />
          </ModalFormTemplate>
        </CrudHeader>

        <DataTable
          data={marcas ?? []}
          columns={getColumnsMarcas({ refetch })}
          refetch={refetch}
          isLoading={isLoading}
          searchTarget="descripcionMarcaDispositivo"
          totalUsers={total}
          fetchNextPage={fetchNextPage}
          isError={isError}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
        />
      </div>
    </CrudsTemplate>
  );
};

export default MarcasPage;
