import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import ModuloEdit from "../ModuloEdit"

export const getColModulos = ({ refetch, funcionesSistema }) => [
  {
    accessorKey: "descripcionModuloSistema",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("descripcionModuloSistema")}</div>,
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
                  title="Editar Módulo"
                  description="Selecciona las funciones que deseas asociar a este módulo."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                  contentClassName="sm:max-w-[600px] sm:max-h-[650px]"
                >
                  <ModuloEdit modulo={row.original} refreshModulos={refetch} funciones={funcionesSistema} />
                </ModalFormTemplate>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
