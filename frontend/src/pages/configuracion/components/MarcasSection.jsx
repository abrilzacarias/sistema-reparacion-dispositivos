import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
// import MarcaCreateEdit from "./MarcaCreateEdit"

export default function MarcasSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMarca, setSelectedMarca] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: marcas,
    refetch,
    isLoading,
    isError,
  } = usePaginatedQuery({
    key: "marcas",
    endpoint: "marcas",
  })

  const filteredMarcas = Array.isArray(marcas)
    ? marcas.filter((marca) =>
        marca?.descripcionMarcaDispositivo?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleEdit = (marca) => {
    setSelectedMarca(marca)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedMarca(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (marca) => {
    if (confirm(`¿Está seguro de eliminar la marca "${marca.descripcionMarcaDispositivo}"?`)) {
      // Lógica real de eliminación
      console.log("Eliminar marca:", marca)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar marcas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Marca
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre de Marca</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  Cargando marcas...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8 text-red-500">
                  Error al cargar marcas
                </TableCell>
              </TableRow>
            ) : filteredMarcas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  No se encontraron marcas
                </TableCell>
              </TableRow>
            ) : (
              filteredMarcas.map((marca) => (
                <TableRow key={marca.idMarcaDispositivo}>
                  <TableCell className="font-medium">{marca.descripcionMarcaDispositivo}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(marca)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(marca)}
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

      <ModalFormTemplate
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={selectedMarca ? "Editar Marca" : "Crear Marca"}
        description={selectedMarca ? "Modifica los datos de la marca" : "Completa los datos de la nueva marca"}
      >
        {/* <MarcaCreateEdit marca={selectedMarca} refreshMarcas={refetch} /> */}
      </ModalFormTemplate>
    </div>
  )
}
