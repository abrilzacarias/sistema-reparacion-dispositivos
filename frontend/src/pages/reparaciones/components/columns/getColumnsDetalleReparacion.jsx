import { Edit, Ellipsis } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import DetalleReparacionCreateEdit from "../DetalleReparacionCreateEdit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const getColumnsDetalleReparacion = ({ refetch }) => {
  
  const handleDelete = async (detalle, refetch) => {
    if (!window.confirm(`¿Seguro que querés eliminar este detalle?`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/detalleReparacion/${detalle.idDetalleReparacion}`);
      toast.success("Detalle eliminado con éxito");
      refetch?.();
    } catch (error) {
      console.error("Error eliminando detalle:", error);
      toast.error("Error al eliminar. Intente nuevamente.");
    }
  };

  return [
    {
      header: "Descripción",
      accessorKey: "descripcion",
      size: 180,
      cell: ({ row }) => {
        const value = row.original.descripcion;
        return (
          <div className="max-w-[160px] truncate font-medium ml-2" title={value}>
            {value || "Sin descripción"}
          </div>
        );
      },
    },
    {
      header: "M. Obra",
      accessorKey: "manoObra",
      size: 100,
      cell: ({ row }) => {
        const value = row.original.manoObra;
        return (
          <div className="text-right text-sm font-medium">
            {value ? `$${Number(value).toLocaleString()}` : "$0"}
          </div>
        );
      },
    },
    {
      header: "Repuesto",
      accessorKey: "precioRepuesto",
      size: 100,
      cell: ({ row }) => {
        const value = row.original.precioRepuesto;
        return (
          <div className="text-right text-sm font-medium">
            {value ? `$${Number(value).toLocaleString()}` : "$0"}
          </div>
        );
      },
    },
    {
      header: "Total",
      accessorKey: "montoTotalDetalleReparacion",
      size: 100,
      cell: ({ row }) => {
        const value = row.original.montoTotalDetalleReparacion;
        return (
          <div className="text-right font-semibold text-sm text-green-700 dark:text-green-400">
            {value ? `$${Number(value).toLocaleString()}` : "$0"}
          </div>
        );
      },
    },
    {
      header: "Repuesto",
      accessorFn: (row) => row.repuesto?.nombreRepuesto || "Sin repuesto",
      id: "repuesto",
      size: 120,
      cell: ({ row }) => {
        const value = row.original.repuesto?.nombreRepuesto || "Sin repuesto";
        return (
          <div className="max-w-[100px] truncate text-sm" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      header: "Tipo",
      accessorFn: (row) => row.tipoReparacion?.descripcionTipoReparacion || "Sin tipo",
      id: "tipoReparacion",
      size: 100,
      cell: ({ row }) => {
        const value = row.original.tipoReparacion?.descripcionTipoReparacion || "Sin tipo";
        return (
          <div className="max-w-[90px] truncate text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-md" title={value}>
            {value}
          </div>
        );
      },
    },
    {
      id: "actions",
      size: 50,
      cell: ({ row }) => {
        const detalle = row.original;

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
                  title="Editar Detalle de Reparación"
                  description="Modifique los campos para actualizar el detalle."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <DetalleReparacionCreateEdit
                    detalle={detalle}
                    idReparacion={detalle.idReparacion}
                    refreshDetalles={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => handleDelete(detalle, refetch)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
