import { Edit, Ellipsis } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import { Button } from "@/components/ui/button"
import TipoRepuestoCreateEdit from "../TipoRepuestoCreateEdit"
import axios from "axios"
import { toast } from "sonner"

const API_URL = import.meta.env.VITE_API_URL

export const getColumnsTiposRepuesto = ({ refetch }) => {
  const handleDelete = (id, descripcion) => {
  toast(
    `¿Eliminar el tipo de repuesto "${descripcion}"?`,
    {
      action: {
        label: "Eliminar",
        onClick: async (e) => {
          e?.stopPropagation(); // 👈 clave: evitar que el clic se propague y cierre modales/dropdowns
          try {
            await axios.delete(`${API_URL}/tipos-repuesto/${id}/`);
            toast.success("Tipo de repuesto eliminado con éxito");
            refetch?.();
          } catch (err) {
            console.error("Error al eliminar tipo de repuesto:", err);
            if (err.response?.status === 400 && err.response.data?.detail) {
              toast.error(err.response.data.detail);
            } else {
              toast.error("Error al eliminar. Intente nuevamente.");
            }
          }
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: (e) => e?.stopPropagation(), // 👈 también cancelación limpia
      },
      duration: 10000,
    }
  );
};




  return [
    {
      header: "Descripción",
      accessorKey: "descripcionTipoRepuesto",
      cell: ({ row }) => (
        <div className="ml-4">{row.original.descripcionTipoRepuesto}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const tipoRepuesto = row.original

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
                  title="Editar tipo de repuesto"
                  description="Modifica la descripción del tipo de repuesto."
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <TipoRepuestoCreateEdit
                    tipoRepuesto={tipoRepuesto}
                    refreshTiposRepuesto={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  handleDelete(tipoRepuesto.idTipoRepuesto, tipoRepuesto.descripcionTipoRepuesto)
                }
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}

