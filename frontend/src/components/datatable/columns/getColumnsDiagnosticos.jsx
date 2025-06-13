import { useState } from "react";
import { Ellipsis, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import DiagnosticoCard from "@/components/organisms/DiagnosticoCard";
import { Button } from "@/components/ui/button";
import ReparacionCreateEdit from "@/pages/reparaciones/components/ReparacionesCreateEdit";


//NO SE SI DISPOSITIVO SE TIENE QUE MANDAR COMO OCULTO
export const getColumnsDiagnosticos = ({ refetch }) => {
  return [
    {
      header: "Fecha",
      accessorKey: "fechaDiagnostico",
      cell: ({ row }) => (
        <div>{new Date(row.original.fechaDiagnostico).toLocaleDateString()}</div>
      ),
    },
    {
      header: "Tipo de Dispositivo",
      accessorKey: "dispositivo.tipoDispositivo.nombreTipoDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.tipoDispositivo?.nombreTipoDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Modelo",
      accessorKey: "dispositivo.modeloDispositivo.descripcionModeloDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.modeloDispositivo?.descripcionModeloDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Marca",
      accessorKey: "dispositivo.modeloDispositivo.marcaDispositivo.descripcionMarcaDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.modeloDispositivo?.marcaDispositivo?.descripcionMarcaDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Cliente",
      accessorKey: "dispositivo.cliente.persona",
      cell: ({ row }) => {
        const persona = row.original.dispositivo?.cliente?.persona;
        return <div>{persona ? `${persona.nombre} ${persona.apellido}` : "N/A"}</div>;
      },
    },
    {
      header: "Técnico",
      accessorKey: "empleado.persona",
      cell: ({ row }) => {
        const persona = row.original.empleado?.persona;
        return <div>{persona ? `${persona.nombre} ${persona.apellido}` : "N/A"}</div>;
      },
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
                  title="Detalles del diagnóstico"
                  description="Información completa del diagnóstico"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <DiagnosticoCard diagnostico={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <ModalFormTemplate
                  title="Crear Reparación"
                  description="Complete los datos para crear una reparación"
                  label="Crear Reparación"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <ReparacionCreateEdit
                    idDiagnostico={row.original.idDiagnostico}
                    refreshReparaciones={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
};