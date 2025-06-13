import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal } from "lucide-react"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
// import MarcaEdit from "./MarcaEdit" // descomentar cuando tengas el componente

export const getColMarcas = ({ refetch }) => [
  {
    accessorKey: "descripcionMarcaDispositivo",
    header: "Nombre de Marca",
    cell: ({ row }) => <div className="font-medium">{row.getValue("descripcionMarcaDispositivo")}</div>,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const marca = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="w-full flex items-center justify-between">
              <ModalFormTemplate
                title="Editar Marca"
                description="Modifica el nombre de la marca."
                label="Editar"
                variant="ghost"
                icon={Edit}
                className="p-2 m-0 cursor-pointer w-full justify-start"
                contentClassName="sm:max-w-[500px]"
              >
                {/* <MarcaEdit marca={marca} refreshMarcas={refetch} /> */}
              </ModalFormTemplate>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
