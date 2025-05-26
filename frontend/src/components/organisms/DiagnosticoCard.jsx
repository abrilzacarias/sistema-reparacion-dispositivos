import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, HardDrive, User, Wrench } from "lucide-react"
import { motion } from "framer-motion"

const DiagnosticoCard = ({ diagnostico }) => {
  if (!diagnostico) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No hay información del diagnóstico disponible</p>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Diagnóstico #{diagnostico.idDiagnostico}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Realizado el {formatDate(diagnostico.fechaDiagnostico)}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Información del Dispositivo */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <HardDrive className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-medium">Dispositivo</h3>
                <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Descripción</p>
                    <p>{diagnostico.dispositivo?.descripcionDispositivo || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Modelo</p>
                    <p>{diagnostico.dispositivo?.modeloDispositivo || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Marca</p>
                    <p>{diagnostico.dispositivo?.marcaDispositivo?.descripcionMarcaDispositivo || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tipo</p>
                    <p>{diagnostico.dispositivo?.tipoDispositivo?.nombreTipoDispositivo || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Información del Cliente */}
          {diagnostico.dispositivo?.cliente && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-medium">Cliente</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nombre</p>
                      <p>
                        {diagnostico.dispositivo.cliente.persona
                          ? `${diagnostico.dispositivo.cliente.persona.nombre} ${diagnostico.dispositivo.cliente.persona.apellido}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Información del Técnico */}
          {diagnostico.empleado && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Wrench className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-medium">Técnico Responsable</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nombre</p>
                      <p>
                        {diagnostico.empleado.persona
                          ? `${diagnostico.empleado.persona.nombre} ${diagnostico.empleado.persona.apellido}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Separator />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DiagnosticoCard
