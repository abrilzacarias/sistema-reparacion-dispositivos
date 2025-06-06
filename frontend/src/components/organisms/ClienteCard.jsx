import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Mail, Phone, FileText } from "lucide-react";
import { motion } from "framer-motion";

const ClienteCard = ({ cliente }) => {
  if (!cliente) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No hay información del cliente disponible</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No especificado";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                {cliente?.persona?.nombre} {cliente?.persona?.apellido}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                CUIT: {cliente?.persona?.cuit}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Observaciones */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Observaciones:</span>
            <div className="text-sm text-foreground">
              {cliente.observaciones || "Sin observaciones"}
            </div>
          </div>

          <Separator />

          {/* Información personal adicional */}
          {cliente.persona && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground">Datos Personales</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {/* Email si existiera */}
                {cliente.persona.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p>{cliente.persona.email}</p>
                  </div>
                )}
                {/* Teléfono si existiera */}
                {cliente.persona.telefono && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p>{cliente.persona.telefono}</p>
                  </div>
                )}
                {/* Fecha de nacimiento */}
                {cliente.persona.fechaNacimiento && (
                  <div className="flex items-center space-x-2 col-span-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <p>{formatDate(cliente.persona.fechaNacimiento)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClienteCard;
