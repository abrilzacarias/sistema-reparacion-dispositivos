import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, List } from "lucide-react"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import PerfilCreateEdit from "../PerfilCreateEdit"
import PerfilCard from "../PerfilCard"

export const getColPerfiles = ({ refetch }) => [
  {
    accessorKey: "nombrePerfil",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("nombrePerfil")}</div>,
  },
  {
    accessorKey: "estadoPerfil",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estadoPerfil")
      return <Badge variant={estado ? "default" : "secondary"}>{estado ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    accessorKey: "modulos",
    header: "Módulos",
    cell: ({ row }) => {
      const modulos = row.getValue("modulos") || []

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center w-auto justify-center gap-2 m-auto text-xs"
            >
              Módulos
              <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {modulos.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {modulos.map((modulo, index) => (
              <DropdownMenuItem key={index} className="text-xs">
                {modulo.descripcionModuloSistema}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const perfil = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Detalles del perfil"
                  description="Información completa del perfil seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <PerfilCard perfil={perfil} />
            </ModalFormTemplate>
          </DropdownMenuItem>
            <ModalFormTemplate
              title="Editar Perfil"
              description="Modifica los datos del perfil"
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
              }
            >
              <PerfilCreateEdit perfil={perfil} refreshPerfiles={refetch} />
            </ModalFormTemplate>
            <DropdownMenuItem
              onClick={() => {
                if (confirm(`¿Está seguro de eliminar el perfil "${perfil.nombrePerfil}"?`)) {
                  console.log("Eliminar perfil:", perfil)
                }
              }}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
