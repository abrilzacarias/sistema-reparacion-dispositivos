import ModalDeactivateItem from "@/components/molecules/DeleteConfirmButton";
import { Edit, Ellipsis, List, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import RepuestoCard from "@/components/organisms/RepuestoCard";
import RepuestosCreateEdit from "@/pages/repuestos/components/RepuestosCreateEdit";
import { Button } from "@/components/ui/button";
import { tienePermiso } from "@/utils/permisos";

export const getColumnsRepuestos = ({ refetch }) => {
  return [
    {
      header: "Nombre",
      accessorKey: "nombreRepuesto",
      cell: ({ row }) => (
        <div className="ml-4">{row.original.nombreRepuesto}</div>
      ),
    },
    {
      header: "Tipo",
      accessorKey: "tipoRepuesto",
      cell: ({ row }) => <div>{row.original.tipo.descripcionTipoRepuesto}</div>,
    },
    {
      header: "Precio ($)",
      accessorKey: "precio",
      cell: ({ row }) => (
        <div>${parseFloat(row.original.precio).toFixed(2)}</div>
      ),
    },
    {
      header: "Cantidad",
      accessorKey: "cantidadRepuesto",
      cell: ({ row }) => <div>{row.original.cantidadRepuesto}</div>,
    },
    {
      header: "Stock Mínimo",
      accessorKey: "stockMinimo",
      cell: ({ row }) => {
        const cantidad = row.original.cantidadRepuesto;
        const stockMinimo = row.original.stockMinimo;
        
        // Si no hay stock mínimo definido
        if (!stockMinimo && stockMinimo !== 0) {
          return (
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
              No definido
            </span>
          );
        }
        
        // Calcular el estado del stock
        const porcentajeStock = (cantidad / stockMinimo) * 100;
        
        if (cantidad < stockMinimo) {
          return (
            <span className="text-xs text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 px-2 py-1 rounded-full font-medium">
              Stock bajo
            </span>
          );
        } else if (porcentajeStock <= 120) { // Entre 100% y 120% del stock mínimo
          return (
            <span className="text-xs text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30 px-2 py-1 rounded-full font-medium">
              Stock justo
            </span>
          );
        } else {
          return (
            <span className="text-xs text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 px-2 py-1 rounded-full font-medium">
              Stock óptimo
            </span>
          );
        }
      },
    },
    {
      header: "Marca",
      accessorKey: "marca.descripcionMarcaDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original?.marca?.descripcionMarcaDispositivo ?? "Sin marca"}
        </div>
      ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const repuesto = row.original
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
              <DropdownMenuItem
                asChild
                className="w-full flex items-center justify-between"
              >
                <ModalFormTemplate
                  title="Detalles del repuesto"
                  description="Información del repuesto seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <RepuestoCard repuesto={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {tienePermiso("Repuestos", "Modificar Repuesto") && (
                <DropdownMenuItem
                  asChild
                  className="w-full flex items-center justify-between"
                >
                  <ModalFormTemplate
                    title="Editar Repuesto"
                    description="Modifique los campos necesarios para actualizar el repuesto."
                    label="Editar"
                    variant="ghost"
                    icon={Edit}
                    className="p-2 m-0 cursor-pointer w-full justify-start"
                  >
                    <RepuestosCreateEdit
                      repuesto={row.original}
                      refreshRepuestos={refetch}
                    />
                  </ModalFormTemplate>
                </DropdownMenuItem>
              )}
              {tienePermiso("Repuestos", "Modificar Repuesto") && (
<DropdownMenuItem asChild>
              <ModalFormTemplate
                title="¿Estás completamente seguro?"
                description=" Esta acción no se puede deshacer."
                label="Eliminar"
                variant="ghost"
                icon={Trash}
                className="m-0 text-red-900 dark:text-red-500 cursor-pointer w-full p-2 justify-start"
              >
                <ModalDeactivateItem
                  endpoint="repuestos"
                  id={repuesto.idRepuesto}
                  refetch={refetch}
                />
              </ModalFormTemplate>
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