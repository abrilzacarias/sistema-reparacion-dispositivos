import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { tipoToNotificationType } from '@/lib/utils';

const notificationTypeConfig = {
  info: {
    icon: Info,
    className: "text-info",
  },
  success: {
    icon: CheckCircle,
    className: "text-success",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-warning",
  },
  error: {
    icon: AlertCircle,
    className: "text-destructive",
  },
};

export const getColumnsNotifications = () => [
  {
    id: "tipo",
    header: "Tipo",
    accessorKey: "tipo",  // <-- Aquí "tipo" no "type"
    cell: ({ row }) => {
      const tipo = row.original.tipo;
      // Ojo que la configuración espera claves como 'info', 'success' etc. Si tus tipos son diferentes,
      // podrías mapearlos o usar un default.
      const notiType = tipoToNotificationType(tipo);
      const config = notificationTypeConfig[notiType] || notificationTypeConfig.info;
      const IconComponent = config.icon;
      return (
        <div className="flex justify-center">
          <IconComponent className={cn("w-5 h-5", config.className)} />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "w-[80px] text-center",
    },
  },
  {
    id: "mensaje",
    header: "Mensaje",
    accessorKey: "mensaje",
    cell: ({ row }) => (
      <div className="flex justify-center">{row.original.mensaje}</div>
    ),
    meta: {
      className: "text-center",
    },
  },
  {
    id: "fecha",
    header: "Fecha",
    accessorKey: "fecha",
      cell: ({ row }) => {
        const rawDate = row.original.fecha; // por ejemplo: "2025-06-19"
        const [year, month, day] = rawDate.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        return <div className="flex justify-center">{formattedDate}</div>;
      },
    meta: {
      className: "text-center w-[180px]",
    },
  },
];
