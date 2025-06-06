import { AlertCircle, CheckCircle, Info, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    id: "type",
    header: "Tipo",
    accessorKey: "type",
    cell: ({ row }) => {
      const type = row.original.type;
      const config = notificationTypeConfig[type] || notificationTypeConfig.info;
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
    id: "message",
    header: "Mensaje",
    accessorKey: "message",
    cell: ({ row }) => <div className="text-left">{row.original.message}</div>,
    meta: {
      className: "text-left",
    },
  },
  {
    id: "actions",
    header: "Acción",
    cell: ({ row }) => {
      const { onClick } = row.original;
      if (!onClick) return null;
      return (
        <Button variant="ghost" size="sm" onClick={onClick} className="text-primary hover:text-primary/90">
          Ver <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      );
    },
    enableSorting: false,
    meta: {
      className: "w-[100px] text-center",
    },
  },
];
