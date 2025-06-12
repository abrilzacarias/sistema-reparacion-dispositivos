import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"

export default function PerfilesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPerfil, setSelectedPerfil] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    data: perfiles,
    refetch,
    isLoading,
    isError,
  } = usePaginatedQuery({
    key: "perfiles",
    endpoint: "perfiles",
  })

  const filteredPerfiles = Array.isArray(perfiles)
    ? perfiles.filter((perfil) => perfil?.nombrePerfil?.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const handleEdit = (perfil) => {
    setSelectedPerfil(perfil)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedPerfil(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (perfil) => {
    if (confirm(`¿Está seguro de eliminar el perfil "${perfil.nombrePerfil}"?`)) {
      // Implementar lógica de eliminación
      console.log("Eliminar perfil:", perfil)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header con búsqueda y botón crear */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar perfiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Perfil
        </Button>
      </div>

      {/* Tabla de perfiles */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Módulos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Cargando perfiles...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-red-500">
                  Error al cargar perfiles
                </TableCell>
              </TableRow>
            ) : filteredPerfiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No se encontraron perfiles
                </TableCell>
              </TableRow>
            ) : (
              filteredPerfiles.map((perfil) => (
                <TableRow key={perfil.idPerfil}>
                  <TableCell className="font-medium">{perfil.nombrePerfil}</TableCell>
                  <TableCell>{perfil.descripcionPerfil}</TableCell>
                  <TableCell>
                    <Badge variant={perfil.estadoPerfil ? "default" : "secondary"}>
                      {perfil.estadoPerfil ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {perfil.modulos?.slice(0, 3).map((modulo, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {modulo.nombreModulo}
                        </Badge>
                      ))}
                      {perfil.modulos?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{perfil.modulos.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(perfil)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(perfil)}
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

      {/* Modal para crear/editar */}
      <ModalFormTemplate
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={selectedPerfil ? "Editar Perfil" : "Crear Perfil"}
        description={selectedPerfil ? "Modifica los datos del perfil" : "Completa los datos del nuevo perfil"}
      >
        {/* <PerfilCreateEdit perfil={selectedPerfil} refreshPerfiles={refetch} /> */}
      </ModalFormTemplate>
    </div>
  )
}
