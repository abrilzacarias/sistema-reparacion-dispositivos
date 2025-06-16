import { Edit, Ellipsis, List, UserCheck, Trash2 } from "lucide-react";
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
import HistorialAsignacionReparacionModal from "@/pages/reparaciones/components/HistorialAsignacionReparacionModal";
import { tienePermiso } from "@/utils/permisos";

const API_URL = import.meta.env.VITE_API_URL;

// Función para formatear fechas (sin conversión de zona horaria)
const formatearFecha = (fechaISO) => {
  if (!fechaISO) return "-";
  
  // Remover la Z o información de zona horaria para tratarla como local
  const fechaLocal = fechaISO.replace('Z', '').replace(/[+-]\d{2}:\d{2}$/, '');
  const fecha = new Date(fechaLocal);
  
  // Verificar si la fecha es válida
  if (isNaN(fecha.getTime())) return "-";
  
  // Formatear fecha en formato DD/MM/YYYY
  return fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Función para formatear fecha y hora (sin conversión de zona horaria)
const formatearFechaHora = (fechaISO) => {
  if (!fechaISO) return "-";
  
  // Remover la Z o información de zona horaria para tratarla como local
  const fechaLocal = fechaISO.replace('Z', '').replace(/[+-]\d{2}:\d{2}$/, '');
  const fecha = new Date(fechaLocal);
  
  // Verificar si la fecha es válida
  if (isNaN(fecha.getTime())) return "-";
  
  // Formatear fecha y hora en formato DD/MM/YYYY HH:mm
  return fecha.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Para formato 24 horas
  });
};

// Función para obtener el color y estilo del estado
const getEstadoBadgeStyle = (estado) => {
  const estadoLower = estado?.toLowerCase() || '';
  
  switch (estadoLower) {
    case 'presupuestado':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/20',
        text: 'text-blue-800 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-800',
        dot: 'bg-blue-500'
      };
    case 'pendiente':
      return {
        bg: 'bg-yellow-100 dark:bg-yellow-900/20',
        text: 'text-yellow-800 dark:text-yellow-300',
        border: 'border-yellow-200 dark:border-yellow-800',
        dot: 'bg-yellow-500'
      };
    case 'en curso':
      return {
        bg: 'bg-orange-100 dark:bg-orange-900/20',
        text: 'text-orange-800 dark:text-orange-300',
        border: 'border-orange-200 dark:border-orange-800',
        dot: 'bg-orange-500'
      };
    case 'finalizado':
      return {
        bg: 'bg-green-100 dark:bg-green-900/20',
        text: 'text-green-800 dark:text-green-300',
        border: 'border-green-200 dark:border-green-800',
        dot: 'bg-green-500'
      };
    case 'cancelado':
      return {
        bg: 'bg-red-100 dark:bg-red-900/20',
        text: 'text-red-800 dark:text-red-300',
        border: 'border-red-200 dark:border-red-800',
        dot: 'bg-red-500'
      };
    default:
      return {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-800 dark:text-gray-300',
        border: 'border-gray-200 dark:border-gray-700',
        dot: 'bg-gray-500'
      };
  }
};

// Componente Badge para el estado
const EstadoBadge = ({ estado }) => {
  const style = getEstadoBadgeStyle(estado);
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
      <div className={`w-2 h-2 rounded-full ${style.dot}`}></div>
      {estado || 'Sin estado'}
    </div>
  );
};

// Código corregido completo para las columnas de reparaciones

export const getColumnsReparaciones = ({ refetch }) => {
  const handleDelete = async (reparacion, refetch) => {
    let isConfirmed = false;
    
    const confirmToast = toast(
      <div className="flex flex-col gap-2">
        <div className="font-medium">¿Eliminar reparación?</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Reparación N° {reparacion.idReparacion}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              isConfirmed = true;
              toast.dismiss(confirmToast);
              executeDelete();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              toast.dismiss(confirmToast);
              toast.info("Eliminación cancelada");
            }}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        duration: Infinity,
      }
    );

    const executeDelete = async () => {
      const loadingToast = toast.loading("Eliminando reparación...");
      
      try {
        const res = await axios.delete(
          `${API_URL}/reparaciones/${reparacion.idReparacion}`
        );
        toast.dismiss(loadingToast);
        toast.success("Reparación eliminada con éxito");
        refetch?.();
      } catch (error) {
        toast.dismiss(loadingToast);
        console.error("Error eliminando reparación:", error);
        const errorMsg =
          error.response?.data?.detail ||
          "No se puede eliminar una reparación con detalles.";
        toast.error(errorMsg);
      }
    };
  };

  return [
    {
      header: "N° Reparación",
      accessorKey: "idReparacion",
      cell: ({ row }) => (
        <div className="ml-4 font-medium">{row.original.idReparacion}</div>
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
          <div className="font-medium">
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
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formatearFechaHora(row.original.fechaIngreso)}
        </div>
      ),
    },
    {
      header: "Fecha Egreso",
      accessorKey: "fechaEgreso",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {formatearFechaHora(row.original.fechaEgreso)}
        </div>
      ),
    },
    {
      header: "Monto Total ($)",
      accessorKey: "montoTotalReparacion",
      cell: ({ row }) => {
        const monto = row.original.montoTotalReparacion;
        return (
          <div className="font-medium text-green-600 dark:text-green-400">
            {monto != null ? `$${parseFloat(monto).toFixed(2)}` : "$0.00"}
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
        let estadoTexto = "Sin estado";
        
        if (estados?.length) {
          const ultimoEstado = estados.reduce((prev, curr) =>
            new Date(prev.fechaHoraRegistroEstadoReparacion) >
            new Date(curr.fechaHoraRegistroEstadoReparacion)
              ? prev
              : curr
          );
          estadoTexto = ultimoEstado.estadoReparacion?.descripcionEstadoReparacion ?? "Sin estado";
        }
        
        return <EstadoBadge estado={estadoTexto} />;
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

        // Si no hay empleado o persona, mostrar "Sin asignar"
        if (!row.original.empleado || !persona) {
          return (
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400 italic">Sin asignar</span>
            </div>
          );
        }

        const nombre = persona?.nombre?.trim() ?? "";
        const apellido = persona?.apellido?.trim() ?? "";
        const iniciales = `${nombre.length > 0 ? nombre[0] : ""}${apellido.length > 0 ? apellido[0] : ""}`.toUpperCase();

        return (
          <div className="text-sm">
            {nombre || apellido ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                  {iniciales}
                </div>
                <span className="font-medium">
                  {`${nombre} ${apellido}`.trim()}
                </span>
              </div>
            ) : (
              <span className="text-gray-500 dark:text-gray-400 italic">Sin asignar</span>
            )}
          </div>
        );
      }
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
                    cliente={reparacion.diagnostico?.dispositivo?.cliente?.persona}
                    dispositivo={reparacion.diagnostico?.dispositivo}
                    empleado={reparacion.empleado?.persona}
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
                  className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  <Trash2 className="size-4 mr-2" />
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