import { useContext, useState } from "react";
import axios from "axios"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ModalFormTemplate, { OpenContext } from "@/components/organisms/ModalFormTemplate";
import { getColumnsTiposDato } from "./columns/getColumnsTiposDato";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import TipoDatoCreateEdit from "./TipoDatoCreateEdit"
import { DataTable } from "@/components/datatable/DataTable";

const API_URL = import.meta.env.VITE_API_URL

export default function TipoDatoSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipoDato, setSelectedTipoDato] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState("")

  const {
    data: tiposDato,
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    isFetching,
    isRefetching,
    hasNextPage,
    total: totalTiposDato,
  } = usePaginatedQuery({
    key: "tiposDatoPreguntaDiagnostico",
    endpoint: "tipoDatoPreguntaDiagnostico",
    pageSize: 50,
  })

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tipoDatoPreguntaDiagnostico/${td.idTipoDatoPreguntaDiagnostico}/`)
      refetch();
    } catch (err) {
      setError("Error al eliminar el tipo de reparación.");
    }
  };
  const filteredTiposDato = Array.isArray(tiposDato)
    ? tiposDato.filter((td) =>
        td?.descripcionTipoDatoPreguntaDiagnostico?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleEdit = (td) => {
    setSelectedTipoDato(td)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedTipoDato(null)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Tipos de dato existentes</h3>
        <ModalFormTemplate
          title="Agregar Tipo de Dato"
          label="Agregar tipo de Dato"
          variant="default"
          className="cursor-pointer justify-start"
        >
          <TipoDatoCreateEdit refreshTipoDato={refetch} />
        </ModalFormTemplate>
      </div>

      <Card className="mt-4 border-none bg-secondary dark:bg-background">
        <CardContent className="p-0">
          <DataTable
            data={tiposDato ?? []}
            columns={getColumnsTiposDato({ refetch })}
            refetch={refetch}
            isLoading={isLoading}
            searchTarget="descripcionTipoDatoPreguntaDiagnostico"
            totalUsers={totalTiposDato}
            fetchNextPage={fetchNextPage}
            isError={isError}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
          />
        </CardContent>
      </Card>
    </div>
  )
}