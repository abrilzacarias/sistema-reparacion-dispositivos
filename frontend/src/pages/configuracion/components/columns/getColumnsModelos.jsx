import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import ModelosCreateEdit from "../ModelosCreateEdit"; // Asegurate de tener este componente

export const getColModelos = ({ refetch }) => [
  {
    accessorKey: "descripcionModeloDispositivo",
    header: "Modelo",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("descripcionModeloDispositivo")}
      </div>
    ),
  },
  {
    header: "Marca",
    accessorKey: "marcaDispositivo.descripcionMarcaDispositivo",
    cell: ({ row }) => {
      const marca = row.original.marcaDispositivo?.descripcionMarcaDispositivo || "-";
      return <div>{marca}</div>;
    },
  },
    {
    header: "Tipo de Dispositivo",  // NUEVA COLUMNA
    accessorKey: "tipoDispositivo.nombreTipoDispositivo",
    cell: ({ row }) => {
      const tipo = row.original.tipoDispositivo?.nombreTipoDispositivo || "-";
      return <div>{tipo}</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const modelo = row.original;
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
                title="Editar Modelo"
                description="Modifica la información del modelo de dispositivo."
                label="Editar"
                variant="ghost"
                icon={Edit}
                className="p-2 m-0 cursor-pointer w-full justify-start"
                contentClassName="sm:max-w-[600px]"
              >
                <ModelosCreateEdit modelo={modelo} refreshModelos={refetch} />
              </ModalFormTemplate>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];