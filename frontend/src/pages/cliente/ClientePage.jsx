// ── src/pages/cliente/ClientePage.jsx ──

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import ButtonRefetch from "@/components/atoms/ButtonRefetch";
import ErrorDuplicateMessage from "@/components/atoms/ErrorDuplicateMessage";
import { DataTable } from "@/components/datatable/DataTable";
import { getColumnsCliente } from "@/components/datatable/columns/getColumnsCliente";
import CrudHeader from "@/components/molecules/CrudHeader";
import CrudsTemplate from "@/components/molecules/CrudsTemplate";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import SearchPersonas from "@/components/organisms/SearchPersonas";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchPersonas } from "@/hooks/useSearchPersonas";
import { Plus, PlusCircle, Settings } from "lucide-react";
import PersonaCreateEdit from "@/components/organisms/PersonaCreateEdit";
import ClienteCreateEdit from "./components/ClienteCreateEdit";

// Exportar
import ExportPDFButton from "@/components/organisms/pdfs/ExportPDFButton";
import { Download } from "lucide-react";
import ExportOptionsDropdown from "@/components/molecules/ExportOptionsDropdown";
import { tienePermiso } from "@/utils/permisos";

const ClientePage = () => {
  // Paginación
  const pageSize = 10;
  const [page, setPage] = useState(0);

  // Estados clientes
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAxios, setErrorAxios] = useState(null);

  // Función paginada de fetch
  const fetchClientes = async (newPage = page) => {
    try {
      setIsLoading(true);
      setErrorAxios(null);
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const skip = newPage * pageSize;
      const resp = await axios.get(
        `${API_URL}/clientes/?skip=${skip}&limit=${pageSize}`
      );
      setClientes(resp.data);
      setPage(newPage);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
      setErrorAxios(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes(0);
  }, []);

  // Estados creación/edición
  const [selectedPersona, setSelectedPersona] = useState("");
  const [personaId, setPersonaId] = useState(null);
  const [searchTarget, setSearchTarget] = useState("");
  const [activeTab, setActiveTab] = useState("persona");
  const [isErrorApi, setIsErrorApi] = useState(false);

  const {
    personas,
    totalPersonas,
    isLoading: loadingPersonas,
    isError: errorPersonas,
    refetch: refetchPersonas,
    resetQuery,
  } = useSearchPersonas({ query: searchTarget });

  // Corregir el manejo del handleSearchTarget
  const handleSearchTarget = (event) => {
    resetQuery();
    setSearchTarget("");
    setSelectedPersona("");
    setSearchTarget(event.target.value);
  };

  const startSearch = () => {
    if (searchTarget.trim() !== "") {
      resetQuery();
      setSelectedPersona(
        totalPersonas === 1
          ? "1 resultado"
          : `${totalPersonas || "sin"} resultados`
      );
      console.log("🚀 Llamando refetchPersonas...");
      refetchPersonas();
    } else {
      console.log("❌ Condición NO cumplida, no se ejecuta búsqueda");
    }
  };

  useEffect(() => {
    if (searchTarget.trim() === "") {
      resetQuery();
    }
  }, [searchTarget]);

  useEffect(() => {
    if (selectedPersona?.cliente) {
      setIsErrorApi(
        `La persona ${selectedPersona.nombre} ${selectedPersona.apellido} ya es un cliente.`
      );
    } else {
      setIsErrorApi(false);
    }
  }, [selectedPersona]);

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4  rounded-lg  shadow-sm border overflow-x-auto">
        <CrudHeader
          title="Gestión de Clientes"
          subTitle="Listado y registro de clientes."
        >
          <div className="flex gap-2">
            <ButtonRefetch
              isFetching={isLoading}
              refetch={() => fetchClientes(page)}
            />

            {/* Exportar */}
            {tienePermiso("Clientes", "Ver Reporte Cliente") && (
              <ExportOptionsDropdown
                pdfComponent={
                  <ExportPDFButton
                    data={clientes}
                    columns={getColumnsCliente({
                      refetch: () => fetchClientes(page),
                    })}
                    title="Clientes"
                  />
                }
                data={clientes}
                columns={getColumnsCliente({
                  refetch: () => fetchClientes(page),
                })}
                title="Clientes"
                buttonProps={{
                  variant: "outline",
                  size: "sm",
                  className: "gap-2",
                  label: "Exportar",
                  icon: <Download className="h-4 w-4" />,
                }}
                dropdownLabel="Exportar datos"
              />
            )}
            {tienePermiso("Clientes", "Agregar Cliente") && (
              <ModalFormTemplate
                icon={Plus}
                title="Agregar Cliente"
                description="Complete los campos para agregar un nuevo cliente."
              >
                <SearchPersonas
                  setSelectedPersona={setSelectedPersona}
                  selectedPersona={selectedPersona}
                  startSearch={startSearch}
                  personaId={personaId}
                  data={personas}
                  isLoading={loadingPersonas}
                  setPersonaId={setPersonaId}
                  error={errorPersonas}
                  handleChange={handleSearchTarget}
                  setSearch={setSearchTarget}
                  search={searchTarget}
                  variant="modal"
                  label="Filtrar persona por nombre, apellido o CUIT"
                />
                <ErrorDuplicateMessage message={isErrorApi} />
                {(!selectedPersona || isErrorApi) && (
                  <ModalFormTemplate
                    title="Crear Nueva Persona"
                    description="Ingresar datos de persona."
                    icon={PlusCircle}
                    label="Crear Persona"
                    variant="default"
                    className="border w-[40%] lg:w-[30%] mt-6 rounded-md justify-center flex mx-auto"
                  >
                    <PersonaCreateEdit
                      refreshPersonas={refetchPersonas}
                      setSelectedPersona={setSelectedPersona}
                      setPersonaId={setPersonaId}
                    />
                  </ModalFormTemplate>
                )}
                {!isErrorApi && (
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className={`mt-4 ${
                      selectedPersona?.idPersona ? "" : "hidden"
                    }`}
                  >
                    <TabsList className="w-full">
                      <TabsTrigger
                        value="persona"
                        className="w-1/2 rounded-md rounded-r-none"
                      >
                        Datos de Persona
                      </TabsTrigger>
                      <TabsTrigger
                        value="cliente"
                        className="w-1/2 rounded-md rounded-l-none"
                      >
                        Datos de Cliente
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="persona">
                      <PersonaCreateEdit
                        key={selectedPersona?.idPersona || "new"}
                        persona={selectedPersona}
                        setSelectedPersona={setSelectedPersona}
                        refreshPersonas={refetchPersonas}
                        setActiveTab={setActiveTab}
                      />
                    </TabsContent>
                    <TabsContent value="cliente">
                      <ClienteCreateEdit
                        refreshClientes={() => fetchClientes(page)}
                        personaId={personaId}
                      />
                    </TabsContent>
                  </Tabs>
                )}
              </ModalFormTemplate>
            )}
          </div>
        </CrudHeader>

        <Card className="mt-4 border-none bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={clientes}
              columns={getColumnsCliente({
                refetch: () => fetchClientes(page),
              })}
              refetch={() => fetchClientes(page)}
              isLoading={isLoading}
              searchTarget="persona.nombre"
              totalUsers={clientes.length}
              fetchNextPage={() => fetchClientes(page + 1)}
              hasNextPage={clientes.length === pageSize}
              isError={Boolean(errorAxios)}
              isFetching={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </CrudsTemplate>
  );
};

export default ClientePage;
