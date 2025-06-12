"use client"

import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, History, Search } from "lucide-react"
import { DataTable } from "@/components/datatable/DataTable"
import { getColumnsHistorialReparacionCliente } from "./columns/getColumnsHistorialReparacionCliente"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const HistorialReparacionClienteModal = ({ idPersona, nombre, apellido, cuit }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: historial,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    total,
    isFetching,
  } = usePaginatedQuery({
    key: ["historial-reparacion-cliente", idPersona],
    endpoint: `clientes/${idPersona}/reparaciones`,
    pageSize: 10,
  })

  const historialConDispositivo =
    historial?.map((item) => ({
      ...item,
      dispositivo: item.diagnostico?.dispositivo?.descripcionDispositivo ?? null,
    })) ?? []

  // Obtener las iniciales del cliente para el avatar
  const getInitials = () => {
    const firstInitial = nombre ? nombre.charAt(0) : "?"
    const lastInitial = apellido ? apellido.charAt(0) : ""
    return `${firstInitial}${lastInitial}`
  }

  // Calcular estadísticas básicas
  const totalReparaciones = total || historialConDispositivo.length
  const reparacionesCompletadas = historialConDispositivo.filter(
    (item) => item.registroEstadoReparacion?.[0]?.estadoReparacion?.descripcionEstadoReparacion === "Entregado",
  ).length

  return (
    <Card className="mt-4 bg-background border shadow-sm">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 bg-primary/10 text-primary">
              <AvatarFallback className="text-lg font-medium">{getInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">
                {nombre} {apellido}
                <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                  {cuit}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Historial de reparaciones</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md">
              <History className="w-4 h-4" />
              <div>
                <span className="text-xs block">Total reparaciones</span>
                <span className="font-semibold">{totalReparaciones}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-md">
              <ClipboardList className="w-4 h-4" />
              <div>
                <span className="text-xs block">Entregadas</span>
                <span className="font-semibold">{reparacionesCompletadas}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>

        <DataTable
          data={historialConDispositivo.filter(
            (item) =>
              !searchQuery || (item.dispositivo && item.dispositivo.toLowerCase().includes(searchQuery.toLowerCase())),
          )}
          columns={getColumnsHistorialReparacionCliente()}
          isLoading={isLoading}
          refetch={refetch}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          totalUsers={total}
          searchTarget="dispositivo"
        />
      </CardContent>
    </Card>
  )
}

export default HistorialReparacionClienteModal

