import { Ellipsis, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import ClienteCard from "@/components/organisms/ClienteCard";
import { Button } from "@/components/ui/button";

export const getColumnsCliente = ({ refetch }) => {
  return [
    {
      header: "Nombre",
      accessorKey: "persona.nombre",
      id: "persona.nombre",
      cell: ({ row }) => <div className="ml-6">{row.original?.persona?.nombre}</div>,
    },
    {
      header: "Apellido",
      accessorKey: "persona.apellido",
      id: "persona.apellido",
      cell: ({ row }) => <div>{row.original?.persona?.apellido}</div>,
    },
    {
      header: "CUIT",
      accessorKey: "persona.cuit",
      id: "persona.cuit",
      cell: ({ row }) => <div>{row.original?.persona?.cuit}</div>,
    },
    {
      header: "Observaciones",
      accessorKey: "observaciones",
      id: "observaciones",
      cell: ({ row }) => (
        <div>
          {row.original?.observaciones
            ? row.original.observaciones.length > 30
              ? row.original.observaciones.slice(0, 30) + "..."
              : row.original.observaciones
            : <span className="text-muted-foreground italic">Sin observaciones</span>}
        </div>
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
                <Ellipsis className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {/* Ver Detalles */}
              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Detalles del Cliente"
                  description="Información completa del cliente seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <ClienteCard cliente={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Editar Cliente */}
              <DropdownMenuItem onClick={() => console.log("Editar Cliente", row.original)}>
                Editar
              </DropdownMenuItem>

              {/* Eliminar Cliente */}
              <DropdownMenuItem onClick={() => console.log("Eliminar Cliente", row.original)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
};
