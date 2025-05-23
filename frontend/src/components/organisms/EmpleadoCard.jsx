import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Calendar } from "lucide-react"

const EmpleadoCard = ({ empleado }) => {
  if (!empleado) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No hay información del empleado disponible</p>
        </CardContent>
      </Card>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No especificado"
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">
              {empleado?.persona?.nombre} {empleado?.persona?.apellido} | {empleado?.persona?.cuit}
            </CardTitle>
            <p className="text-muted-foreground">{empleado?.puesto?.nombrepuestoLaboral || "Puesto no especificado"}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Estado Laboral */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Estado:</span>
          <Badge variant={empleado?.estadoLaboral === "Activo" ? "default" : "secondary"}>
            {empleado?.estadoLaboral || "No especificado"}
          </Badge>
        </div>

        <Separator />

        {/* Información de fechas */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Fecha de contratación</p>
              <p className="text-sm text-muted-foreground">{formatDate(empleado?.fechaContratacion)}</p>
            </div>
          </div>

          {empleado?.fechaFinalizacion && (
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Fecha de finalización</p>
                <p className="text-sm text-muted-foreground">{formatDate(empleado?.fechaFinalizacion)}</p>
              </div>
            </div>
          )}
        </div>

        {/* TODO agregar contactos y reparaciones */}
        {empleado?.persona && (
          <div className="space-y-2">
            <Separator />
            <h4 className="text-sm font-medium">Información personal</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {empleado.usuario.email && (
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium">{empleado.usuario.email}</p>
                </div>
              )}
              {empleado.persona.telefono && (
                <div>
                  <span className="text-muted-foreground">Teléfono:</span>
                  <p className="font-medium">{empleado.persona.telefono}</p>
                </div>
              )}
              {empleado.persona.direccion && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Dirección:</span>
                  <p className="font-medium">{empleado.persona.direccion}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EmpleadoCard
