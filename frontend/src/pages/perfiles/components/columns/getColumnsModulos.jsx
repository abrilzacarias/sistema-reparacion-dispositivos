import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import ModuloCreateEdit from "../ModuloCreateEdit"

export const getColModulos = ({ refetch }) => [
  {
    accessorKey: "descripcionModuloSistema",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("descripcionModuloSistema")}</div>,
  },
  {
    accessorKey: "estadoModulo",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estadoModulo")
      return <Badge variant={estado ? "default" : "secondary"}>{estado ? "Activo" : "Inactivo"}</Badge>
    },
  },
  {
    accessorKey: "funciones",
    header: "Funciones",
    cell: ({ row }) => {
      const funciones = row.getValue("funciones") || []

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center w-auto justify-center gap-2 m-auto text-xs"
            >
              Funciones
              <span className="bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {funciones.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {funciones.map((funcion, index) => (
              <DropdownMenuItem key={index} className="text-xs">
                {funcion.descripcionFuncionSistema}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const modulo = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ModalFormTemplate
              title="Editar Módulo"
              description="Modifica los datos del módulo"
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
              }
            >
              <ModuloCreateEdit modulo={modulo} refreshModulos={refetch} />
            </ModalFormTemplate>
            <DropdownMenuItem
              onClick={() => {
                if (confirm(`¿Está seguro de eliminar el módulo "${modulo.nombreModulo}"?`)) {
                  console.log("Eliminar módulo:", modulo)
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
