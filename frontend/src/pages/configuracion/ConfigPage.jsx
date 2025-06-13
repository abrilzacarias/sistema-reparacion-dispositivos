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
    data: modulos,
    refetch: refetchModulos,
    fetchNextPage: fetchNextPageModulos,
    isLoading: isLoadingModulos,
    isError: isErrorModulos,
    isFetching: isFetchingModulos,
    isRefetching: isRefetchingModulos,
    hasNextPage: hasNextPageModulos,
    total: totalModulos,
  } = usePaginatedQuery({
    key: "modulos-sistema",
    endpoint: "modulos-sistema",
  });

  const {
    data: funciones,
    refetch: refetchFunciones,
    fetchNextPage: fetchNextPageFunciones,
    isLoading: isLoadingFunciones,
    isError: isErrorFunciones,
    isFetching: isFetchingFunciones,
    isRefetching: isRefetchingFunciones,
    hasNextPage: hasNextPageFunciones,
    total: totalFunciones,
  } = usePaginatedQuery({
    key: "funciones-sistema",
    endpoint: "funciones-sistema",
    pageSize: "50",
  });

  const [activeTab, setActiveTab] = useState("dispositivos");

  // Corregí las condiciones de error para que coincidan con las pestañas correctas
  if (isErrorDispositivos && activeTab === "dispositivos")
    return <ErrorApiRefetch isRefetching={isFetchingDispositivos} refetch={refetchDispositivos} />;

  if (isErrorModulos && activeTab === "marcas")
    return <ErrorApiRefetch isRefetching={isFetchingModulos} refetch={refetchModulos} />;

  if (isErrorFunciones && activeTab === "modelos")
    return <ErrorApiRefetch isRefetching={isFetchingFunciones} refetch={refetchFunciones} />;

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
          data: modulos,
          isLoading: isLoadingModulos,
          isError: isErrorModulos,
          isFetching: isFetchingModulos,
          hasNextPage: hasNextPageModulos,
          fetchNextPage: fetchNextPageModulos,
          total: totalModulos,
          refetch: refetchModulos,
          isRefetching: isRefetchingModulos,
        };
      case "modelos":
        return {
          data: funciones,
          isLoading: isLoadingFunciones,
          isError: isErrorFunciones,
          isFetching: isFetchingFunciones,
          hasNextPage: hasNextPageFunciones,
          fetchNextPage: fetchNextPageFunciones,
          total: totalFunciones,
          refetch: refetchFunciones,
          isRefetching: isRefetchingFunciones,
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

  const modulosSistema = modulos || [];
  const funcionesSistema = funciones || [];

  const handleAddPerfil = () => {
    navigate("/perfiles/nuevo", {
      state: {
        modulos: modulosSistema,
        funciones: funcionesSistema,
      },
    });
  };

  const getColumns = () => {
    switch (activeTab) {
      case "dispositivos":
        return getColDispositivos({ refetch: refetchDispositivos, modulos: modulosSistema, funciones: funcionesSistema });
      case "marcas":
        return getColMarcas({
          refetch: refetchModulos,
          funcionesSistema: funcionesSistema || [],
        });
      case "modelos":
        return getColModelos({ refetch: refetchFunciones });
      default:
        return getColDispositivos({ refetch: refetchDispositivos, modulos: modulosSistema, funciones: funcionesSistema });
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
          component: <DispositivoCreateEdit refreshPerfiles={refetchDispositivos} modulos={modulosSistema} funciones={funcionesSistema} />,
        };
      case "marcas":
        return {
          title: "Gestión de Marcas", // Cambié el título para que sea más consistente
          subtitle: "Administra las Marcas de los dispositivos.",
          modalTitle: "Agregar Marca",
          modalDescription: "Complete los campos para agregar una nueva marca.",
          modalLabel: "Agregar Marca",
          icon: Layers,
          //component: <DispositivoCreateEdit refreshPerfiles={refetchDispositivos} modulos={modulosSistema} funciones={funcionesSistema} />,
        };
      case "modelos":
        return {
          title: "Gestión de Modelos", // Cambié el título para que sea más consistente
          subtitle: "Administra los Modelos de los dispositivos.",
          modalTitle: "Agregar Modelo",
          modalDescription: "Complete los campos para agregar un nuevo modelo.",
          modalLabel: "Agregar Modelo",
          icon: Zap,
          //component: <DispositivoCreateEdit refreshPerfiles={refetchDispositivos} modulos={modulosSistema} funciones={funcionesSistema} />,
        };
      default:
        return {
          title: "Gestión de Perfiles",
          subtitle: "Administra los perfiles del sistema.",
          modalTitle: "Agregar Perfil",
          modalDescription: "Complete los campos para agregar un nuevo perfil.",
          modalLabel: "Agregar Perfil",
          icon: Users,
          component: <PerfilCreateEdit refreshPerfiles={refetchDispositivos} modulos={modulosSistema} funciones={funcionesSistema} />,
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
              <Button
                variant="default"
                onClick={handleAddPerfil}
                className="cursor-pointer justify-start data-[state=open]:bg-secondary-foreground"
                disabled={currentData.isLoading || currentData.isFetching}
              >
                <Plus className="h-4 w-4" />
                {tabConfig.modalLabel}
              </Button>
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