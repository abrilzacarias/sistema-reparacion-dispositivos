import {Edit, Ellipsis, List } from "lucide-react";
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
import ClienteDeleteConfirmModal from "@/components/organisms/ClienteDeleteConfirmModal";
import ClienteCreateEdit from "@/pages/cliente/components/ClienteCreateEdit";

export const getColumnsCliente = ({ refetch, onEdit }) => {
  return [
    {
      header: "Nombre",
      accessorKey: "persona.nombre",
      id: "persona.nombre",
      cell: ({ row }) => <div className="ml-10">{row.original?.persona?.nombre}</div>,
    },
    {
      id: 'apellido',
      header: 'Apellido',
      accessorFn: row => row.persona?.apellido || 'Sin apellido',
    },
    {
      header: "CUIT",
      accessorFn: (row) => row.persona?.cuit,
      cell: ({ row }) => <div>{row.original?.persona?.cuit}</div>,
    },
    {
      header: "Fecha de nacimiento",
      accessorFn: (row) => row.persona?.fechaNacimiento,
      cell: ({ row }) => {
        const fechaNacimiento = row.original?.persona?.fechaNacimiento;
        return <div>{fechaNacimiento || <span className="italic text-muted-foreground">Sin fecha de nacimiento</span>}</div>;
      },
    },    
    {
      header: "Email",
      accessorFn: (row) => {
        return row.persona?.contactos?.find(c => c.idtipoContacto === 1)?.descripcionContacto;
      },
      cell: ({ row }) => {
        const email = row.original?.persona?.contactos?.find(c => c.idtipoContacto === 1)?.descripcionContacto;
        return <div>{email || <span className="italic text-muted-foreground">Sin email</span>}</div>;
      },
    },
    {
      header: "Teléfono",
      accessorFn: (row) => {
        return row.persona?.contactos?.find(c => c.idtipoContacto === 2)?.descripcionContacto;
      },
      cell: ({ row }) => {
        const tel = row.original?.persona?.contactos?.find(c => c.idtipoContacto === 2)?.descripcionContacto;
        return <div>{tel || <span className="italic text-muted-foreground">Sin teléfono</span>}</div>;
      },
    },
    {
      header: "Observaciones",
      accessorFn: (row) => row.observaciones,
      cell: ({ row }) => {
        const obs = row.original?.observaciones;
        return (
          <div>
            {obs
              ? obs.length > 30
                ? obs.slice(0, 30) + "..."
                : obs
              : <span className="text-muted-foreground italic">Sin observaciones</span>}
          </div>
        );
      },
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
              <DropdownMenuItem asChild>
                <ModalFormTemplate
                  title="Editar Cliente"
                  description="Modifique los campos del cliente."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <ClienteCreateEdit cliente={row.original} refreshClientes={refetch} onClose={() => {}} />
                </ModalFormTemplate>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ClienteDeleteConfirmModal cliente={row.original} refetch={refetch} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
};