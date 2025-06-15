import ModalDeactivateItem from "@/components/molecules/DeleteConfirmButton";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, List, Edit, Trash } from "lucide-react";
import DispositivoCard from "../DispositivoCard";
import DispositivoCreateEdit from "../DispositivoCreateEdit"

export const getColDispositivos = ({ refetch }) => [
  {
    accessorKey: 'nombreTipoDispositivo',
    header: 'Tipo de Dispositivo',
    cell: ({ row }) => {
      console.log("Fila completa:", row.original);
      return (
        <div className="font-medium">
          {row.original.tipoDispositivo?.nombreTipoDispositivo || "-"}
        </div>
      );
    },
  },
  {
      accessorKey: "preguntas",
      header: "Preguntas del Dispositivo",
      cell: ({ row }) => {
        const preguntas = row.original.preguntas;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-auto justify-center gap-2 m-auto text-xs"
              >
                Preguntas
                <span className="bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {preguntas.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {preguntas.map((p, index) => (
                <DropdownMenuItem key={index} className="text-xs">
                  {p.descripcionPreguntaDiagnostico}
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
      const dispositivo = row.original;
      console.log("Dispositivo completo:", dispositivo);
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <ModalFormTemplate
                title="Editar tipo de dispositivo"
                description="Modificar la información del tipo de dispositivo"
                variant="ghost"
                label="Editar"
                icon={Edit}
                className="p-2 m-0 cursor-pointer w-full justify-start"
                contentClassName="max-w-8xl h-auto max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <DispositivoCreateEdit 
                  editData={dispositivo}
                  isEdit={true} 
                />
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
                  endpoint="tipo-dispositivo" // Corregido el endpoint
                  id={dispositivo.tipoDispositivo?.idTipoDispositivo || dispositivo.idDispositivo}
                  refetch={refetch}
                />
              </ModalFormTemplate>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }
];