import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import ModelosCreateEdit from "./ModelosCreateEdit"

export default function ModelosSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModelo, setSelectedModelo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: modelos,
    refetch,
    isLoading,
    isError,
  } = usePaginatedQuery({
    key: "modelos",
    endpoint: "modelos",
  })
  const {
    data: marcas,
    isLoading: isLoadingMarcas,
    isError: isErrorMarcas,
    } = usePaginatedQuery({
    key: "marcas",
    endpoint: "marcas",
    })

  const filteredModelos = Array.isArray(modelos)
    ? modelos.filter((modelo) =>
        modelo?.descripcionModeloDispositivo?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleEdit = (modelo) => {
    setSelectedModelo(modelo)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedModelo(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (modelo) => {
    if (
      confirm(`¿Está seguro de eliminar el modelo "${modelo.descripcionModeloDispositivo}"?`)
    ) {
      // Lógica real de eliminación
      console.log("Eliminar modelo:", modelo)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar modelos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Modelo
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Modelo</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  Cargando modelos...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-red-500">
                  Error al cargar modelos
                </TableCell>
              </TableRow>
            ) : filteredModelos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  No se encontraron modelos
                </TableCell>
              </TableRow>
            ) : (
              filteredModelos.map((modelo) => (
                <TableRow key={modelo.idModeloDispositivo}>
                  <TableCell className="font-medium">
                    {modelo.descripcionModeloDispositivo}
                  </TableCell>
                  <TableCell>
                    {modelo?.marca?.descripcionMarcaDispositivo || "Sin marca"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(modelo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(modelo)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

        // En el ModalFormTemplate
        <ModalFormTemplate
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={selectedModelo ? "Editar Modelo" : "Crear Modelo"}
        description={
            selectedModelo
            ? "Modifica los datos del modelo"
            : "Completa los datos del nuevo modelo"
        }
        >
        <ModelosCreateEdit
            modelo={selectedModelo}
            refreshModelos={refetchModelos} 
            marcas={marcas}
        />
        </ModalFormTemplate>
    </div>
  )
}
