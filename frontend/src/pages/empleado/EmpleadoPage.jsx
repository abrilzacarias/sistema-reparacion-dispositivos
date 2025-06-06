import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

import CrudHeader from "@/components/molecules/CrudHeader"
import CrudsTemplate from "@/components/molecules/CrudsTemplate"
import ButtonRefetch from "@/components/atoms/ButtonRefetch"
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch"
import { DataTable } from "@/components/datatable/DataTable"
import { getColEmpleados } from "@/components/datatable/columns/getColumnsEmpleado"
import {usePaginatedQuery} from "@/hooks/usePaginatedQuery"
import { PlusCircle, Settings } from "lucide-react"
import { useSearchPersonas } from "@/hooks/useSearchPersonas"
import ExportOptionsDropdown from "@/components/molecules/ExportOptionsDropdown"
import { Button } from "@/components/ui/button"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import SearchPersonas from "@/components/organisms/SearchPersonas"
import EmpleadoCreateEdit from "./components/EmpleadoCreateEdit"
import PersonaCreateEdit from "../../components/organisms/PersonaCreateEdit"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const EmpleadoPage = () => {
  const {
  data: employees,
  refetch,
  fetchNextPage,
  isLoading,
  isError,
  isFetching,
  isRefetching,
  hasNextPage,
  total: totalEmployees,
} = usePaginatedQuery({
  key: "empleados",
  endpoint: "empleados",
})

  const [selectedPersona, setSelectedPersona] = useState("")
  const [personaId, setPersonaId] = useState(null)
  const [searchTarget, setSearchTarget] = useState("")
  const [activeTab, setActiveTab] = useState("persona")
  const [personaEmail, setPersonaEmail] = useState("")
  
  const {
    personas,
    totalPersonas,
    isLoading: loadingPersonas,
    isError: errorPersonas,
    refetch: refetchPersonas,
    resetQuery,
  } = useSearchPersonas({ query: searchTarget })

  const handleSearchTarget = (event) => {
    resetQuery()
    setSearchTarget("")
    setSelectedPersona("")
    setSearchTarget(event.target.value)
  }

  const startSearch = () => {
    if (searchTarget.trim() !== "") {
      resetQuery()
      setSelectedPersona(
        totalPersonas === 1 ? "1 resultado" : `${totalPersonas || "sin"} resultados`
      )
      refetchPersonas()
    }
  }

  useEffect(() => {
    if (searchTarget.trim() === "") {
      resetQuery()
    }
  }, [searchTarget])

  useEffect(() => {
    if (selectedPersona?.contactos) {
      const contactoCorreo = selectedPersona.contactos.find(
        (c) => c.tipoContacto.descripcionTipoContacto.toLowerCase() === "correo" && c.esPrimario,
      )
      const email = contactoCorreo?.descripcionContacto || ""
      setPersonaEmail(email)
      console.log("Email extraído de selectedPersona:", email) // Debug
    } else {
      setPersonaEmail("")
    }
  }, [selectedPersona])


  if (isError)
    return (
      <ErrorApiRefetch isRefetching={isFetching} refetch={refetch} />
    )

  return (
    <CrudsTemplate>
      <div className="bg-secondary dark:bg-background p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <CrudHeader
          title="Gestión de Empleados"
          subTitle="Listado, registro y modificación del personal contratado."
        >
          <div className="flex items-center gap-2">

            <ButtonRefetch isFetching={isRefetching} refetch={refetch} />
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
            
            
            <ModalFormTemplate
              icon={Settings}
              title="Agregar Empleado"
              description="Complete los campos para agregar un nuevo empleado."
              label="Agregar Empleado"
              variant="default"
              className="p-2 m-0 cursor-pointer w-full justify-start"
            >
              {/* TODO AGREGAR QUE APRETANDO EL ICONOD E BUSCAR BUSQUE TAMBIEN, NO SOLO CON ENTER */}
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

              {(!selectedPersona) && (
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

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className={`mt-4 ${selectedPersona?.idPersona ? "" : "hidden"}`}
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    value="persona"
                    className="w-1/2 rounded-md rounded-r-none"
                  >
                    Datos de Persona
                  </TabsTrigger>
                  <TabsTrigger
                    value="empleado"
                    className="w-1/2 rounded-md rounded-l-none"
                  >
                    Datos de Empleado
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

                <TabsContent value="empleado">
                  <EmpleadoCreateEdit
                    refreshEmpleados={refetch}
                    idPersona={personaId}
                    personaEmail={personaEmail}
                  />
                </TabsContent>
              </Tabs>
            </ModalFormTemplate>
          </div>
        </CrudHeader>

        <Card className="mt-4 border-none  bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={employees ?? []}
              columns={getColEmpleados({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="persona.nombre"
              totalUsers={totalEmployees}
              fetchNextPage={fetchNextPage}
              isError={isError}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
            />
          </CardContent>
        </Card>
      </div>
    </CrudsTemplate>
  )
}

export default EmpleadoPage
