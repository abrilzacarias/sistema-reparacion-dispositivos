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
import { getColFunciones } from "./components/columns/getColumnsFunciones";
import { getColModulos } from "./components/columns/getColumnsModulos";
import { getColPerfiles } from "./components/columns/getColumnsPerfiles";
import PerfilCreateEdit from "./components/PerfilCreateEdit";

const PerfilesPage = () => {
  const navigate = useNavigate()

  const {
    data: perfiles,
    refetch: refetchPerfiles,
    fetchNextPage: fetchNextPagePerfiles,
    isLoading: isLoadingPerfiles,
    isError: isErrorPerfiles,
    isFetching: isFetchingPerfiles,
    isRefetching: isRefetchingPerfiles,
    hasNextPage: hasNextPagePerfiles,
    total: totalPerfiles,
  } = usePaginatedQuery({
    key: "permisos-perfil",
    endpoint: "permisos-perfil",
  })

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
  })

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
  })

  const [activeTab, setActiveTab] = useState("perfiles");

  if (isErrorPerfiles && activeTab === "perfiles")
    return <ErrorApiRefetch isRefetching={isFetchingPerfiles} refetch={refetchPerfiles} />

  if (isErrorModulos && activeTab === "modulos")
    return <ErrorApiRefetch isRefetching={isFetchingModulos} refetch={refetchModulos} />

  if (isErrorFunciones && activeTab === "funciones")
    return <ErrorApiRefetch isRefetching={isFetchingFunciones} refetch={refetchFunciones} />

  const getCurrentData = () => {
    switch (activeTab) {
      case "perfiles":
        return {
          data: perfiles,
          isLoading: isLoadingPerfiles,
          isError: isErrorPerfiles,
          isFetching: isFetchingPerfiles,
          hasNextPage: hasNextPagePerfiles,
          fetchNextPage: fetchNextPagePerfiles,
          total: totalPerfiles,
          refetch: refetchPerfiles,
          isRefetching: isRefetchingPerfiles,
        }
      case "modulos":
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
        }
      case "funciones":
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
        }
      default:
        return {
          data: perfiles,
          isLoading: isLoadingPerfiles,
          isError: isErrorPerfiles,
          isFetching: isFetchingPerfiles,
          hasNextPage: hasNextPagePerfiles,
          fetchNextPage: fetchNextPagePerfiles,
          total: totalPerfiles,
          refetch: refetchPerfiles,
          isRefetching: isRefetchingPerfiles,
        }
    }
  }

  const currentData = getCurrentData()

  const modulosSistema = modulos || []
  const funcionesSistema = funciones || []

  const handleAddPerfil = () => {
    navigate("/perfiles/nuevo", {
      state: {
        modulos: modulosSistema,
        funciones: funcionesSistema,
      },
    })
  }

  const getColumns = () => {
    switch (activeTab) {
      case "perfiles":
        return getColPerfiles({ refetch: refetchPerfiles, modulos: modulosSistema, funciones: funcionesSistema });
      case "modulos":
        return getColModulos({
          refetch: refetchModulos,
          funcionesSistema: funcionesSistema || [],
        });
      case "funciones":
        return getColFunciones({ refetch: refetchFunciones });
      default:
        return getColPerfiles({ refetch: refetchPerfiles, modulos: modulosSistema, funciones: funcionesSistema });
    }
  };

  const getSearchTarget = () => {
    switch (activeTab) {
      case "perfiles":
        return "nombrePerfil"
      case "modulos":
        return "descripcionModuloSistema"
      case "funciones":
        return "descripcionFuncionSistema"
      default:
        return "nombrePerfil"
    }
  }

  const getTabConfig = () => {
    switch (activeTab) {
      case "perfiles":
        return {
          title: "Gestión de Perfiles",
          subtitle: "Administra los perfiles de usuario del sistema.",
          modalTitle: "Agregar Perfil",
          modalDescription: "Complete los campos para agregar un nuevo perfil.",
          modalLabel: "Agregar Perfil",
          icon: Users,
          component: <PerfilCreateEdit refreshPerfiles={refetchPerfiles} modulos={modulosSistema} funciones={funcionesSistema} />,
        }
      case "modulos":
        return {
          title: "Gestión de Módulos",
          subtitle: "Administra los módulos disponibles en el sistema.",
          modalTitle: "Agregar Módulo",
          modalDescription: "Complete los campos para agregar un nuevo módulo.",
          modalLabel: "Agregar Módulo",
          icon: Layers,
        }
      case "funciones":
        return {
          title: "Gestión de Funciones",
          subtitle: "Administra las funciones de cada módulo.",
          modalTitle: "Agregar Función",
          modalDescription: "Complete los campos para agregar una nueva función.",
          modalLabel: "Agregar Función",
          icon: Zap,
        }
      default:
        return {
          title: "Gestión de Perfiles",
          subtitle: "Administra los perfiles de usuario del sistema.",
          modalTitle: "Agregar Perfil",
          modalDescription: "Complete los campos para agregar un nuevo perfil.",
          modalLabel: "Agregar Perfil",
          icon: Users,
          component: <PerfilCreateEdit refreshPerfiles={refetchPerfiles} modulos={modulosSistema} funciones={funcionesSistema} />,
        }
    }
  }

  const tabConfig = getTabConfig()

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

        {/* Tabs para las diferentes secciones */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger
              value="perfiles"
              className="flex-1 rounded-md rounded-r-none"
            >
              <Users className="h-4 w-4 mr-2" />
              Perfiles
            </TabsTrigger>
            <TabsTrigger value="modulos" className="flex-1">
              <Layers className="h-4 w-4 mr-2" />
              Módulos
            </TabsTrigger>
            <TabsTrigger
              value="funciones"
              className="flex-1 rounded-md rounded-l-none"
            >
              <Zap className="h-4 w-4 mr-2" />
              Funciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perfiles">
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

          <TabsContent value="modulos">
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

          <TabsContent value="funciones">
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
  )
}

export default PerfilesPage
