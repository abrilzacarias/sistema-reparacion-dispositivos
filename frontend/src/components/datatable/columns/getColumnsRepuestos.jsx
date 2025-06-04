import { Edit, Ellipsis, List } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import RepuestoCard from "@/components/organisms/RepuestoCard"
import RepuestosCreateEdit from "@/pages/repuestos/components/RepuestosCreateEdit"
import { Button } from "@/components/ui/button"

export const getColumnsRepuestos = ({ refetch }) => {
  return [
    {
      header: "Nombre",
      accessorKey: "nombreRepuesto",
      cell: ({ row }) => <div className="ml-4">{row.original.nombreRepuesto}</div>,
    },
    {
      header: "Tipo",
      accessorKey: "tipoRepuesto",
      cell: ({ row }) => <div>{row.original.tipo.descripcionTipoRepuesto}</div>,
    },
    {
      header: "Precio ($)",
      accessorKey: "precio",
      cell: ({ row }) => <div>${parseFloat(row.original.precio).toFixed(2)}</div>,
    },
    {
      header: "Cantidad",
      accessorKey: "cantidadRepuesto",
      cell: ({ row }) => <div>{row.original.cantidadRepuesto}</div>,
    },
    {
      header: "Marca",
      accessorKey: "marca.descripcionMarcaDispositivo",
      cell: ({ row }) => (
        <div>{row.original?.marca?.descripcionMarcaDispositivo ?? "Sin marca"}</div>
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
              variant="ghost"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <Ellipsis className="size-4" />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Detalles del repuesto"
                  description="Información del repuesto seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <RepuestoCard repuesto={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Editar Repuesto"
                  description="Modifique los campos necesarios para actualizar el repuesto."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <RepuestosCreateEdit
                    repuesto={row.original}
                    refreshRepuestos={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => console.log("Eliminar", row.original)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}
