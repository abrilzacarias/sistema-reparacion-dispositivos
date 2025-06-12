import ModalDeactivateItem from "@/components/molecules/DeleteConfirmButton";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, List, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PerfilCard from "../PerfilCard";

export const getColPerfiles = ({ refetch, modulos, funciones }) => [
  {
    accessorKey: "nombrePerfil",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("nombrePerfil")}</div>
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
      )
    }
  },
  {
    id: "funciones",
    header: "Funciones",
    cell: ({ row }) => {
      const modulos = row.getValue("modulos") || [];

      const funciones = modulos
        .flatMap((modulo) => modulo.funciones || [])
        .reduce((acc, func) => {
          const exists = acc.find(
            (f) => f.idfuncionSistema === func.idfuncionSistema
          );
          if (!exists) acc.push(func);
          return acc;
        }, []);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center w-auto justify-center gap-2 m-auto text-xs"
            >
              Funciones
              <span className="bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {funciones.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-auto">
            {funciones.length > 0 ? (
              funciones.map((funcion, index) => (
                <DropdownMenuItem key={index} className="text-xs">
                  {funcion.descripcionFuncionSistema}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled className="text-xs">
                Sin funciones
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const perfil = row.original
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              asChild
              className="w-full flex items-center justify-between"
            >
              <ModalFormTemplate
                title="Detalles del perfil"
                description="Información completa del perfil seleccionado"
                label="Ver detalles"
                variant="ghost"
                icon={List}
                className="p-2 m-0 cursor-pointer w-full justify-start"
              >
                <PerfilCard perfil={perfil} />
              </ModalFormTemplate>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                navigate("/perfiles/editar", {
                  state: {
                    perfil: row.original,
                    modulos,
                    funciones,
                  },
                })
              }
            >
              <Button
                type="button"
                variant="ghost"
                className="h-6 w-8 p-0 cursor-pointer justify-start"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
            </DropdownMenuItem>

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
                  endpoint="permisos-perfil"
                  id={perfil.idPerfil}
                  refetch={refetch}
                />
              </ModalFormTemplate>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
