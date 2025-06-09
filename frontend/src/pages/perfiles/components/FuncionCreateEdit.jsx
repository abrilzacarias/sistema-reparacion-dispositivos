"use client"

import { useState, useContext } from "react"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import FormSelectSearch from "@/components/atoms/FormSelectSearch"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export default function FuncionCreateEdit({ funcion, refreshFunciones }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombreFuncion: funcion?.nombreFuncion || "",
      descripcionFuncion: funcion?.descripcionFuncion || "",
      idModulo: funcion?.modulo?.idModulo || "",
      estadoFuncion: funcion?.estadoFuncion ?? true,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const { setOpen } = useContext(OpenContext)

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    try {
      const endpoint = funcion ? `${API_URL}/funciones/${funcion.idFuncion}/` : `${API_URL}/funciones/`
      const method = funcion ? axios.put : axios.post

      await method(endpoint, data)

      funcion ? ToastMessageEdit() : ToastMessageCreate()
      refreshFunciones()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar función:", err)
      if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar la función, por favor revise los campos.")
      } else {
        setError("Error desconocido")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label>Nombre de la Función</Label>
        <Input {...register("nombreFuncion", { required: "Campo requerido" })} placeholder="Ej: Crear Usuario" />
        <ErrorMessage message={errors.nombreFuncion?.message || apiErrors?.nombreFuncion} />
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea
          {...register("descripcionFuncion", { required: "Campo requerido" })}
          placeholder="Describe qué hace esta función"
          rows={3}
        />
        <ErrorMessage message={errors.descripcionFuncion?.message || apiErrors?.descripcionFuncion} />
      </div>

      <div className="space-y-2">
        <Controller
          name="idModulo"
          control={control}
          rules={{ required: "Seleccione un módulo" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Módulo"
              endpoint="modulos"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un módulo..."
              displayKey="nombreModulo"
              valueKey="idModulo"
            />
          )}
        />
        <ErrorMessage message={errors.idModulo?.message || apiErrors?.idModulo} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch {...register("estadoFuncion")} defaultChecked={funcion?.estadoFuncion ?? true} />
        <Label>Función activa</Label>
      </div>

      <div className="flex justify-end mt-6">
        <ButtonDinamicForms initialData={funcion} isLoading={isLoading} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}
