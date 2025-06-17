import ModalDeactivateItem from "@/components/molecules/DeleteConfirmButton";
import { Ellipsis, List, Trash2, Edit, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import EmpleadoCard from "@/components/organisms/EmpleadoCard"
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PersonaCreateEdit from "@/components/organisms/PersonaCreateEdit"
import EmpleadoCreateEdit from "@/pages/empleado/components/EmpleadoCreateEdit"
import { useState } from "react";
import { tienePermiso } from "@/utils/permisos";
import { toast } from "sonner";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getColEmpleados = ({ refetch }) => {
  
  const handleDelete = async (empleado) => {
    toast("¿Seguro que querés eliminar este empleado?", {
      description: `${empleado.persona?.nombre} ${empleado.persona?.apellido} - ${empleado.puesto?.nombrepuestoLaboral}`,
      duration: 10000, // 10 segundos para dar tiempo a decidir
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            // Toast de loading mientras se elimina
            const loadingToast = toast.loading("Eliminando empleado...");
            
            await axios.delete(`${API_URL}/empleados/${empleado.idEmpleado}`);
            
            // Dismiss del loading toast
            toast.dismiss(loadingToast);
            
            // Toast de éxito
            toast.success("Empleado eliminado con éxito", {
              description: `${empleado.persona?.nombre} ${empleado.persona?.apellido} ha sido eliminado`
            });
            
            refetch?.();
          } catch (error) {
            console.error("Error eliminando empleado:", error);
            
            // Toast de error con más detalles
            toast.error("Error al eliminar empleado", {
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

  return [
    {
      header: "Nombre",
      accessorKey: "persona.nombre",
      id: "persona.nombre",
      cell: ({ row }) => <div className="ml-10">{row.original?.persona?.nombre}</div>,
    },
    {
      header: "Apellido",
      accessorKey: "persona.apellido",
      id: "persona.apellido",
      cell: ({ row }) => <div>{row.original?.persona?.apellido}</div>,
    },
    {
      header: "Puesto",
      accessorKey: "puesto.nombrepuestoLaboral",
      id: "puesto.nombrepuestoLaboral",
      cell: ({ row }) => <div>{row.original?.puesto?.nombrepuestoLaboral}</div>,
    },
    {
      header: "Contratación",
      accessorKey: "fechaContratacion",
      cell: ({ row }) => <div>{new Date(row.original?.fechaContratacion).toLocaleDateString()}</div>,
    },
    {
      header: "Finalización",
      accessorKey: "fechaFinalizacion",
      cell: ({ row }) =>
        row.original.fechaFinalizacion ? (
          <div>{new Date(row.original?.fechaFinalizacion).toLocaleDateString()}</div>
        ) : (
          <div className="text-muted-foreground italic">Activo</div>
        ),
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const [activeTab, setActiveTab] = useState("persona");
        const empleado = row.original

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
                  title="Detalles del empleado"
                  description="Información completa del empleado seleccionado"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <EmpleadoCard empleado={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>

              {tienePermiso("Empleados", "Modificar Empleado") && (
              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Editar Empleado"
                  description="Modifique los datos del empleado seleccionado"
                  label="Editar"
                  variant="ghost"
                  icon={Edit}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <Tabs
                    defaultValue="persona"
                    className="mt-4"
                    onValueChange={setActiveTab}
                    value={activeTab}
                  >
                    <TabsList className="w-full">
                      <TabsTrigger
                        value="persona"
                        className="w-1/2 rounded-md rounded-r-none"
                      >
                        Datos de Persona
                      </TabsTrigger>
                      <TabsTrigger
                        value="empleado"
                        className="w-1/2 rounded-md rounded-l-none"
                      >
                        Datos de Empleado
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="persona">
                      <PersonaCreateEdit
                        persona={row.original.persona}
                        refreshPersonas={refetch}
                        setActiveTab={setActiveTab}
                      />
                    </TabsContent>

                    <TabsContent value="empleado">
                      <EmpleadoCreateEdit 
                        empleado={row.original}
                        refreshEmpleados={refetch}
                        idPersona={row.original.persona.idPersona}
                        personaEmail={
                          row.original.persona.contactos?.find(
                            c => c.tipoContacto.descripcionTipoContacto.toLowerCase() === "correo" && c.esPrimario
                          )?.descripcionContacto
                        }
                      />
                    </TabsContent>
                  </Tabs>
                </ModalFormTemplate>
              </DropdownMenuItem>
)}
              {tienePermiso("Empleados", "Eliminar Empleado") && (
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
                  endpoint="empleados"
                  id={empleado.idEmpleado}
                  refetch={refetch}
                />
              </ModalFormTemplate>
            </DropdownMenuItem>
                
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}
