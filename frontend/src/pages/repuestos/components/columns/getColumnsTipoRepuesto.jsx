import { Edit, Ellipsis } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import { Button } from "@/components/ui/button"
import TipoRepuestoCreateEdit from "../TipoRepuestoCreateEdit"

export const getColumnsTiposRepuesto = ({ refetch }) => {
  return [
    {
      header: "Descripción",
      accessorKey: "descripcionTipoRepuesto",
      cell: ({ row }) => (
        <div className="ml-4">{row.original.descripcionTipoRepuesto}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
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
                  title="Editar tipo de repuesto"
                  description="Modifica la descripción del tipo de repuesto."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <TipoRepuestoCreateEdit
                    tipoRepuesto={row.original}
                    refreshTiposRepuesto={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => console.log("Eliminar", row.original)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}
