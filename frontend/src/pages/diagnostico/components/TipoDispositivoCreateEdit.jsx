import { useContext, useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ErrorMessage from "@/components/atoms/ErrorMessage"
import { Plus, Trash2, Settings, HelpCircle, Type, ToggleLeft, List } from "lucide-react"
import axios from "axios"
import { ToastMessageCreate } from "@/components/atoms/ToastMessage"
import { toast } from "sonner"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"

const API_URL = import.meta.env.VITE_API_URL

export default function TipoDispositivoCreateEdit() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      descripcionTipoDispositivo: "",
      preguntas: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "preguntas",
  })

  const [tiposDato, setTiposDato] = useState([])
  const { setOpen } = useContext(OpenContext)

  useEffect(() => {
    fetch(`${API_URL}/tipoDatoPreguntaDiagnostico`)
      .then((res) => res.json())
      .then((data) => setTiposDato(data.items))
      .catch((err) => console.error("Error cargando tipos de dato", err))
  }, [])

  const onSubmit = async (data) => {
  try {
    const preguntasFormateadas = data.preguntas.map((pregunta) => {
      const tipo = tiposDato.find(
        (t) => t.idTipoDatoPreguntaDiagnostico === pregunta.idTipoDatoPreguntaDiagnostico
      )

      return {
        descripcionPreguntaDiagnostico: pregunta.pregunta.trim(),
        idTipoDatoPreguntaDiagnostico: pregunta.idTipoDatoPreguntaDiagnostico,
        opcionesPregunta:
          tipo?.descripcionTipoDatoPreguntaDiagnostico.toLowerCase() === "opcion"
            ? pregunta.opciones?.map((o) => o.valor.trim()).filter((v) => v)
            : null,
      }
    })

    const payload = {
      nombreTipoDispositivo: data.descripcionTipoDispositivo.trim(),
      preguntas: preguntasFormateadas,
    }

    await axios.post(`${API_URL}/tipo-dispositivo`, payload)

    ToastMessageCreate()
    setOpen(false)
  } catch (error) {
    console.error("Error al crear tipo de dispositivo:", error)
    toast.error("Ocurrió un error al guardar")
  }
}


  const agregarPregunta = () => {
    append({
      pregunta: "",
      idTipoDatoPreguntaDiagnostico: null,
      opciones: [],
    })
  }

  const getTipoIcon = (descripcion) => {
    switch (descripcion?.toLowerCase()) {
      case "booleano":
        return <ToggleLeft className="w-4 h-4" />
      case "texto":
        return <Type className="w-4 h-4" />
      case "opcion":
        return <List className="w-4 h-4" />
      default:
        return <HelpCircle className="w-4 h-4" />
    }
  }

  

  const getTipoColor = (descripcion) => {
    switch (descripcion?.toLowerCase()) {
      case "booleano":
        return "bg-blue-50 border-blue-200 text-blue-800"
      case "texto":
        return "bg-green-50 border-green-200 text-green-800"
      case "opcion":
        return "bg-orange-50 border-orange-200 text-orange-800"
      default:
        return "bg-gray-50 border-gray-200 text-gray-800"
    }
  }

  return (
        <Card className="p-0 border-0 bg-white/80">
          <CardContent>
            <form className="space-y-8">
              {/* Información básica */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Descripción del tipo de dispositivo *
                    </label>
                    <Input
                      {...register("descripcionTipoDispositivo", { required: "Campo obligatorio" })}
                      placeholder="Ej: Televisor, Smartphone, Laptop..."
                      className="text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                    />
                    {errors.descripcionTipoDispositivo && (
                      <ErrorMessage message={errors.descripcionTipoDispositivo.message} />
                    )}
                  </div>

              {/* Preguntas de diagnóstico */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Preguntas de Diagnóstico
                      <Badge variant="secondary" className="ml-2">
                        {fields.length} pregunta{fields.length !== 1 ? "s" : ""}
                      </Badge>
                    </CardTitle>
                    <Button
                      type="button"
                      onClick={agregarPregunta}
                      className="bg-slate-700 hover:bg-slate-800 text-white shadow-md"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar pregunta
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  {fields.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50/50">
                      <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500 mb-4 text-lg">No hay preguntas configuradas</p>
                      <p className="text-slate-400 text-sm mb-6">
                        Agrega preguntas para personalizar el diagnóstico de este tipo de dispositivo
                      </p>
                      <Button
                        type="button"
                        onClick={agregarPregunta}
                        variant="outline"
                        className="border-slate-300 hover:bg-slate-50"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar primera pregunta
                      </Button>
                    </div>
                  )}

                  <div>
                    {fields.map((field, index) => {
                      const tipoSeleccionado = tiposDato.find(
                        (t) =>
                          t.idTipoDatoPreguntaDiagnostico === watch(`preguntas.${index}.idTipoDatoPreguntaDiagnostico`),
                      )

                      const esOpcion =
                        tipoSeleccionado?.descripcionTipoDatoPreguntaDiagnostico?.toLowerCase() === "opcion"

                      return (
                        <Card
                          key={field.id}
                          className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <CardContent className="px-6">
                            <div className="space-y-5">
                              {/* Header de la pregunta */}
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <div>
                                    <h3 className="font-semibold text-slate-700">Pregunta {index + 1}</h3>
                                    {tipoSeleccionado && (
                                      <Badge
                                        className={`mt-1 ${getTipoColor(
                                          tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico,
                                        )}`}
                                      >
                                        {getTipoIcon(tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico)}
                                        <span className="ml-1">
                                          {tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico}
                                        </span>
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  size="sm"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Campo de pregunta */}
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">
                                  Texto de la pregunta *
                                </label>
                                <Input
                                  {...register(`preguntas.${index}.pregunta`, {
                                    required: "Ingrese una pregunta",
                                  })}
                                  placeholder="Escriba la pregunta que se mostrará al técnico..."
                                  className="text-base border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                                />
                                {errors.preguntas?.[index]?.pregunta && (
                                  <ErrorMessage message={errors.preguntas[index].pregunta.message} />
                                )}
                              </div>

                              {/* Selector de tipo */}
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700">Tipo de respuesta *</label>
                                <Select
                                  value={watch(`preguntas.${index}.idTipoDatoPreguntaDiagnostico`)?.toString() || ""}
                                  onValueChange={(value) => {
                                    const intVal = Number.parseInt(value)
                                    setValue(`preguntas.${index}.idTipoDatoPreguntaDiagnostico`, intVal)
                                    setValue(`preguntas.${index}.opciones`, [])
                                    if (
                                      tiposDato.find(
                                        (t) =>
                                          t.idTipoDatoPreguntaDiagnostico === intVal &&
                                          t.descripcionTipoDatoPreguntaDiagnostico.toLowerCase() === "opcion",
                                      )
                                    ) {
                                      setValue(`preguntas.${index}.opciones`, [{ valor: "" }, { valor: "" }])
                                    }
                                  }}
                                >
                                  <SelectTrigger className="border-slate-300 focus:border-slate-500 focus:ring-slate-500">
                                    <SelectValue placeholder="Seleccione el tipo de respuesta" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {tiposDato.map((tipo) => (
                                      <SelectItem
                                        key={tipo.idTipoDatoPreguntaDiagnostico}
                                        value={tipo.idTipoDatoPreguntaDiagnostico.toString()}
                                      >
                                        <div className="flex items-center gap-2">
                                          {getTipoIcon(tipo.descripcionTipoDatoPreguntaDiagnostico)}
                                          {tipo.descripcionTipoDatoPreguntaDiagnostico}
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Información del tipo seleccionado */}
                              {tipoSeleccionado && (
                                <div
                                  className={`p-4 rounded-lg border ${getTipoColor(
                                    tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico,
                                  )}`}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    {getTipoIcon(tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico)}
                                    <span className="font-medium">
                                      Tipo: {tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico}
                                    </span>
                                  </div>
                                  <p className="text-sm opacity-80">
                                    {tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico.toLowerCase() ===
                                      "booleano" && "El técnico podrá responder con Sí o No"}
                                    {tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico.toLowerCase() ===
                                      "texto" && "El técnico podrá escribir una respuesta libre"}
                                    {tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico.toLowerCase() ===
                                      "opcion" && "El técnico podrá seleccionar entre las opciones que configure"}
                                    {tipoSeleccionado.descripcionTipoDatoPreguntaDiagnostico.toLowerCase() ===
                                      "opcion" && "El técnico podrá escribir una respuesta númerica"}
                                  </p>
                                </div>
                              )}

                              {/* Opciones (solo para tipo opción) */}
                              {esOpcion && (
                                <Card className="border-orange-200 bg-orange-50/30">
                                  <CardContent className="p-4">
                                    <OpcionesInput control={control} register={register} index={index} />
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Botones de acción */}
              <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
                <Button type="button" variant="outline" className="border-slate-300 hover:bg-slate-50">
                  Cancelar
                </Button>
                <Button type="button" className="bg-slate-700 hover:bg-slate-800 text-white shadow-md px-8" onClick={handleSubmit(onSubmit)}>
                  Guardar configuración
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
  )
}

function OpcionesInput({ control, register, index }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `preguntas.${index}.opciones`,
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold text-orange-800 flex items-center gap-2">
            <List className="w-4 h-4" />
            Opciones de respuesta
          </h4>
          <p className="text-sm text-orange-600 mt-1">Configure las opciones que el técnico podrá seleccionar</p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => append({ valor: "" })}
          className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Agregar opción
        </Button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-orange-300 rounded-lg bg-orange-50">
          <List className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <p className="text-orange-600 text-sm">No hay opciones configuradas</p>
          <Button
            type="button"
            size="sm"
            onClick={() => append({ valor: "" })}
            className="mt-3 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Agregar primera opción
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-orange-200">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-xs font-semibold text-orange-700">
              {idx + 1}
            </div>
            <Input
              {...register(`preguntas.${index}.opciones.${idx}.valor`, {
                required: "Ingrese una opción",
              })}
              placeholder={`Opción ${idx + 1} (ej: Pantalla rota, No enciende...)`}
              className="flex-1 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
            />
            <Button
              variant="ghost"
              type="button"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => remove(idx)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {fields.length > 0 && (
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-xs font-medium text-orange-800 mb-2">Vista previa:</p>
          <div className="flex flex-wrap gap-2">
            {fields
              .filter((_, idx) => register(`preguntas.${index}.opciones.${idx}.valor`))
              .map((_, idx) => (
                <Badge key={idx} variant="secondary" className="bg-orange-100 text-orange-800">
                  Opción {idx + 1}
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
