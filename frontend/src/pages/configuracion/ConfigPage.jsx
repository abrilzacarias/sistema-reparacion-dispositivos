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
import { getColDispositivos } from "../configuracion/components/columns/getColumnsDispositivos";
import { getColMarcas } from "../configuracion/components/columns/getColumnsMarcas";
import { getColModelos } from "../configuracion/components/columns/getColumnsModelos";
import DispositivoCreateEdit from "../configuracion/components/DispositivoCreateEdit";
import MarcasCreateEdit from "./components/MarcasCreateEdit";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import ModelosCreateEdit from "./components/ModelosCreateEdit";


const ConfigPage = () => {
  const navigate = useNavigate();

  // Cambié los nombres para que sean más consistentes con lo que realmente representan
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

  const [activeTab, setActiveTab] = useState("dispositivos");

  // Corregí las condiciones de error para que coincidan con las pestañas correctas
  if (isErrorDispositivos && activeTab === "dispositivos")
    return <ErrorApiRefetch isRefetching={isFetchingDispositivos} refetch={refetchDispositivos} />;

  if (isErrorMarcas && activeTab === "marcas")
    return <ErrorApiRefetch isRefetching={isFetchingMarcas} refetch={refetchMarcas} />;

  if (isErrorModelos && activeTab === "modelos")
    return <ErrorApiRefetch isRefetching={isFetchingModelos} refetch={refetchModelos} />;

  const getCurrentData = () => {
    switch (activeTab) {
      case "dispositivos":
        return {
          data: dispositivos,
          isLoading: isLoadingDispositivos,
          isError: isErrorDispositivos,
          isFetching: isFetchingDispositivos,
          hasNextPage: hasNextPageDispositivos,
          fetchNextPage: fetchNextPageDispositivos,
          total: totalDispositivos,
          refetch: refetchDispositivos,
          isRefetching: isRefetchingDispositivos,
        };
      case "marcas":
        return {
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
      case "modelos":
        return {
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
      default:
        return {
          data: dispositivos,
          isLoading: isLoadingDispositivos,
          isError: isErrorDispositivos,
          isFetching: isFetchingDispositivos,
          hasNextPage: hasNextPageDispositivos,
          fetchNextPage: fetchNextPageDispositivos,
          total: totalDispositivos,
          refetch: refetchDispositivos,
          isRefetching: isRefetchingDispositivos,
        };
    }
  };

  const currentData = getCurrentData();

  const marcasDispositivos = marcas || [];
  const modelosDispositivos = modelos || [];

  const handleAddPerfil = () => {
    navigate("/dispositivos/nuevo", {
      state: {
        modulos: marcasDispositivos,
        funciones: modelosDispositivos,
      },
    });
  };

  const getColumns = () => {
    switch (activeTab) {
      case "dispositivos":
        return getColDispositivos({ refetch: refetchDispositivos, marcas: marcasDispositivos, modelos: modelosDispositivos });
      case "marcas":
        return getColMarcas({
          refetch: refetchMarcas,
          marcasDispositivos: marcasDispositivos || [],
        });
      case "modelos":
        return getColModelos({ refetch: refetchModelos });
      default:
        return getColDispositivos({ refetch: refetchDispositivos, marcas: marcasDispositivos, modelos: modelosDispositivos});
    }
  };

  // AQUÍ ESTÁ EL FIX PRINCIPAL: Necesitas ajustar estos searchTarget para que coincidan 
  // con los IDs reales de las columnas que devuelven tus funciones getCol*
  const getSearchTarget = () => {
    switch (activeTab) {
      case "dispositivos":
        // Cambia esto por el ID real de la columna que quieres buscar en getColDispositivos
        // Probablemente sea algo como "nombre", "descripcion", "perfil", etc.
        return "nombreTipoDispositivo";
      case "marcas":
        // Cambia esto por el ID real de la columna en getColMarcas
        return "descripcionMarcaDispositivo"; // o el campo que corresponda
      case "modelos":
        // Cambia esto por el ID real de la columna en getColModelos
        return "descripcionModeloDispositivo"; // o el campo que corresponda
      default:
        return "nombreTipoDispositivo"; // o el campo que corresponda
    }
  };

  const getTabConfig = () => {
    switch (activeTab) {
      case "dispositivos":
        return {
          title: "Gestión de Tipos de Dispositivos", // Cambié el título para que sea más consistente
          subtitle: "Administra los Tipos de Dispositivos del sistema.",
          modalTitle: "Agregar Tipo Dispositivo",
          modalDescription: "Complete los campos para agregar un nuevo tipo de dispositivo.",
          modalLabel: "Agregar Tipo Dispositivo",
          icon: Users,
          component: <DispositivoCreateEdit refreshDispositivos={refetchDispositivos} marcas={marcas} modelos={modelos} />,
        };
      case "marcas":
        return {
          title: "Gestión de Marcas", // Cambié el título para que sea más consistente
          subtitle: "Administra las Marcas de los dispositivos.",
          modalTitle: "Agregar Marca",
          modalDescription: "Complete los campos para agregar una nueva marca.",
          modalLabel: "Agregar Marca",
          icon: Layers,
          component: <MarcasCreateEdit refreshMarcas={refetchMarcas} />, // ✅ CORREGIDO: usar refetchMarcas directamente
        };
      case "modelos":
        return {
          title: "Gestión de Modelos", // Cambié el título para que sea más consistente
          subtitle: "Administra los Modelos de los dispositivos.",
          modalTitle: "Agregar Modelo",
          modalDescription: "Complete los campos para agregar un nuevo modelo.",
          modalLabel: "Agregar Modelo",
          icon: Zap,
          component: <ModelosCreateEdit refreshModelos={refetchModelos} /> // ✅ YA ESTABA CORRECTO
        };
      default:
        return {
          title: "Gestión de Dispositivos",
          subtitle: "Administra los dispositivos del sistema.",
          modalTitle: "Agregar Dispositivo",
          modalDescription: "Complete los campos para agregar un nuevo dispositivo.",
          modalLabel: "Agregar Dispositivo",
          icon: Users,
          component: <DispositivoCreateEdit refreshDispositivos={refetchDispositivos} marcas={marcas} modelos={modelos} />, // ✅ CORREGIDO: quité la referencia a PerfilCreateEdit que no existe
        };
    }
  };

  const tabConfig = getTabConfig();

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <CrudHeader title={tabConfig.title} subTitle={tabConfig.subtitle}>
          <div className="flex items-center gap-2">
            <ButtonRefetch
              isFetching={currentData.isRefetching}
              refetch={currentData.refetch}
            />

            {tabConfig.component && (
              <ModalFormTemplate
                icon={Plus}
                title={tabConfig.modalTitle}
                description={tabConfig.modalDescription}
                label={tabConfig.modalLabel}
                contentClassName="max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                {tabConfig.component}
              </ModalFormTemplate>
            )}

          </div>
        </CrudHeader>

        {/* Cambié los labels de las pestañas para que sean más consistentes */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger
              value="dispositivos"
              className="flex-1 rounded-md rounded-r-none"
            >
              <Users className="h-4 w-4 mr-2" />
              Dispositivos
            </TabsTrigger>
            <TabsTrigger value="marcas" className="flex-1">
              <Layers className="h-4 w-4 mr-2" />
              Marcas
            </TabsTrigger>
            <TabsTrigger
              value="modelos"
              className="flex-1 rounded-md rounded-l-none"
            >
              <Zap className="h-4 w-4 mr-2" />
              Modelos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dispositivos">
            <Card className="border-none bg-secondary dark:bg-background py-0">
              <CardContent className="p-0">
                <DataTable
                  data={currentData.data ?? []}
                  columns={getColumns()}
                  refetch={currentData.refetch}
                  isLoading={currentData.isLoading}
                  searchTarget={getSearchTarget()}
                  totalUsers={currentData.total}
                  fetchNextPage={currentData.fetchNextPage}
                  isError={currentData.isError}
                  hasNextPage={currentData.hasNextPage}
                  isFetching={currentData.isFetching}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marcas">
            <Card className="border-none bg-secondary dark:bg-background py-0">
              <CardContent className="p-0">
                <DataTable
                  data={currentData.data ?? []}
                  columns={getColumns()}
                  refetch={currentData.refetch}
                  isLoading={currentData.isLoading}
                  searchTarget={getSearchTarget()}
                  totalUsers={currentData.total}
                  fetchNextPage={currentData.fetchNextPage}
                  isError={currentData.isError}
                  hasNextPage={currentData.hasNextPage}
                  isFetching={currentData.isFetching}
                />
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="modelos">
            <Card className="border-none bg-secondary dark:bg-background py-0">
              <CardContent className="p-0">
                <DataTable
                  data={currentData.data ?? []}
                  columns={getColumns()}
                  refetch={currentData.refetch}
                  isLoading={currentData.isLoading}
                  searchTarget={getSearchTarget()}
                  totalUsers={currentData.total}
                  fetchNextPage={currentData.fetchNextPage}
                  isError={currentData.isError}
                  hasNextPage={currentData.hasNextPage}
                  isFetching={currentData.isFetching}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CrudsTemplate>
  );
};

export default ConfigPage;