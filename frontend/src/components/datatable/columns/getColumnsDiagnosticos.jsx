import { useState } from "react";
import { Edit, Ellipsis, List, UserCheck, Wrench  } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import DiagnosticoCard from "@/components/organisms/DiagnosticoCard";
import { Button } from "@/components/ui/button";
import HistorialAsignacionDiagnosticoModal from "@/pages/diagnostico/components/HistorialAsignacionDiagnosticoModal";
import DiagnosticoCreateEdit from "@/pages/diagnostico/DiagnosticoCreateEdit";
import ReparacionesCreateEdit from "@/pages/reparaciones/components/ReparacionesCreateEdit";

//NO SE SI DISPOSITIVO SE TIENE QUE MANDAR COMO OCULTO
export const getColumnsDiagnosticos = ({ refetch }) => {
  return [
    {
      header: "Fecha",
      accessorKey: "fechaDiagnostico",
      cell: ({ row }) => (
        <div>{new Date(row.original.fechaDiagnostico).toLocaleDateString()}</div>
      ),
    },
    {
      header: "Tipo de Dispositivo",
      accessorKey: "dispositivo.tipoDispositivo.nombreTipoDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.tipoDispositivo?.nombreTipoDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Modelo",
      accessorKey: "dispositivo.modeloDispositivo.descripcionModeloDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.modeloDispositivo?.descripcionModeloDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Marca",
      accessorKey: "dispositivo.modeloDispositivo.marcaDispositivo.descripcionMarcaDispositivo",
      cell: ({ row }) => (
        <div>
          {row.original.dispositivo?.modeloDispositivo?.marcaDispositivo?.descripcionMarcaDispositivo || "N/A"}
        </div>
      ),
    },
    {
      header: "Cliente",
      accessorKey: "dispositivo.cliente.persona",
      cell: ({ row }) => {
        const persona = row.original.dispositivo?.cliente?.persona;
        return <div>{persona ? `${persona.nombre} ${persona.apellido}` : "N/A"}</div>;
      },
    },
    {
      header: "Preguntas",
      accessorKey: "detallesDiagnostico",
      cell: ({ row }) => {
        const detalles = row.original.detalleDiagnostico || [];

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center w-auto justify-center gap-2 m-auto text-xs"
              >
                Preguntas
                <span className="bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {detalles.length}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-64 overflow-auto">
              {detalles.length > 0 ? (
                detalles.map((detalle, index) => (
                  <DropdownMenuItem key={index} className="flex flex-col items-start gap-1 text-xs">
                    <span className="font-medium">
                      {detalle.tipoDispositivoSegunPregunta?.preguntaDiagnostico?.descripcionPreguntaDiagnostico || "Pregunta desconocida"}
                    </span>
                    {(() => {
                        const valor = detalle.valorDiagnostico;
                        let respuestaFormateada = valor;

                        if (valor === "true") respuestaFormateada = "Sí";
                        else if (valor === "false") respuestaFormateada = "No";

                        return (
                          <span className="text-muted-foreground">
                            Respuesta: {respuestaFormateada}
                          </span>
                        );
                      })()}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled className="text-xs">
                  Sin preguntas
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      header: "Técnico",
      accessorKey: "empleado.persona",
      cell: ({ row }) => {
        const persona = row.original.empleado?.persona;
        return <div>{persona ? `${persona.nombre} ${persona.apellido}` : "N/A"}</div>;
      },
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
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
            <DropdownMenuContent align="end" className="w-46">
              <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                <ModalFormTemplate
                  title="Detalles del diagnóstico"
                  description="Información completa del diagnóstico"
                  label="Ver detalles"
                  variant="ghost"
                  icon={List}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                  contentClassName="max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                  <DiagnosticoCard diagnostico={row.original} />
                </ModalFormTemplate>
              </DropdownMenuItem>
                {/* Editar diagnóstico */}
                <DropdownMenuItem asChild className="w-full flex items-center justify-between">
                  <ModalFormTemplate
                    title="Editar diagnóstico"
                    description="Modifique los datos del diagnóstico"
                    label="Editar"
                    variant="ghost"
                    icon={Edit}
                    className="p-2 m-0 cursor-pointer w-full justify-start"
                    contentClassName="max-w-4xl max-h-[90vh] overflow-y-auto"
                  >
                    <DiagnosticoCreateEdit
                      diagnostico={row.original}
                      refreshDiagnosticos={refetch}
                    />
                  </ModalFormTemplate>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ModalFormTemplate
                  title="Historial de Asignación"
                  label="Historial asignación"
                  variant="ghost"
                  icon={UserCheck}
                  contentClassName="max-w-4xl max-h-[90vh] overflow-y-auto"
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                <HistorialAsignacionDiagnosticoModal
                  idDiagnostico={row.original.idDiagnostico}
                />
                </ModalFormTemplate>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ModalFormTemplate
                  title="Crear Reparación"
                  description="Complete los datos para crear una reparación"
                  label="Crear Reparación"
                  variant="ghost"
                  icon={Wrench}
                  className="p-2 m-0 cursor-pointer w-full justify-start"
                >
                  <ReparacionesCreateEdit
                    idDiagnostico={row.original.idDiagnostico}
                    refreshReparaciones={refetch}
                  />
                </ModalFormTemplate>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40,
    },
  ];
};