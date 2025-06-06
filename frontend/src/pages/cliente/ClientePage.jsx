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
import ExportOptionsDropdown from "@/components/molecules/ExportOptionsDropdown";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import SearchPersonas from "@/components/organisms/SearchPersonas";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchPersonas } from "@/hooks/useSearchPersonas"; // IMPORTANTE: añadir esta línea
import { PlusCircle, Settings } from "lucide-react";
import PersonaCreateEdit from "@/components/organisms/PersonaCreateEdit";
import ClienteCreateEdit from "./components/ClienteCreateEdit";


const ClientePage = () => {
  // — 1) Estado local para almacenar el array de clientes que trae axios —
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAxios, setErrorAxios] = useState(null);

  // — 2) Estados para la lógica de creación/edición de Cliente —
  const [selectedPersona, setSelectedPersona] = useState("");
  const [personaId, setPersonaId] = useState(null);
  const [searchTarget, setSearchTarget] = useState("");
  const [activeTab, setActiveTab] = useState("persona");
  const [isErrorApi, setIsErrorApi] = useState(false);

  // Hook para buscar Personas por texto
  const {
    personas,
    totalPersonas,
    isLoading: loadingPersonas,
    isError: errorPersonas,
    refetch: refetchPersonas,
    resetQuery,
  } = useSearchPersonas({ query: searchTarget });

  // — 3) Función para obtener clientes desde el backend y guardarlos en estado —
  const fetchClientes = async () => {
    try {
      setIsLoading(true);
      setErrorAxios(null);

      // Asegúrate de tener VITE_API_URL en tu .env apuntando a http://localhost:8000
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const respuesta = await axios.get(`${API_URL}/clientes/`);
      
      // Imprime en la consola del navegador el array exacto que devuelve el backend
      console.log("Respuesta axios GET /clientes/:", respuesta.data);

      // Guarda los datos en estado para que la tabla los muestre
      setClientes(respuesta.data);
    } catch (err) {
      console.error("Error al hacer axios.get('/clientes/'):", err);
      setErrorAxios(err);
    } finally {
      setIsLoading(false);
    }
  };

  // — 4) Al montar el componente, invoca fetchClientes una vez —
  useEffect(() => {
    fetchClientes();
  }, []);

  // — 5) Control de duplicado: si selectedPersona ya está asociado a un cliente, muestra error —
  useEffect(() => {
    if (selectedPersona?.cliente) {
      setIsErrorApi(
        `La persona ${selectedPersona.nombre} ${selectedPersona.apellido} ya es Cliente.`
      );
    } else {
      setIsErrorApi(false);
    }
  }, [selectedPersona]);

  // — 6) Funciones para el SearchPersonas —
  const handleSearchTarget = (event) => {
    resetQuery();
    setSearchTarget(event.target.value);
  };

  const startSearch = () => {
    if (searchTarget.trim() !== "") {
      resetQuery();
      setSelectedPersona("");
      refetchPersonas();
    }
  };

  useEffect(() => {
    if (searchTarget.trim() === "") {
      resetQuery();
    }
  }, [searchTarget]);

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        {/* ── Header con título y botones ── */}
        <CrudHeader
          title="Gestión de Clientes"
          subTitle="Listado, registro y modificación de clientes."
        >
          <div className="flex items-center gap-2">
            {/* Botón para volver a recargar todos los clientes */}
            <ButtonRefetch isFetching={isLoading} refetch={fetchClientes} />

            <ExportOptionsDropdown
              excelComponent={
                <Button variant="ghost" className="w-full justify-start">
                  Excel
                </Button>
              }
              pdfComponent={
                <Button variant="ghost" className="w-full justify-start">
                  PDF
                </Button>
              }
              formats={{ excel: true, pdf: true }}
              buttonProps={{
                variant: "outline",
                size: "sm",
                label: "Exportar",
              }}
            />

            {/* Modal para agregar Cliente */}
            <ModalFormTemplate
              icon={Settings}
              title="Agregar Cliente"
              description="Complete los campos para agregar un nuevo cliente."
              label="Agregar Cliente"
              variant="default"
              className="p-2 m-0 cursor-pointer w-full justify-start"
            >
              {/* 6.1) Buscador de Persona */}
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

              {/* 6.2) Mensaje si la persona ya existe como cliente */}
              <ErrorDuplicateMessage message={isErrorApi} />

              {/* 6.3) Si no hay persona válida o ya está duplicada, mostramos form para crear Persona */}
              {(!selectedPersona || isErrorApi) && (
                <ModalFormTemplate
                  title="Crear Nueva Persona"
                  description="Ingrese los datos para crear una nueva persona."
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

              {/* 6.4) Si la persona es válida y no hay error, mostramos pestañas para editar ambos */}
              {!isErrorApi && (
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className={`mt-4 ${selectedPersona?.idPersona ? "" : "hidden"}`}
                >
                  <TabsList className="w-full">
                    <TabsTrigger value="persona" className="w-1/2 rounded-md rounded-r-none">
                      Datos de Persona
                    </TabsTrigger>
                    <TabsTrigger value="cliente" className="w-1/2 rounded-md rounded-l-none">
                      Datos de Cliente
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="persona">
                    <PersonaCreateEdit
                      key={selectedPersona?.idPersona || "new"}
                      setSelectedPersona={setSelectedPersona}
                      persona={selectedPersona}
                      refreshPersonas={refetchPersonas}
                      setActiveTab={setActiveTab}
                    />
                  </TabsContent>

                  <TabsContent value="cliente">
                    <ClienteCreateEdit
                      refreshClientes={fetchClientes}
                      cliente={null} /* Si estuvieras editando, aquí iría el objeto cliente */
                    />
                  </TabsContent>
                </Tabs>
              )}
            </ModalFormTemplate>
          </div>
        </CrudHeader>

        {/* ── 7) Tabla de clientes ── */}
        <Card className="mt-4 border-none bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={clientes}                          // Pasamos directamente el array guardado en estado
              columns={getColumnsCliente({ refetch: fetchClientes })}
              refetch={fetchClientes}
              isLoading={isLoading}
              searchTarget="persona.nombre"
              totalUsers={clientes.length}
              fetchNextPage={null}                     // Sin paginación
              isError={Boolean(errorAxios)}
              hasNextPage={false}
              isFetching={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </CrudsTemplate>
  );
};

export default ClientePage;
