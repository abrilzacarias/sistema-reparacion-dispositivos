import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Box, DollarSign, Layers, PackageSearch } from "lucide-react"
import { motion } from "framer-motion"

const RepuestoCard = ({ repuesto }) => {
  if (!repuesto) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No hay información del repuesto disponible</p>
        </CardContent>
      </Card>
    )
  }

  const stockBadge = repuesto.cantidadRepuesto > 5
    ? <Badge variant="default">Stock: {repuesto.cantidadRepuesto}</Badge>
    : <Badge variant="destructive">Stock bajo: {repuesto.cantidadRepuesto}</Badge>

  const precioFormateado = Number(repuesto.precio).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <PackageSearch className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">
                  {repuesto.nombreRepuesto}
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Tipo: {repuesto.tipoRepuesto}
                </p>
              </div>
            </div>
            {stockBadge}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <Separator />

          {/* Precio */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Precio</span>
            </div>
            <p className="text-sm font-semibold">{precioFormateado}</p>
          </div>

          {/* Marca */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Box className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Marca</span>
            </div>
            <p className="text-sm font-medium">
              {repuesto.marca?.descripcionMarcaDispositivo || "No especificada"}
            </p>
          </div>

          {/* Código interno o ID */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">ID Repuesto</span>
            </div>
            <p className="text-sm">{repuesto.idRepuesto}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default RepuestoCard
