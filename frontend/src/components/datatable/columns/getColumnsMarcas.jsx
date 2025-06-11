import { Edit, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import MarcasCreateEdit from "@/pages/marcas/components/MarcasCreateEdit";
import MarcasDeleteConfirmModal from "@/components/organisms/MarcasDeleteConfirmModal";
import { Button } from "@/components/ui/button";

export const getColumnsMarcas = ({ refetch }) => [
  {
    header: "ID",
    accessorKey: "idMarcaDispositivo",
    cell: ({ row }) => <div className="ml-4">{row.original.idMarcaDispositivo}</div>,
  },
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
            <MarcasDeleteConfirmModal marca={row.original} refetch={refetch} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 40,
  },
];
