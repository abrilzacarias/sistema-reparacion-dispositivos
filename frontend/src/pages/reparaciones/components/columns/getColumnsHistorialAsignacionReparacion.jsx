import { Calendar, UserCheck } from "lucide-react";

export const getColumnsHistorialAsignacion = () => {
  return [
    {
      header: "Fecha de Asignación",
      id: "fechaAsignacion",
      accessorFn: row => row.fechaInicioAsignacionReparacion,
      cell: ({ row }) => {
        const fecha = row.original.fechaInicioAsignacionReparacion;
        if (!fecha) return <div>-</div>;
        const [a, m, d] = fecha.split("-");
        return <div>{`${d}/${m}/${a}`}</div>;
      }
      },
    {
      header: "Empleado Asignado",
      id: "empleadoAsignado",
      accessorFn: row => {
        const persona = row.empleado?.persona;
        return persona ? `${persona.nombre ?? ""} ${persona.apellido ?? ""}`.trim() : "Sin asignar";
      },
      cell: ({ row }) => {
        const persona = row.original.empleado?.persona;

        if (!persona) {
          return (
            <span className="text-left text-muted-foreground italic">Sin asignar</span>
          );
        }

        const fullName = `${persona.nombre} ${persona.apellido}`.trim();

        return (
          <div className="flex items-center gap-2 text-left">
            <UserCheck className="w-4 h-4 text-muted-foreground" />
            <span>{fullName}</span>
          </div>
        );
      },
    },
  ];
};




