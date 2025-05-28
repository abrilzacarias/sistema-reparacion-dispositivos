import { useContext, useEffect, useState } from "react"
import axios from "axios"
import ModalFormTemplate, { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { getColumnsTiposRepuesto } from "./columns/getColumnsTipoRepuesto"
import TipoRepuestoCreateEdit from "./TipoRepuestoCreateEdit"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/datatable/DataTable"
import { Button } from "@/components/ui/button"

const API_URL = import.meta.env.VITE_API_URL

const TiposRepuestoModal = () => {
  const [tiposRepuesto, setTiposRepuesto] = useState([])
  const [error, setError] = useState("")
  const { open, setOpen } = useContext(OpenContext)
  const {
      data: repuestos,
      refetch,
      fetchNextPage,
      isLoading,
      isError,
      isFetching,
      isRefetching,
      hasNextPage,
      total: totalRepuestos,
    } = usePaginatedQuery({
      key: "tipos-repuesto",
      endpoint: "tipos-repuesto",
      pageSize: 50,
    });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tipos-repuesto/${id}/`)
    } catch (err) {
      setError("Error al eliminar el tipo de repuesto.")
    }
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Tipos de repuesto existentes</h3>
            <ModalFormTemplate
            title="Agregar Tipo de Repuesto"
            label="Agregar tipo de repuesto"
            variant="default"
            className="cursor-pointer justify-start"
            >
                <TipoRepuestoCreateEdit
                    refreshTiposRepuesto={refetch}
                />
            </ModalFormTemplate>
        </div>
        <Card className="mt-4 border-none  bg-secondary dark:bg-background">
          <CardContent className="p-0">
            <DataTable
              data={repuestos ?? []}
              columns={getColumnsTiposRepuesto({ refetch })}
              refetch={refetch}
              isLoading={isLoading}
              searchTarget="nombreRepuesto"
              totalUsers={totalRepuestos}
              fetchNextPage={fetchNextPage}
              isError={isError}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TiposRepuestoModal