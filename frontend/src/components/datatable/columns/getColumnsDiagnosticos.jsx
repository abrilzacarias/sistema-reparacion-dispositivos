import { Ellipsis, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import DiagnosticoCard from "@/components/organisms/DiagnosticoCard"; // Necesitarás crear este componente
import { Button } from "@/components/ui/button";

export const getColumnsDiagnosticos = ({ refetch }) => {
  return [
    {
      header: "ID",
      accessorKey: "idDiagnostico",
      size: 80,
    },
    {
      header: "Fecha",
      accessorKey: "fechaDiagnostico",
      cell: ({ row }) => (
        <div>{new Date(row.original.fechaDiagnostico).toLocaleDateString()}</div>
      ),
    },
    {
      header: "Dispositivo",
      accessorKey: "dispositivo.descripcionDispositivo",
      cell: ({ row }) => (
        <div>{row.original.dispositivo?.descripcionDispositivo || "N/A"}</div>
      ),
    },
    {
      header: "Modelo",
      accessorKey: "dispositivo.modeloDispositivo",
      cell: ({ row }) => (
        <div>{row.original.dispositivo?.modeloDispositivo || "N/A"}</div>
      ),
    },
    {
      header: "Marca",
      accessorKey: "dispositivo.marcaDispositivo.descripcionMarcaDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.marcaDispositivo?.descripcionMarcaDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Tipo",
      accessorKey: "dispositivo.tipoDispositivo.nombreTipoDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.tipoDispositivo?.nombreTipoDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Cliente",
      accessorKey: "dispositivo.cliente.persona",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.cliente?.persona
            ? `${row.original.dispositivo.cliente.persona.nombre} ${row.original.dispositivo.cliente.persona.apellido}`
            : "N/A"}
        </div>
      ),
    },
    {
      header: "Técnico",
      accessorKey: "empleado.persona",
      cell: ({ row }) => (
        <div>
          {row.original.empleado?.persona
            ? `${row.original.empleado.persona.nombre} ${row.original.empleado.persona.apellido}`
            : "N/A"}
        </div>
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
              <DropdownMenuItem className="w-full flex items-center justify-between">
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

              <DropdownMenuItem onClick={() => console.log("Editar", row.original)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Eliminar", row.original)}>
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