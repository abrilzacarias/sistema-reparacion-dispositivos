"use client"

import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export default function ModuloCreateEdit({ modulo, refreshModulos }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombreModulo: modulo?.nombreModulo || "",
      descripcionModulo: modulo?.descripcionModulo || "",
      estadoModulo: modulo?.estadoModulo ?? true,
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
      const endpoint = modulo ? `${API_URL}/modulos/${modulo.idModulo}/` : `${API_URL}/modulos/`
      const method = modulo ? axios.put : axios.post

      await method(endpoint, data)

      modulo ? ToastMessageEdit() : ToastMessageCreate()
      refreshModulos()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar módulo:", err)
      if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar el módulo, por favor revise los campos.")
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
        <Label>Nombre del Módulo</Label>
        <Input {...register("nombreModulo", { required: "Campo requerido" })} placeholder="Ej: Gestión de Usuarios" />
        <ErrorMessage message={errors.nombreModulo?.message || apiErrors?.nombreModulo} />
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea
          {...register("descripcionModulo", { required: "Campo requerido" })}
          placeholder="Describe la funcionalidad del módulo"
          rows={3}
        />
        <ErrorMessage message={errors.descripcionModulo?.message || apiErrors?.descripcionModulo} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch {...register("estadoModulo")} defaultChecked={modulo?.estadoModulo ?? true} />
        <Label>Módulo activo</Label>
      </div>

      <div className="flex justify-end mt-6">
        <ButtonDinamicForms initialData={modulo} isLoading={isLoading} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}
