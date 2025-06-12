import { Calendar, Settings, Wrench, User } from "lucide-react";

export const getColumnsHistorialReparacionCliente = () => {
  return [
    {
      header: "Fecha de Ingreso",
      id: "fechaIngreso",
      accessorFn: row => row.fechaIngreso,
      cell: ({ row }) => {
        const fecha = new Date(row.original.fechaIngreso);
        return (
          <div className="flex items-center gap-2 text-left">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{fecha.toLocaleDateString()}</span>
          </div>
        );
      },
    },
    {
      header: "Dispositivo",
      id: "dispositivo",
      accessorFn: row => row.dispositivo ?? "Equipo no registrado",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-left">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span>{row.original.diagnostico?.dispositivo?.descripcionDispositivo ?? "Equipo no registrado"}</span>
        </div>
      ),
    },
    {
      header: "Estado",
      id: "estado",
      accessorFn: row => row.original?.registroEstadoReparacion?.[0]?.estadoReparacion?.descripcionEstadoReparacion ?? "Desconocido",
      cell: ({ row }) => {
        const estado = row.original?.registroEstadoReparacion?.[0]?.estadoReparacion?.descripcionEstadoReparacion ?? "Desconocido";
        return (
          <div className="flex items-center gap-2 text-left">
            <Wrench className="w-4 h-4 text-muted-foreground" />
            <span>{estado}</span>
          </div>
        );
      },
    },
    {
      header: "Empleado asignado",
      id: "empleado",
      accessorFn: row => row.original?.empleado?.persona?.nombre ?? "Desconocido",
      cell: ({ row }) => {
        const empleadoNombre = row.original?.empleado?.persona?.nombre ?? "Desconocido";
        const empleadoApellido = row.original?.empleado?.persona?.apellido
        return (
          <div className="flex items-center gap-2 text-left">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>{empleadoNombre} {empleadoApellido}</span>
          </div>
        );
      },
    },
  ];
};
