import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import DiagnosticoCreateEdit from "./DiagnosticoCreateEdit"

const DiagnosticoFormPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state

  //const modulos = state?.modulos ?? []
  //const funciones = state?.funciones ?? []
  //const perfil = state?.perfil ?? null
  const modo = "crear"

  return (
    <div className="p-4 pt-0">
      <div className="flex items-center mb-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/diagnosticos")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">
          {modo === "editar" ? "Editar Diagnóstico" : "Agregar Diagnóstico"}
        </h1>
      </div>

      <Card className="bg-secondary dark:bg-background py-0">
        <CardContent className="p-0">
          <DiagnosticoCreateEdit />
        </CardContent>
      </Card>
    </div>
  )
}

export default DiagnosticoFormPage
