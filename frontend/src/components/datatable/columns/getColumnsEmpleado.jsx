import { Ellipsis, List } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import EmpleadoCard from "@/components/organisms/EmpleadoCard"
import { Button } from "@/components/ui/button";

export const getColEmpleados = ({ refetch }) => {
  return [
    {
      header: "Nombre",
      accessorKey: "persona.nombre",
      id: "persona.nombre",
      cell: ({ row }) => <div className="ml-10">{row.original?.persona?.nombre}</div>,
    },
    {
      header: "Apellido",
      accessorKey: "persona.apellido",
      id: "persona.apellido",
      cell: ({ row }) => <div>{row.original?.persona?.apellido}</div>,
    },
    {
      header: "Puesto",
      accessorKey: "puesto.nombrepuestoLaboral",
      id: "puesto.nombrepuestoLaboral",
      cell: ({ row }) => <div>{row.original?.puesto?.nombrepuestoLaboral}</div>,
    },
    {
      header: "Estado Laboral",
      accessorKey: "persona.estadoPersona",
      cell: ({ row }) => <div>{row.original?.persona.estadoPersona}</div>,
    },
    {
      header: "Contratación",
      accessorKey: "fechaContratacion",
      cell: ({ row }) => <div>{new Date(row.original?.fechaContratacion).toLocaleDateString()}</div>,
    },
    {
      header: "Finalización",
      accessorKey: "fechaFinalizacion",
      cell: ({ row }) =>
        row.original.fechaFinalizacion ? (
          <div>{new Date(row.original?.fechaFinalizacion).toLocaleDateString()}</div>
        ) : (
          <div className="text-muted-foreground italic">Activo</div>
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
                  title="Detalles del empleado"
                  description="Información completa del empleado seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <EmpleadoCard empleado={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* TODO Otras acciones */}
              <DropdownMenuItem onClick={() => console.log("Editar", row.original)}>Editar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Eliminar", row.original)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}
