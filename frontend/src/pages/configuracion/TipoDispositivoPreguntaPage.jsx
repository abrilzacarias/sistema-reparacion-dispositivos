import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch";
import { DataTable } from "@/components/datatable/DataTable";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Layers, Plus, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getColDispositivos } from "./components/columns/getColumnsDispositivos";
import { getColMarcas } from "./components/columns/getColumnsMarcas";
import { getColModelos } from "./components/columns/getColumnsModelos";
import DispositivoCreateEdit from "./components/DispositivoCreateEdit";
import MarcasCreateEdit from "./components/MarcasCreateEdit";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import ModelosCreateEdit from "./components/ModelosCreateEdit";


const TipoDispositivoPreguntaPage = () => {
  const {
    data: dispositivos,
    refetch: refetchDispositivos,
    fetchNextPage: fetchNextPageDispositivos,
    isLoading: isLoadingDispositivos,
    isError: isErrorDispositivos,
    isFetching: isFetchingDispositivos,
    isRefetching: isRefetchingDispositivos,
    hasNextPage: hasNextPageDispositivos,
    total: totalDispositivos,
  } = usePaginatedQuery({
    key: "tipo-dispositivo-segun-pregunta",
    endpoint: "tipo-dispositivo-segun-pregunta/agrupado-paginado",
    params: {
      page: 1,
      size: 5,
    },
  });


  const {
    data: marcas,
    refetch: refetchMarcas,
  } = usePaginatedQuery({
    key: "marcas",
    endpoint: "marcas",
    pageSize: 10,
  });

  const {
    data: modelos,
    refetch: refetchModelos,
  } = usePaginatedQuery({
    key: "modelos",
    endpoint: "modelos/paginado",
    pageSize: "50",
  });

  if (isErrorDispositivos)
    return <ErrorApiRefetch isRefetching={isFetchingDispositivos} refetch={refetchDispositivos} />;

  const currentData = {
    data: dispositivos,
    isLoading: isLoadingDispositivos,
    isError: isErrorDispositivos,
    isFetching: isFetchingDispositivos,
    hasNextPage: hasNextPageDispositivos,
    fetchNextPage: fetchNextPageDispositivos,
    total: totalDispositivos,
    refetch: refetchDispositivos,
    isRefetching: isRefetchingDispositivos,
  }


  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <CrudHeader title="Gestión de Dispositivos" subTitle="Administra los dispositivos y sus preguntas.">
          <div className="flex items-center gap-2">
            <ButtonRefetch
              isFetching={currentData.isRefetching}
              refetch={currentData.refetch}
            />

              <ModalFormTemplate
                icon={Plus}
                title="Gestión de Tipos de Dispositivos"
                description="Administra los Tipos de Dispositivos del sistema."
                label="Agregar Tipo Dispositivo"
                contentClassName="max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                <DispositivoCreateEdit refreshDispositivos={refetchDispositivos} marcas={marcas} modelos={modelos} />,
              </ModalFormTemplate>

          </div>
        </CrudHeader>

            <Card className="border-none bg-secondary dark:bg-background py-0">
              <CardContent className="p-0">
                <DataTable
                  data={currentData.data ?? []}
                  columns={ getColDispositivos({ refetch: refetchDispositivos, marcas: marcas, modelos: modelos })}
                  refetch={currentData.refetch}
                  isLoading={currentData.isLoading}
                  searchTarget="nombreTipoDispositivo"
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

export default TipoDispositivoPreguntaPage;