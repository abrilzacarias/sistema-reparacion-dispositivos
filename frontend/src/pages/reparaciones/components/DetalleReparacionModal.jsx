"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Smartphone, UserCheck, Calendar } from "lucide-react"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"
import { DataTable } from "@/components/datatable/DataTable"
import DetalleReparacionCreateEdit from "./DetalleReparacionCreateEdit"
import { getColumnsDetalleReparacion } from "./columns/getColumnsDetalleReparacion"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"

const DetalleReparacionModal = ({ idReparacion, cliente, dispositivo, empleado, fechaIngreso }) => {
  const {
    data: detalles,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    total,
    isFetching,
  } = usePaginatedQuery({
    key: ["detalles-reparacion", idReparacion],
    endpoint: `detalleReparacion/reparacion/${idReparacion}`,
    pageSize: 50,
  })

  // Calcular totales con useMemo para optimizar
  const { totalManoObra, totalRepuestos, totalGeneral } = useMemo(() => {
    if (!detalles || detalles.length === 0) return { totalManoObra: 0, totalRepuestos: 0, totalGeneral: 0 }

    return detalles.reduce(
      (acc, item) => {
        acc.totalManoObra += Number(item.manoObra) || 0
        acc.totalRepuestos += Number(item.precioRepuesto) || 0
        acc.totalGeneral += Number(item.montoTotalDetalleReparacion) || 0
        return acc
      },
      { totalManoObra: 0, totalRepuestos: 0, totalGeneral: 0 },
    )
  }, [detalles])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Reparación #{idReparacion}</h3>
        <ModalFormTemplate
          title="Agregar Detalle de Reparación"
          description="Complete los campos para agregar un nuevo detalle."
          label="Agregar detalle"
          variant="default"
          className="cursor-pointer justify-start"
        >
          <DetalleReparacionCreateEdit idReparacion={idReparacion} refreshDetalles={refetch} />
        </ModalFormTemplate>
      </div>

      {/* Información compacta y elegante */}
      <Card className="mb-4 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <div>
                <span className="text-muted-foreground">Cliente:</span>
                <span className="ml-1 font-medium">
                  {cliente.nombre} {cliente.apellido}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-500" />
              <div>
                <span className="text-muted-foreground">Técnico:</span>
                <span className="ml-1 font-medium">
                  {empleado.nombre} {empleado.apellido}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-orange-500" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Dispositivo:</span>
                <span className="font-medium">{dispositivo.descripcionDispositivo}</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {dispositivo.tipoDispositivo.nombreTipoDispositivo}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <div>
                <span className="text-muted-foreground">Ingreso:</span>
                <span className="ml-1 font-medium">{new Date(fechaIngreso).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isError && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300 text-sm">
          Error al cargar los detalles de reparación.
        </div>
      )}

      <Card className="mt-4 border-none bg-secondary dark:bg-background">
        <CardContent className="p-0" style={{ maxHeight: 400, overflowY: "auto" }}>
          <DataTable
            data={detalles ?? []}
            columns={getColumnsDetalleReparacion({ refetch })}
            refetch={refetch}
            isLoading={isLoading}
            isFetching={isFetching}
            totalUsers={total}
            showPagination={hasNextPage}
            onLoadMore={hasNextPage ? fetchNextPage : undefined}
            searchTarget="descripcion"
          />
        </CardContent>
      </Card>

      <Card className="bg-muted/30 mt-4">
        <CardContent className="p-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">M. Obra</p>
              <p className="font-semibold text-sm text-blue-600">${totalManoObra.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Repuestos</p>
              <p className="font-semibold text-sm text-orange-600">${totalRepuestos.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-bold text-sm text-green-600">${totalGeneral.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetalleReparacionModal





