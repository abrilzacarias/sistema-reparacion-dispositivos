import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import FuncionCreateEdit from "../FuncionCreateEdit"

export const getColFunciones = ({ refetch }) => [
  {
    accessorKey: "descripcionFuncionSistema",
    header: "Nombre",
    cell: ({ row }) => <div className="font-medium">{row.getValue("descripcionFuncionSistema")}</div>,
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
    accessorKey: "estadoFuncion",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estadoFuncion")
      return <Badge variant={estado ? "default" : "secondary"}>{estado ? "Activa" : "Inactiva"}</Badge>
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const funcion = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ModalFormTemplate
              title="Editar Función"
              description="Modifica los datos de la función"
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
              }
            >
              <FuncionCreateEdit funcion={funcion} refreshFunciones={refetch} />
            </ModalFormTemplate>
            <DropdownMenuItem
              onClick={() => {
                if (confirm(`¿Está seguro de eliminar la función "${funcion.descripcionFuncionSistema}"?`)) {
                  console.log("Eliminar función:", funcion)
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
