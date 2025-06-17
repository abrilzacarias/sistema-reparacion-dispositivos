import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, HardDrive, User, Wrench, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"

// Componente para mostrar el patrón de bloqueo
const PatternDisplay = ({ pattern }) => {
  if (!pattern) return null

  const points = pattern.split('-').map(Number)
  
  return (
    <div className="mt-2">
      <div className="grid grid-cols-3 gap-1 w-24 h-24 mx-auto bg-gray-100 p-2 rounded">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((point) => (
          <div
            key={point}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
              points.includes(point)
                ? 'bg-purple-500 border-purple-600 text-white'
                : 'bg-white border-gray-300'
            }`}
          >
            {points.includes(point) ? points.indexOf(point) + 1 : ''}
          </div>
        ))}
      </div>
      <p className="text-xs text-center mt-1 text-gray-600">
        Secuencia: {pattern}
      </p>
    </div>
  )
}

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

  const formatearRespuesta = (valor) => {
    if (valor === "true") return "Sí"
    if (valor === "false") return "No"
    
    // Detectar si es un patrón
    try {
      const parsed = JSON.parse(valor)
      if (parsed.tipo === "Patron" && parsed.valor) {
        return parsed
      }
    } catch (e) {
      // No es JSON válido, devolver el valor tal como está
    }
    
    return valor
  }

  const renderRespuesta = (respuesta) => {
    const respuestaFormateada = formatearRespuesta(respuesta)
    
    // Si es un objeto patrón, renderizar el componente especial
    if (typeof respuestaFormateada === 'object' && respuestaFormateada.tipo === 'Patron') {
      return (
        <div>
          <Badge variant="outline" className="mb-2">Patrón de bloqueo</Badge>
          <PatternDisplay pattern={respuestaFormateada.valor} />
        </div>
      )
    }
    
    // Para respuestas normales
    return <Badge variant="outline">{respuestaFormateada}</Badge>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="w-full shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">
            Diagnóstico #{diagnostico.idDiagnostico}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            Realizado el {formatDate(diagnostico.fechaDiagnostico)}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Información del Dispositivo */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 mb-1">
              <HardDrive className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-lg">Información del Dispositivo</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Descripción</p>
                <p>{diagnostico.descripcionDiagnostico || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Modelo</p>
                <p>
                  {diagnostico.dispositivo?.modeloDispositivo?.descripcionModeloDispositivo || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Marca</p>
                <p>
                  {diagnostico.dispositivo?.modeloDispositivo?.marcaDispositivo?.descripcionMarcaDispositivo || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Tipo</p>
                <p>
                  {diagnostico.dispositivo?.modeloDispositivo?.tipoDispositivo?.nombreTipoDispositivo || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diagnostico.dispositivo?.cliente && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-lg">Cliente</h3>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Nombre</p>
                  <p>
                    {diagnostico.dispositivo.cliente.persona
                      ? `${diagnostico.dispositivo.cliente.persona.nombre} ${diagnostico.dispositivo.cliente.persona.apellido}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            )}

            {diagnostico.empleado && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Wrench className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-lg">Técnico Responsable</h3>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Nombre</p>
                  <p>
                    {diagnostico.empleado.persona
                      ? `${diagnostico.empleado.persona.nombre} ${diagnostico.empleado.persona.apellido}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Preguntas del Diagnóstico */}
          {Array.isArray(diagnostico.detalleDiagnostico) && diagnostico.detalleDiagnostico.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-lg">Preguntas del Diagnóstico</h3>
              </div>
              <div className="space-y-2 text-sm">
                {diagnostico.detalleDiagnostico.map((detalle, idx) => (
                  <div key={idx} className="bg-muted rounded-md p-3">
                    <p className="text-muted-foreground">
                      {detalle.tipoDispositivoSegunPregunta?.preguntaDiagnostico?.descripcionPreguntaDiagnostico || "Pregunta desconocida"}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm text-muted-foreground">Respuesta: </span>
                      {renderRespuesta(detalle.valorDiagnostico)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DiagnosticoCard