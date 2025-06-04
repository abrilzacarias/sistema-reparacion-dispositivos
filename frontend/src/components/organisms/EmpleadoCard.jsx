import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const EmpleadoCard = ({ empleado }) => {
  console.log("EmpleadoCard", empleado)
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

  const estadoColor = {
    Activo: "default",
    Inactivo: "destructive",
    Suspendido: "secondary",
  }[empleado.persona?.estadoPersona] || "outline"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                {empleado?.persona?.nombre} {empleado?.persona?.apellido}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {empleado?.puesto?.nombrepuestoLaboral || "Puesto no especificado"} | CUIT: {empleado?.persona?.cuit}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Estado Laboral */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Estado laboral:</span>
            <Badge variant={estadoColor}>
              {empleado?.persona?.estadoPersona || "No especificado"}
            </Badge>
          </div>

          <Separator />

          {/* Fechas importantes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Fecha de contratación</p>
                <p className="text-sm text-muted-foreground">{formatDate(empleado?.fechaContratacion)}</p>
              </div>
            </div>

            {empleado?.fechaFinalizacion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Fecha de finalización</p>
                  <p className="text-sm text-muted-foreground">{formatDate(empleado?.fechaFinalizacion)}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Datos personales */}
          {empleado?.persona && (
            <div className="space-y-2">
              <Separator />
              <h4 className="text-sm font-semibold text-muted-foreground">Información personal</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {empleado?.usuario?.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p>{empleado.usuario.email}</p>
                  </div>
                )}
                {empleado?.persona?.telefono && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p>{empleado.persona.telefono}</p>
                  </div>
                )}
                {empleado?.persona?.direccion && (
                  <div className="col-span-2 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <p>{empleado.persona.direccion}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EmpleadoCard
