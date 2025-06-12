import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getColFunciones = ({ refetch }) => [
  {
    accessorKey: "descripcionFuncionSistema",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("descripcionFuncionSistema")}
      </div>
    ),
  },
  {
    accessorKey: "modulos",
    header: "Módulos",
    cell: ({ row }) => {
      const modulos = row.getValue("modulos") || [];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center w-auto justify-center gap-2 m-auto text-xs"
            >
              Módulos
              <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {modulos.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {modulos.map((modulo, index) => (
              <DropdownMenuItem key={index} className="text-xs">
                {modulo.descripcionModuloSistema}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
