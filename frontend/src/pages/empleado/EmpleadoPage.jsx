import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

import CrudHeader from "@/components/molecules/CrudHeader"
import CrudsTemplate from "@/components/molecules/CrudsTemplate"
import ButtonRefetch from "@/components/atoms/ButtonRefetch"
import ErrorApiRefetch from "@/components/atoms/ErrorApiRefetch"
import { DataTable } from "@/components/datatable/DataTable"
import { getColEmpleados } from "@/components/datatable/columns/getColumnsEmpleado"
import {usePaginatedQuery} from "@/hooks/usePaginatedQuery"

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

  const [selectedUser, setSelectedUser] = useState("")
  const [userId, setUserId] = useState(null)
  const [searchTarget, setSearchTarget] = useState("")

  //PENSAR DEPENDIENDO DE CANTIDAD DE USUARIOS ESTIMADOS TODO
  /* const {
    employees: users,
    totalUsers,
    isLoading: loadingEmployees,
    isError: errorEmployees,
    refetch: refetchEmployees,
    resetQuery,
  } = useSearchEmployees({ query: searchTarget }) */

/*   const handleSearchTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetQuery()
    setSelectedUser("")
    setSearchTarget(event.target.value)
  } */

  /* const startSearch = () => {
    if (searchTarget.trim() !== "") {
      resetQuery()
      setSelectedUser(
        totalUsers === 1 ? "1 resultado" : `${totalUsers || "sin"} resultados`
      )
      refetchEmployees()
    }
  }

  useEffect(() => {
    resetQuery()
  }, [searchTarget]) */

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

{/*               <SearchUsersApi
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
                startSearch={startSearch}
                userId={userId}
                data={users}
                isLoading={loadingEmployees}
                setUserId={setUserId}
                error={errorEmployees}
                handleChage={handleSearchTarget}
                setSearch={setSearchTarget}
                search={searchTarget}
                variant="modalShhet"
                label="Filtrar empleado por nombre"
              /> */}

{/*               {selectedUser?.id && (
                <EmployeeCreateEdit
                  refreshEmployees={refetch}
                  userId={userId}
                  setSelectedUser={setSelectedUser}
                />
              )} */}
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
