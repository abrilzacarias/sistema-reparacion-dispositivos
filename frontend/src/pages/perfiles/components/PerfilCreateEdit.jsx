import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import {
  ToastMessageCreate,
  ToastMessageEdit,
} from "@/components/atoms/ToastMessage";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import {
  ChevronDown,
  ChevronRight,
  Layers,
  Shield,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function PerfilCreateEdit({
  perfil,
  refreshPerfiles,
  modulos = [],
  funciones = [],
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombrePerfil: perfil?.nombrePerfil || "",
      modulos: perfil?.modulos?.map((m) => m.idmoduloSistema) || [],
      funciones: perfil?.funciones?.map((f) => f.idfuncionSistema) || [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const [expandedModules, setExpandedModules] = useState(() => {
    const initialState = {};
    modulos.forEach((modulo) => {
      initialState[modulo.idmoduloSistema] = false;
    });
    return initialState;
  });

  const navigate = useNavigate();

  const watchedModulos = useWatch({ control, name: "modulos" });
  const watchedFunciones = useWatch({ control, name: "funciones" });

  useEffect(() => {
    if (perfil) {
      const modulosIds = perfil.modulos?.map((m) => m.idmoduloSistema) || [];
      const funcionesIds = perfil.modulos.flatMap(
        (modulo) => modulo.funciones?.map((f) => f.idfuncionSistema) || []
      );

      setValue("modulos", modulosIds);
      setValue("funciones", funcionesIds);
    }
  }, [perfil, setValue])

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  const handleModuleChange = (moduleId, checked) => {
    let newModulos = [...watchedModulos]
    let newFunciones = [...watchedFunciones]

    // Encontrar elmódulo y sus funciones
    const modulo = modulos.find((m) => m.idmoduloSistema === moduleId)
    const funcionesDelModulo = modulo?.funciones || []
    const funcionesIds = funcionesDelModulo.map((f) => f.idfuncionSistema)

    if (checked) {
      if (!newModulos.includes(moduleId)) {
        newModulos.push(moduleId)
      }

      funcionesIds.forEach((funcId) => {
        if (!newFunciones.includes(funcId)) {
          newFunciones.push(funcId)
        }
      })

      setExpandedModules((prev) => ({
        ...prev,
        [moduleId]: true,
      }))
    } else {
      newModulos = newModulos.filter((id) => id !== moduleId);
      newFunciones = newFunciones.filter((id) => !funcionesIds.includes(id))

      setExpandedModules((prev) => ({
        ...prev,
        [moduleId]: false,
      }))
    }

    setValue("modulos", newModulos)
    setValue("funciones", newFunciones)
  }

  const handleFunctionChange = (functionId, checked, moduleId) => {
    let newFunciones = [...watchedFunciones]

    if (checked) {
      if (!newFunciones.includes(functionId)) {
        newFunciones.push(functionId)
      }
    } else {
      newFunciones = newFunciones.filter((id) => id !== functionId)
    }

    setValue("funciones", newFunciones)

    const modulo = modulos.find((m) => m.idmoduloSistema === moduleId)
    const funcionesDelModulo = modulo?.funciones || []
    const funcionesIds = funcionesDelModulo.map((f) => f.idfuncionSistema)

    const algunaFuncionSeleccionada = funcionesIds.some((id) =>
      newFunciones.includes(id)
    )

    if (!algunaFuncionSeleccionada && watchedModulos.includes(moduleId)) {
      setValue(
        "modulos",
        watchedModulos.filter((id) => id !== moduleId)
      )
    } else if (
      algunaFuncionSeleccionada &&
      !watchedModulos.includes(moduleId)
    ) {
      setValue("modulos", [...watchedModulos, moduleId])
    }
  }

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    try {
      if (!data.funciones || data.funciones.length === 0) {
        setError("Debe seleccionar al menos una función")
        setIsLoading(false)
        return
      }

      let perfilId
      if (!perfil) {
        const perfilResponse = await axios.post(`${API_URL}/perfiles/`, {
          nombrePerfil: data.nombrePerfil,
        })
        perfilId = perfilResponse.data.idPerfil
      } else {
        perfilId = perfil.idPerfil || perfil.idPermisoPerfil

        await axios.put(`${API_URL}/perfiles/${perfilId}/`, {
          nombrePerfil: data.nombrePerfil,
        })
      }

      // Armar lista completa de permisos para enviar
      const permisosPayload = []

      for (const funcionId of data.funciones) {
        let funcionEncontrada = null

        for (const modulo of modulos) {
          const funcion = modulo.funciones?.find(
            (f) => f.idfuncionSistema === funcionId
          )
          if (funcion) {
            funcionEncontrada = funcion
            break
          }
        }

        if (funcionEncontrada?.idmoduloFuncionSistema) {
          permisosPayload.push({
            idPerfil: perfilId,
            idmoduloFuncionSistema: Number(
              funcionEncontrada.idmoduloFuncionSistema
            ),
            estadoPermisoPerfil: 1,
          })
        } else {
          setError(
            `Error: Error para la función ${
              funcionEncontrada?.descripcionFuncionSistema || funcionId
            }`
          )
          setIsLoading(false)
          return
        }
      }

      await axios.post(`${API_URL}/permisos-perfil`, {
        permisos: permisosPayload,
      })

      perfil ? ToastMessageEdit() : ToastMessageCreate()

      if (refreshPerfiles) {
        refreshPerfiles()
      }

      navigate("/perfiles")
    } catch (err) {
      if (err.response?.data) {
        console.log(err)
        setApiErrors(err.response.data)
        const errorDetail =
          err.response.data.detail ||
          "Error al guardar el perfil, por favor revise los campos."
        setError(errorDetail)
      } else {
        setError("Error desconocido: " + (err.message || "Error de conexión"))
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (modulos.length === 0) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
              Nombre del Perfil
            </Label>
          </div>
          <Input
            placeholder="Ej: Administrador, Usuario, Supervisor"
            className="h-11 text-base"
            disabled
          />
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400"></div>
            <Shield className="absolute inset-0 m-auto h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-base font-medium text-gray-900 dark:text-gray-100">
              Cargando permisos
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Obteniendo módulos y funciones disponibles...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      {/* Información básica del perfil */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Información Básica
            </Label>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="nombrePerfil"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre del Perfil *
            </Label>
            <Input
              id="nombrePerfil"
              {...register("nombrePerfil", { required: "Campo requerido" })}
              placeholder="Ej: Administrador, Usuario, Supervisor"
              className="h-11 text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <ErrorMessage
              message={errors.nombrePerfil?.message || apiErrors?.nombrePerfil}
            />
          </div>
        </div>
      </div>

      <Separator className="dark:border-gray-700" />

      {/* Selección de módulos y funciones */}
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Permisos del Perfil
            </Label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Selecciona los módulos para activar todas sus funciones. Luego
            puedes deseleccionar las funciones específicas que no deseas
            incluir.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100 flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Resumen de Permisos Seleccionados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-white/20 dark:border-gray-700/50">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {watchedModulos?.length || 0}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Módulos seleccionados
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-white/20 dark:border-gray-700/50">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                  <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {watchedFunciones?.length || 0}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Funciones seleccionadas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[400px] w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-4">
          <div className="space-y-4">
            {modulos.map((modulo) => {
              const funcionesDelModulo = modulo.funciones || []
              const isModuleSelected = watchedModulos?.includes(
                modulo.idmoduloSistema
              );
              const isExpanded =
                expandedModules[modulo.idmoduloSistema] ?? false;
              const funcionesSeleccionadas = funcionesDelModulo.filter((f) =>
                watchedFunciones?.includes(f.idfuncionSistema)
              ).length;

              return (
                <Card
                  key={modulo.idmoduloSistema}
                  className={`transition-all duration-100 hover:shadow-md ${
                    isModuleSelected
                      ? "bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/20 border-blue-200 dark:border-blue-800 shadow-sm"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50/80 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700 pb-0"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={isModuleSelected}
                          onCheckedChange={(checked) =>
                            handleModuleChange(modulo.idmoduloSistema, checked)
                          }
                          className="h-5 w-5 transition-all duration-200"
                        />
                        <div className="space-y-1">
                          <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                            <Layers className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            <span>{modulo.descripcionModuloSistema}</span>
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                            <span>
                              {funcionesDelModulo.length} funcion
                              {funcionesDelModulo.length !== 1 ? "es" : ""}{" "}
                              disponible
                              {funcionesDelModulo.length !== 1 ? "s" : ""}
                            </span>
                            {funcionesSeleccionadas > 0 && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800 text-xs px-2 py-1"
                              >
                                {funcionesSeleccionadas} seleccionada
                                {funcionesSeleccionadas !== 1 ? "s" : ""}
                              </Badge>
                            )}
                          </CardDescription>
                        </div>
                      </div>

                      {funcionesDelModulo.length > 0 && (
                        <Collapsible
                          open={isExpanded}
                          onOpenChange={() =>
                            toggleModule(modulo.idmoduloSistema)
                          }
                        >
                          <CollapsibleTrigger asChild>
                            <div className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              )}
                            </div>
                          </CollapsibleTrigger>
                        </Collapsible>
                      )}
                    </div>
                  </CardHeader>

                  {funcionesDelModulo.length > 0 && (
                    <Collapsible open={isExpanded}>
                      <CollapsibleContent className="transition-all duration-300">
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-6 border-l-2 border-blue-200 dark:border-blue-700 ml-2">
                            {funcionesDelModulo.map((funcion) => {
                              const isFunctionSelected =
                                watchedFunciones?.includes(
                                  funcion.idfuncionSistema
                                );

                              return (
                                <div
                                  key={funcion.idfuncionSistema}
                                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                    !isModuleSelected
                                      ? "opacity-50 bg-gray-50 dark:bg-gray-800/50"
                                      : isFunctionSelected
                                      ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
                                      : "bg-white dark:bg-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 border border-gray-200 dark:border-gray-600"
                                  }`}
                                >
                                  <Checkbox
                                    checked={isFunctionSelected}
                                    onCheckedChange={(checked) =>
                                      handleFunctionChange(
                                        funcion.idfuncionSistema,
                                        checked,
                                        modulo.idmoduloSistema
                                      )
                                    }
                                  />

                                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                                    <Zap className="h-3 w-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                    <div className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                                      {funcion.descripcionFuncionSistema}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <ButtonDinamicForms
          initialData={perfil}
          isLoading={isLoading}
          register
        />
      </div>

      {(error || apiErrors?.detail) && (
        <div className="flex justify-end">
          <ErrorMessage message={apiErrors?.detail || error} />
        </div>
      )}
    </form>
  )
}
