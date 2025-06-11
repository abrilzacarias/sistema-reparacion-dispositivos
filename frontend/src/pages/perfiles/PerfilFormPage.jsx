import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import PerfilCreateEdit from "./components/PerfilCreateEdit"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const PerfilFormPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state

  const modulos = state?.modulos ?? []
  const funciones = state?.funciones ?? []
  const perfil = state?.perfil ?? null
  const modo = perfil ? "editar" : "crear"

  if (!modulos.length || !funciones.length) {
    return <div className="p-4">Faltan datos. Regrese a la página de Perfiles.</div>
  }

  return (
    <div className="p-4 pt-0">
      <div className="flex items-center mb-4 gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/perfiles")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">
          {modo === "editar" ? "Editar Perfil" : "Agregar Perfil"}
        </h1>
      </div>

      <Card className="bg-secondary dark:bg-background py-0">
        <CardContent className="p-0">
          <PerfilCreateEdit
            modulos={modulos}
            funciones={funciones}
            perfil={perfil}
            modo={modo}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default PerfilFormPage
