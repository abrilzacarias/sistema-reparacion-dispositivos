import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"

export default function ModulosSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModulo, setSelectedModulo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: modulos,
    refetch,
    isLoading,
    isError,
  } = usePaginatedQuery({
    key: "modulos",
    endpoint: "modulos",
  })

  const filteredModulos = Array.isArray(modulos)
    ? modulos.filter((modulo) => modulo?.nombreModulo?.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const handleEdit = (modulo) => {
    setSelectedModulo(modulo)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedModulo(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (modulo) => {
    if (confirm(`¿Está seguro de eliminar el módulo "${modulo.nombreModulo}"?`)) {
      console.log("Eliminar módulo:", modulo)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar módulos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Módulo
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Funciones</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Cargando módulos...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-red-500">
                  Error al cargar módulos
                </TableCell>
              </TableRow>
            ) : filteredModulos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No se encontraron módulos
                </TableCell>
              </TableRow>
            ) : (
              filteredModulos.map((modulo) => (
                <TableRow key={modulo.idModulo}>
                  <TableCell className="font-medium">{modulo.nombreModulo}</TableCell>
                  <TableCell>{modulo.descripcionModulo}</TableCell>
                  <TableCell>
                    <Badge variant={modulo.estadoModulo ? "default" : "secondary"}>
                      {modulo.estadoModulo ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{modulo.funciones?.length || 0} funciones</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(modulo)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(modulo)}
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
        title={selectedModulo ? "Editar Módulo" : "Crear Módulo"}
        description={selectedModulo ? "Modifica los datos del módulo" : "Completa los datos del nuevo módulo"}
      >
        {/* <ModuloCreateEdit modulo={selectedModulo} refreshModulos={refetch} /> */}
      </ModalFormTemplate>
    </div>
  )
}
