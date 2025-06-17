import ModalDeactivateItem from "@/components/molecules/DeleteConfirmButton";
import { Edit, Ellipsis, List, Wrench, Trash2, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import ClienteCard from "@/components/organisms/ClienteCard";
import { Button } from "@/components/ui/button";
import ClienteCreateEdit from "@/pages/cliente/components/ClienteCreateEdit";
import HistorialReparacionClienteModal from "@/pages/cliente/components/HistorialReparacionClienteModal";

// 👇 NUEVA IMPORTACIÓN
import EditarClienteConTabs from "@/pages/cliente/components/EditarClienteConTabs";
import { tienePermiso } from "@/utils/permisos";
import { toast } from "sonner";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getColumnsCliente = ({ refetch, onEdit }) => {
  
  const handleDelete = async (cliente) => {
    toast("¿Seguro que querés eliminar este cliente?", {
      description: `${cliente.persona?.nombre} ${cliente.persona?.apellido}`,
      duration: 10000, // 10 segundos para dar tiempo a decidir
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            // Toast de loading mientras se elimina
            const loadingToast = toast.loading("Eliminando cliente...");
            
            await axios.delete(`${API_URL}/clientes/${cliente.idCliente}`);
            
            // Dismiss del loading toast
            toast.dismiss(loadingToast);
            
            // Toast de éxito
            toast.success("Cliente eliminado con éxito", {
              description: `${cliente.persona?.nombre} ${cliente.persona?.apellido} ha sido eliminado`
            });
            
            refetch?.();
          } catch (error) {
            console.error("Error eliminando cliente:", error);
            
            // Toast de error con más detalles
            toast.error("Error al eliminar cliente", {
              description: error.response?.data?.message || "Intente nuevamente más tarde",
              duration: 5000
            });
          }
        },
        style: {
          backgroundColor: '#ef4444',
          color: 'white'
        }
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {
          toast.info("Eliminación cancelada");
        }
      },
    });
  };

  // Función para manejar la actualización exitosa
  const handleClienteUpdated = (clienteActualizado) => {
    // Actualizar la tabla inmediatamente
    refetch?.();
    
    // Mostrar toast de éxito
    toast.success("Cliente actualizado con éxito", {
      description: `${clienteActualizado?.persona?.nombre} ${clienteActualizado?.persona?.apellido} ha sido actualizado`,
      duration: 4000
    });
  };

  return [
    {
      header: "Nombre",
      accessorKey: "persona.nombre",
      id: "persona.nombre",
      cell: ({ row }) => (
        <div className="ml-10">{row.original?.persona?.nombre}</div>
      ),
    },
    {
      id: "apellido",
      header: "Apellido",
      accessorFn: (row) => row.persona?.apellido || "Sin apellido",
    },
    {
      header: "CUIT",
      accessorFn: (row) => row.persona?.cuit,
      cell: ({ row }) => <div>{row.original?.persona?.cuit}</div>,
    },
    {
      header: "Fecha de nacimiento",
      accessorFn: (row) => row.persona?.fechaNacimiento,
      cell: ({ row }) => {
        const fechaNacimiento = row.original?.persona?.fechaNacimiento;
        return (
          <div>
            {fechaNacimiento || (
              <span className="italic text-muted-foreground">
                Sin fecha de nacimiento
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: "Email",
      accessorFn: (row) => {
        return row.persona?.contactos?.find((c) => c.idtipoContacto === 2)
          ?.descripcionContacto;
      },
      cell: ({ row }) => {
        const email = row.original?.persona?.contactos?.find(
          (c) => c.idtipoContacto === 2
        )?.descripcionContacto;
        return (
          <div>
            {email || (
              <span className="italic text-muted-foreground">Sin email</span>
            )}
          </div>
        );
      },
    },
    {
      header: "Teléfono",
      accessorFn: (row) => {
        return row.persona?.contactos?.find((c) => c.idtipoContacto === 3)
          ?.descripcionContacto;
      },
      cell: ({ row }) => {
        const tel = row.original?.persona?.contactos?.find(
          (c) => c.idtipoContacto === 3
        )?.descripcionContacto;
        return (
          <div>
            {tel || (
              <span className="italic text-muted-foreground">Sin teléfono</span>
            )}
          </div>
        );
      },
    },
    {
      header: "Observaciones",
      accessorFn: (row) => row.observaciones,
      cell: ({ row }) => {
        const obs = row.original?.observaciones;
        return (
          <div>
            {obs ? (
              obs.length > 30 ? (
                obs.slice(0, 30) + "..."
              ) : (
                obs
              )
            ) : (
              <span className="text-muted-foreground italic">
                Sin observaciones
              </span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const cliente = row.original
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
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                asChild
                className="w-full flex items-center justify-between"
              >
                <ModalFormTemplate
                  title="Detalles del Cliente"
                  description="Información completa del cliente seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <ClienteCard cliente={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                className="w-full flex items-center justify-between"
              >
                <ModalFormTemplate
                  title="Historial de Reparaciones"
                  description="Listado de todas las reparaciones asociadas al cliente."
                  label="Reparaciones"
                  variant="ghost"
                  icon={Wrench}
                  contentClassName="max-w-8xl h-auto max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                  <HistorialReparacionClienteModal
                    idPersona={row.original?.idPersona}
                    nombre={row.original?.persona?.nombre}
                    apellido={row.original?.persona?.apellido}
                    cuit={row.original?.persona?.cuit}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {tienePermiso("Clientes", "Modificar Cliente") && (
                <DropdownMenuItem asChild>
                  <ModalFormTemplate
                    title="Editar Cliente"
                    description="Editar datos de cliente y persona asociada."
                    label="Editar"
                    variant="ghost"
                    icon={Edit}
                    className="p-2 m-0 cursor-pointer w-full justify-start"
                    contentClassName="max-w-3xl max-h-[90vh] overflow-y-auto"
                  >
                    <EditarClienteConTabs
                      cliente={row.original}
                      refreshClientes={refetch}
                      onClienteUpdated={handleClienteUpdated}
                    />
                  </ModalFormTemplate>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              {tienePermiso("Clientes", "Eliminar Cliente") && (
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
                    endpoint="clientes"
                    id={cliente.idCliente}
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