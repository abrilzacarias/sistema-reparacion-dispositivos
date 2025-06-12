import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"

export default function FuncionesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFuncion, setSelectedFuncion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: funciones,
    refetch,
    isLoading,
    isError,
  } = usePaginatedQuery({
    key: "funciones",
    endpoint: "funciones",
  })

  const filteredFunciones = Array.isArray(funciones)
    ? funciones.filter(
        (funcion) =>
          funcion?.nombreFuncion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          funcion?.modulo?.nombreModulo?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const handleEdit = (funcion) => {
    setSelectedFuncion(funcion)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedFuncion(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (funcion) => {
    if (confirm(`¿Está seguro de eliminar la función "${funcion.nombreFuncion}"?`)) {
      console.log("Eliminar función:", funcion)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar funciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Función
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Módulo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Cargando funciones...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-red-500">
                  Error al cargar funciones
                </TableCell>
              </TableRow>
            ) : filteredFunciones.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No se encontraron funciones
                </TableCell>
              </TableRow>
            ) : (
              filteredFunciones.map((funcion) => (
                <TableRow key={funcion.idFuncion}>
                  <TableCell className="font-medium">{funcion.nombreFuncion}</TableCell>
                  <TableCell>{funcion.descripcionFuncion}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{funcion.modulo?.nombreModulo}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={funcion.estadoFuncion ? "default" : "secondary"}>
                      {funcion.estadoFuncion ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(funcion)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(funcion)}
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
        title={selectedFuncion ? "Editar Función" : "Crear Función"}
        description={selectedFuncion ? "Modifica los datos de la función" : "Completa los datos de la nueva función"}
      >
        {/* <FuncionCreateEdit funcion={selectedFuncion} refreshFunciones={refetch} /> */}
      </ModalFormTemplate>
    </div>
  )
}
