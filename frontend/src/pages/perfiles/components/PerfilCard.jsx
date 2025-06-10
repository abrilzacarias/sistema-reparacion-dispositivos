import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Route, Layers } from "lucide-react"
import { motion } from "framer-motion"

const PerfilCard = ({ perfil }) => {
  if (!perfil) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            No hay información del perfil disponible
          </p>
        </CardContent>
      </Card>
    )
  }

  const modulos = perfil.modulos || []
  const rutas = perfil.rutas || []

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
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                {perfil.nombrePerfil}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                ID Perfil: {perfil.idPerfil}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Módulos y Funciones */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Módulos y funciones
            </h4>
            {modulos.length > 0 ? (
              modulos.map((modulo, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium text-sm">
                      {modulo.descripcionModuloSistema}
                    </p>
                  </div>
                  <div className="ml-6 flex flex-wrap gap-2">
                    {(modulo.funciones || []).map((funcion, index) => (
                      <Badge key={index} variant="outline">
                        {funcion.descripcionFuncionSistema}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No hay módulos asignados
              </p>
            )}
          </div>

          <Separator />

          {/* Rutas */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Rutas asignadas
            </h4>
            {rutas.length > 0 ? (
              rutas.map((ruta, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Route className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">
                    {ruta.descripcionFuncionSistema} -{" "}
                    <span className="text-muted-foreground">{ruta.ruta}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No hay rutas asignadas
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PerfilCard
