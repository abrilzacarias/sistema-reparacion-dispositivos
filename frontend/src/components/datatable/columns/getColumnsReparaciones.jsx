import { Edit, Ellipsis, List, UserCheck } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
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
import HistorialAsignacionReparacionModal from "@/pages/reparaciones/components/HistorialAsignacionReparacionModal"; // asegurate del path
import { tienePermiso } from "@/utils/permisos";

const API_URL = import.meta.env.VITE_API_URL;

export const getColumnsReparaciones = ({ refetch }) => {
  const handleDelete = async (reparacion, refetch) => {
    if (!window.confirm(`¿Seguro que querés eliminar esta reparación?`)) return;
    try {
      const res = await axios.delete(
        `${API_URL}/reparaciones/${reparacion.idReparacion}`
      );
      toast.success("Reparación eliminada con éxito");
      refetch?.();
    } catch (error) {
      console.error("Error eliminando reparación:", error);
      const errorMsg =
        error.response?.data?.detail ||
        "No se puede eliminar una reparacion con detalles.";
      toast.error(errorMsg);
    }
  };

  return [
    {
      header: "N° Reparación",
      accessorKey: "idReparacion",
      cell: ({ row }) => (
        <div className="ml-4">{row.original.idReparacion}</div>
      ),
    },
    {
      header: "Cliente",
      accessorFn: (row) => {
        const persona = row.diagnostico?.dispositivo?.cliente?.persona;
        return persona
          ? `${persona.nombre ?? ""} ${persona.apellido ?? ""}`.trim()
          : "Sin cliente";
      },
      cell: ({ row }) => {
        const persona = row.original.diagnostico?.dispositivo?.cliente?.persona;
        return (
          <div>
            {persona
              ? `${persona.nombre} ${persona.apellido}`.trim()
              : "Sin cliente"}
          </div>
        );
      },
    },
    {
      header: "Fecha Ingreso",
      accessorKey: "fechaIngreso",
      cell: ({ row }) => <div>{row.original.fechaIngreso}</div>,
    },
    {
      header: "Fecha Egreso",
      accessorKey: "fechaEgreso",
      cell: ({ row }) => <div>{row.original.fechaEgreso ?? "-"}</div>,
    },
    {
      header: "Monto Total ($)",
      accessorKey: "montoTotalReparacion",
      cell: ({ row }) => {
        const monto = row.original.montoTotalReparacion;
        return (
          <div>
            {monto != null ? `$${parseFloat(monto).toFixed(2)}` : "$0.0"}
          </div>
        );
      },
    },
    {
      header: "Estado",
      accessorFn: (row) => {
        const estados = row.registroEstadoReparacion ?? [];
        const ultimo = estados.reduce(
          (prev, curr) =>
            new Date(prev.fechaHoraRegistroEstadoReparacion) >
            new Date(curr.fechaHoraRegistroEstadoReparacion)
              ? prev
              : curr,
          {}
        );
        return (
          ultimo.estadoReparacion?.descripcionEstadoReparacion ?? "Sin estado"
        );
      },
      cell: ({ row }) => {
        const estados = row.original.registroEstadoReparacion;
        if (!estados?.length) return <div>Sin estado</div>;
        const ultimoEstado = estados.reduce((prev, curr) =>
          new Date(prev.fechaHoraRegistroEstadoReparacion) >
          new Date(curr.fechaHoraRegistroEstadoReparacion)
            ? prev
            : curr
        );
        return (
          <div>
            {ultimoEstado.estadoReparacion?.descripcionEstadoReparacion ??
              "Sin estado"}
          </div>
        );
      },
    },
    {
      header: "Empleado",
      accessorFn: (row) => {
        const persona = row.empleado?.persona;
        return persona
          ? `${persona.nombre ?? ""} ${persona.apellido ?? ""}`.trim()
          : "Sin asignar";
      },
      cell: ({ row }) => {
        const persona = row.original.empleado?.persona;
        return (
          <div>
            {persona
              ? `${persona.nombre} ${persona.apellido}`.trim()
              : "Sin asignar"}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const reparacion = row.original;
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
              <DropdownMenuItem asChild>
                <ModalFormTemplate
                  title="Detalles de Reparación"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  contentClassName="max-w-8xl h-auto max-w-4xl max-h-[90vh] overflow-y-auto"
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <DetalleReparacionModal
                    idReparacion={reparacion.idReparacion}
                    cliente={reparacion.diagnostico.dispositivo.cliente.persona}
                    dispositivo={reparacion.diagnostico.dispositivo}
                    empleado={reparacion.empleado.persona}
                    fechaIngreso={reparacion.fechaIngreso}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {tienePermiso("Reparaciones", "Modificar Reparación") && (
                <DropdownMenuItem asChild>
                  <ModalFormTemplate
                    title="Editar Reparación"
                    description="Modifique los campos necesarios para actualizar la reparación."
                    label="Editar"
                    variant="ghost"
                    icon={Edit}
                    className="p-2 m-0 cursor-pointer w-full justify-start"
                  >
                    <ReparacionesCreateEdit
                      reparacion={reparacion}
                      refreshReparaciones={refetch}
                    />
                  </ModalFormTemplate>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ModalFormTemplate
                  title="Historial de Asignación"
                  label="Historial asignación"
                  variant="ghost"
                  icon={UserCheck}
                  contentClassName="max-w-4xl max-h-[90vh] overflow-y-auto"
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <HistorialAsignacionReparacionModal
                    idReparacion={reparacion.idReparacion}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {tienePermiso("Reparaciones", "Eliminar Reparación") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(reparacion, refetch)}
                >
                  Eliminar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
};
