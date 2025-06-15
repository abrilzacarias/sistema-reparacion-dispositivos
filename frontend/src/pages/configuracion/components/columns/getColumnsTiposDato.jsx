import { useState } from "react";
import axios from "axios";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Button } from "@/components/ui/button";
import TipoDatoCreateEdit from "../TipoDatoCreateEdit";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const getColumnsTiposDato = ({ refetch }) => {
  const handleDelete = async (tipoDato) => {
    if (!window.confirm(`¿Seguro que querés eliminar "${tipoDato.descripcionTipoDatoPreguntaDiagnostico}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/tipoDatoPreguntaDiagnostico/${tipoDato.idTipoDatoPreguntaDiagnostico}`);
      toast.success("Tipo de dato eliminado con éxito");
      refetch?.();
    } catch (error) {
      console.error("Error eliminando tipo de dato:", error);
      toast.error("Error al eliminar. Intente nuevamente.");
    }
  };

  return [
    {
      header: "Descripción",
      accessorKey: "descripcionTipoDatoPreguntaDiagnostico",
      cell: ({ row }) => (
        <div className="ml-4">{row.original.descripcionTipoDatoPreguntaDiagnostico}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const tipoDato = row.original;

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
                  title="Editar tipo de dato"
                  description="Modifica la descripción del tipo de dato."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <TipoDatoCreateEdit
                    tipoDato={tipoDato}
                    refreshTipoDato={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleDelete(tipoDato)}>
            <Trash2 className="w-4 h-4 mr-2 text-red-600" />
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
