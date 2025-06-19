import ModalDeactivateItem from "@/components/molecules/DeleteConfirmButton";
import { Edit, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import MarcasDeleteConfirmModal from "@/components/organisms/MarcasDeleteConfirmModal";
import { Button } from "@/components/ui/button";
import MarcasCreateEdit from "@/pages/configuracion/components/MarcasCreateEdit";

export const getColumnsMarcas = ({ refetch }) => [
  {
    header: "Marca",
    accessorKey: "descripcionMarcaDispositivo",
    cell: ({ row }) => <div>{row.original.descripcionMarcaDispositivo}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <ModalFormTemplate
              title="Editar Marca"
              description="Modifique la descripción de la marca."
              label="Editar"
              variant="ghost"
              icon={Edit}
              className="p-2 m-0 cursor-pointer w-full justify-start"
            >
              <MarcasCreateEdit marca={row.original} refreshMarcas={refetch} />
            </ModalFormTemplate>
          </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ModalFormTemplate
                title="¿Estás completamente seguro?"
                description="Esta acción no se puede deshacer."
                label="Eliminar"
                variant="ghost"
                icon={Trash}
                className="m-0 text-red-900 dark:text-red-500 cursor-pointer w-full p-2 justify-start"
              >
                <ModalDeactivateItem
                  endpoint="marca" // Corregido el endpoint
                  id={row.original.idMarca?.idMarca || row.original.idMarca}
                  refetch={refetch}
                />
              </ModalFormTemplate>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 40,
  },
];
