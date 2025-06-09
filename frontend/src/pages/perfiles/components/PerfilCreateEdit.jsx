import { useState, useContext, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import { ChevronDown, ChevronRight, Layers, Zap } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export default function PerfilCreateEdit({ perfil, refreshPerfiles, modulos = [], funciones = [] }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombrePerfil: perfil?.nombrePerfil || "",
      modulos: perfil?.modulos?.map((m) => m.idmoduloSistema) || [],
      funciones: perfil?.funciones?.map((f) => f.idfuncionSistema) || [],
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const [expandedModules, setExpandedModules] = useState({})
  const { setOpen } = useContext(OpenContext)

  const watchedModulos = watch("modulos")
  const watchedFunciones = watch("funciones")

  // Debug: Verificar cambios en los props
  useEffect(() => {
    console.log("🔄 useEffect - Módulos actualizados:", modulos)
    console.log("🔄 useEffect - Funciones actualizadas:", funciones)
  }, [modulos, funciones])

  // Debug: Verificar cambios en los valores del formulario
  useEffect(() => {
    console.log("📝 Formulario - Módulos seleccionados:", watchedModulos)
    console.log("📝 Formulario - Funciones seleccionadas:", watchedFunciones)
  }, [watchedModulos, watchedFunciones])

  const toggleModule = (moduleId) => {
    console.log("🔀 Toggle módulo:", moduleId)
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  const handleModuleChange = (moduleId, checked, setValue, currentModulos, currentFunciones) => {
    console.log("✅ Cambio de módulo:", { moduleId, checked, currentModulos })

    let newModulos
    if (checked) {
      newModulos = [...currentModulos, moduleId]
    } else {
      newModulos = currentModulos.filter((id) => id !== moduleId)
      // También remover todas las funciones de este módulo
      const modulo = modulos.find((m) => m.idmoduloSistema === moduleId)
      const funcionesDelModulo = modulo?.funciones?.map((f) => f.idfuncionSistema) || []
      const newFunciones = currentFunciones.filter((id) => !funcionesDelModulo.includes(id))
      console.log("🗑️ Removiendo funciones del módulo:", funcionesDelModulo)
      setValue("funciones", newFunciones)
    }
    setValue("modulos", newModulos)
    console.log("📊 Nuevos módulos:", newModulos)
  }

  const handleFunctionChange = (functionId, checked, setValue, currentFunciones) => {
    console.log("⚡ Cambio de función:", { functionId, checked, currentFunciones })

    let newFunciones
    if (checked) {
      newFunciones = [...currentFunciones, functionId]
    } else {
      newFunciones = currentFunciones.filter((id) => id !== functionId)
    }
    setValue("funciones", newFunciones)
    console.log("📊 Nuevas funciones:", newFunciones)
  }

  const onSubmit = async (data) => {
    console.log("🚀 INICIO onSubmit")
    console.log("📋 Data del formulario:", data)
    console.log("🏗️ Módulos disponibles:", modulos)
    console.log("⚡ Funciones disponibles:", funciones)

    setError("")
    setApiErrors({})

    // Validación básica
    if (!data.modulos || data.modulos.length === 0) {
      console.log("❌ Error: No hay módulos seleccionados")
      setError("Debe seleccionar al menos un módulo")
      return
    }

    setIsLoading(true)
    console.log("⏳ Iniciando carga...")

    try {
      const payload = {
        nombrePerfil: data.nombrePerfil,
        modulos: data.modulos,
        funciones: data.funciones,
      }

      console.log("📦 Payload del perfil:", payload)

      const endpoint = perfil ? `${API_URL}/permisos-perfil/${perfil.idPermisoPerfil}/` : `${API_URL}/permisos-perfil/`
      const method = perfil ? axios.put : axios.post

      console.log("🌐 Endpoint:", endpoint)
      console.log("🔧 Método:", method.name)

      const response = await method(endpoint, payload)
      console.log("✅ Respuesta exitosa:", response.data)

      perfil ? ToastMessageEdit() : ToastMessageCreate()
      refreshPerfiles()
      setOpen(false)
    } catch (err) {
      console.error("❌ Error al guardar perfil:", err)
      console.error("📄 Response data:", err.response?.data)
      console.error("📊 Status:", err.response?.status)

      if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar el perfil, por favor revise los campos.")
      } else {
        setError("Error desconocido")
      }
    } finally {
      setIsLoading(false)
      console.log("🏁 Finalizando carga...")
    }
  }

  // Debug: Verificar si hay módulos para renderizar
  if (modulos.length === 0) {
    console.log("⚠️ No hay módulos para renderizar")
    return (
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Nombre del Perfil</Label>
          <Input placeholder="Ej: Administrador, Usuario, Supervisor" />
        </div>
        <div className="text-center py-8 text-muted-foreground">Cargando módulos y funciones...</div>
      </div>
    )
  }

  console.log("🎨 Renderizando formulario completo")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
      {/* Información básica del perfil */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nombre del Perfil</Label>
          <Input
            {...register("nombrePerfil", { required: "Campo requerido" })}
            placeholder="Ej: Administrador, Usuario, Supervisor"
          />
          <ErrorMessage message={errors.nombrePerfil?.message || apiErrors?.nombrePerfil} />
        </div>
      </div>

      <Separator />

      {/* Selección de módulos y funciones */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base font-semibold">Permisos del Perfil</Label>
          <p className="text-sm text-muted-foreground">
            Selecciona los módulos y funciones específicas que tendrá este perfil
          </p>
        </div>

        {/* Resumen de selección */}
        {(watchedModulos?.length > 0 || watchedFunciones?.length > 0) && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Resumen de Permisos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {watchedModulos?.length || 0} módulo{watchedModulos?.length !== 1 ? "s" : ""} seleccionado
                  {watchedModulos?.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">
                  {watchedFunciones?.length || 0} función{watchedFunciones?.length !== 1 ? "es" : ""} seleccionada
                  {watchedFunciones?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <ScrollArea className="h-[400px] w-full border rounded-lg p-4">
          <div className="space-y-4">
            {modulos.map((modulo) => {
              console.log("🏗️ Renderizando módulo:", modulo)

              const funcionesDelModulo = modulo.funciones || []
              const isModuleSelected = watchedModulos?.includes(modulo.idmoduloSistema)
              const isExpanded = expandedModules[modulo.idmoduloSistema]
              const funcionesSeleccionadas = funcionesDelModulo.filter((f) =>
                watchedFunciones?.includes(f.idfuncionSistema),
              ).length

              return (
                <Card
                  key={modulo.idmoduloSistema}
                  className={`${isModuleSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Controller
                          name="modulos"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              checked={field.value?.includes(modulo.idmoduloSistema)}
                              onCheckedChange={(checked) =>
                                handleModuleChange(
                                  modulo.idmoduloSistema,
                                  checked,
                                  field.onChange,
                                  field.value,
                                  watchedFunciones,
                                )
                              }
                            />
                          )}
                        />
                        <div>
                          <CardTitle className="text-base">{modulo.descripcionModuloSistema}</CardTitle>
                          <CardDescription className="text-sm">
                            {funcionesDelModulo.length} función{funcionesDelModulo.length !== 1 ? "es" : ""} disponible
                            {funcionesDelModulo.length !== 1 ? "s" : ""}
                            {funcionesSeleccionadas > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                {funcionesSeleccionadas} seleccionada{funcionesSeleccionadas !== 1 ? "s" : ""}
                              </Badge>
                            )}
                          </CardDescription>
                        </div>
                      </div>

                      {funcionesDelModulo.length > 0 && (
                        <Collapsible open={isExpanded} onOpenChange={() => toggleModule(modulo.idmoduloSistema)}>
                          <CollapsibleTrigger asChild>
                            <div className="cursor-pointer p-1 hover:bg-gray-100 rounded">
                              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </div>
                          </CollapsibleTrigger>
                        </Collapsible>
                      )}
                    </div>
                  </CardHeader>

                  {funcionesDelModulo.length > 0 && (
                    <Collapsible open={isExpanded}>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                            {funcionesDelModulo.map((funcion) => {
                              console.log("⚡ Renderizando función:", funcion)

                              return (
                                <div key={funcion.idfuncionSistema} className="flex items-center space-x-3">
                                  <Controller
                                    name="funciones"
                                    control={control}
                                    render={({ field }) => (
                                      <Checkbox
                                        checked={field.value?.includes(funcion.idfuncionSistema)}
                                        onCheckedChange={(checked) =>
                                          handleFunctionChange(
                                            funcion.idfuncionSistema,
                                            checked,
                                            field.onChange,
                                            field.value,
                                          )
                                        }
                                        disabled={!isModuleSelected}
                                      />
                                    )}
                                  />
                                  <div className={`${!isModuleSelected ? "opacity-50" : ""}`}>
                                    <div className="font-medium text-sm">{funcion.descripcionFuncionSistema}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-end mt-6">
        <ButtonDinamicForms initialData={perfil} isLoading={isLoading} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}
