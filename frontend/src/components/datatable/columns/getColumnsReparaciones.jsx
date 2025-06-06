import { Edit, Ellipsis, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Button } from "@/components/ui/button";
import ReparacionesCreateEdit from "@/pages/reparaciones/components/ReparacionesCreateEdit";
import DetalleReparacionModal from "@/pages/reparaciones/components/DetalleReparacionModal";

export const getColumnsReparaciones = ({ refetch }) => {
  return [
    {
      header: "N° Reparación",
      accessorKey: "numeroReparacion",
      cell: ({ row }) => <div className="ml-4">{row.original.numeroReparacion}</div>,
    },
    {
      header: "Fecha Ingreso",
      accessorKey: "fechaIngreso",
      cell: ({ row }) => <div>{row.original.fechaIngreso}</div>,
    },
    {
      header: "Fecha Egreso",
      accessorKey: "fechaEgreso",
      cell: ({ row }) => (
        <div>{row.original.fechaEgreso ?? "En proceso"}</div>
      ),
    },
    {
      header: "Monto Total ($)",
      accessorKey: "montoTotalReparacion",
      cell: ({ row }) => (
        <div>${parseFloat(row.original.montoTotalReparacion).toFixed(2)}</div>
      ),
    },
    {
      header: "Estado",
      accessorKey: "estadoReparacion.descripcionEstadoReparacion",
      cell: ({ row }) => (
        <div>{row.original.estadoReparacion?.descripcionEstadoReparacion ?? "Sin estado"}</div>
      ),
    },
    {
      header: "Empleado",
      accessorKey: "empleado.persona.nombre",
      cell: ({ row }) => {
    const persona = row.original.empleado?.persona;
    const nombre = persona?.nombre || "";
    const apellido = persona?.apellido || "";
    return <div>{`${nombre} ${apellido}`.trim() || "Sin asignar"}</div>;
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
              {/* Detalle (opcional) */}
              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
              <ModalFormTemplate
                title="Detalles de Reparación"
                label="Ver detalles"
                variant="ghost"
                icon={List}
                className="p-2 m-0 cursor-pointer w-full justify-start"
              >
                <div>
                  <DetalleReparacionModal idReparacion={row.original.idReparacion} />
                </div>
              </ModalFormTemplate>
            </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Editar */}
              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Editar Reparación"
                  description="Modifique los campos necesarios para actualizar la reparación."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <ReparacionesCreateEdit
                    reparacion={row.original}
                    refreshReparaciones={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>

              {/* Eliminar */}
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
