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
