import { useContext, useState } from "react";
import axios from "axios";
import ModalFormTemplate, { OpenContext } from "@/components/organisms/ModalFormTemplate";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { getColumnsTiposReparacion } from "./columns/getColumnsTiposReparacion";
import TipoReparacionCreateEdit from "./TipoReparacionCreateEdit";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/datatable/DataTable";

const API_URL = import.meta.env.VITE_API_URL;

const TipoReparacionModal = () => {
  const [error, setError] = useState("");
  const { open, setOpen } = useContext(OpenContext);

  const {
    data: tiposReparacion,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total: totalTiposReparacion,
  } = usePaginatedQuery({
    key: "tipoReparacion",
    endpoint: "tipoReparacion",
    pageSize: 50,
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tipoReparacion/${id}/`);
      refetch();
    } catch (err) {
      setError("Error al eliminar el tipo de reparación.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold mb-2">Tipos de reparación existentes</h3>
        <ModalFormTemplate
          title="Agregar Tipo de Reparación"
          label="Agregar tipo de reparación"
          variant="default"
          className="cursor-pointer justify-start"
        >
          <TipoReparacionCreateEdit refreshTiposReparacion={refetch} />
        </ModalFormTemplate>
      </div>

      <Card className="mt-4 border-none bg-secondary dark:bg-background">
        <CardContent className="p-0">
          <DataTable
            data={tiposReparacion ?? []}
            columns={getColumnsTiposReparacion({ refetch })}
            refetch={refetch}
            isLoading={isLoading}
            searchTarget="descripcionTipoReparacion"
            totalUsers={totalTiposReparacion}
            fetchNextPage={fetchNextPage}
            isError={isError}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TipoReparacionModal;
