import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getColDispositivos = ({ refetch }) => [
  {
    accessorKey: 'nombreTipoDispositivo',
    header: 'Tipo de Dispositivo',
    cell: ({ row }) => {
      console.log("Fila completa:", row.original);
      return (
        <div className="font-medium">
          {row.original.tipoDispositivo?.nombreTipoDispositivo || "-"}
        </div>
      );
    },
  },
{
  header: "Preguntas del Dispositivo",
  accessorKey: "preguntas",
  cell: ({ row }) => {
    const preguntas = row.original.preguntas;
    return (
      <ul className="list-disc pl-5">
        {preguntas.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    );
  }
}
/*
{
  id: "actions",
  header: "Acciones",
  cell: ({ row }) => {
    const perfil = row.original;
    const navigate = useNavigate();

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
                state: { perfil: row.original, modulos, funciones },
              })
            }
          >
            <Button type="button" variant="ghost" className="h-6 w-8 p-0 cursor-pointer justify-start">
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
    );
  },
}
*/

];
