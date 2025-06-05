import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import { Button } from "@/components/ui/button"

const API_URL = import.meta.env.VITE_API_URL

const PersonaCreateEdit = ({ persona, refreshPersonas, setActiveTab, setPersonaId, setSelectedPersona }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const { setOpen } = useContext(OpenContext)

  useEffect(() => {
  if (persona) {
    reset({
      cuit: persona.cuit || "",
      nombre: persona.nombre || "",
      apellido: persona.apellido || "",
      fechaNacimiento: persona.fechaNacimiento || "",
    })
  }
}, [persona, reset])

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    const payload = {
      ...data,
      estadoPersona: persona?.estadoPersona ?? 0,
    }

    try {
      const endpoint = persona
        ? `${API_URL}/personas/${persona.idPersona}/`
        : `${API_URL}/personas/`

      const method = persona ? axios.put : axios.post

      const response = await method(endpoint, payload)

      persona ? ToastMessageEdit() : ToastMessageCreate()
      refreshPersonas()

      if (persona) {
        setActiveTab("empleado")
      } else {
        const nuevaPersona = response.data
        setOpen(false)

        if (setSelectedPersona) {
          setSelectedPersona(nuevaPersona)
        }
        if (setPersonaId) {
          setPersonaId(nuevaPersona.idPersona)
        }
      }
    } catch (err) {
      console.error("Error al guardar persona:", err)
      if (err.status === 500) {
        setError("Error del servidor, por favor intente más tarde.")
        return
      }
      if (err?.response?.status === 422) {
        setError("Error, intente nuevamente más tarde.")
        return
      }
      if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar la persona, por favor revise los campos.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-4">
      <div className="space-y-2">
        <Label>Nombre</Label>
        <Input {...register("nombre", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.nombre?.message || apiErrors?.nombre} />
      </div>

      <div className="space-y-2">
        <Label>Apellido</Label>
        <Input {...register("apellido", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.apellido?.message || apiErrors?.apellido} />
      </div>

      <div className="space-y-2 col-span-2">
        <Label>CUIT</Label>
        <Input {...register("cuit", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.cuit?.message || apiErrors?.cuit} />
      </div>

      <div className="space-y-2 col-span-2">
        <Label>Fecha de Nacimiento</Label>
        <Input type="date" {...register("fechaNacimiento", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.fechaNacimiento?.message || apiErrors?.fechaNacimiento} />
      </div>
<div className="space-y-2 col-span-2">
  <Label>Correo Electrónico</Label>
  <Input
    type="email"
    {...register("correo", {
      required: "Campo requerido",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Formato de correo inválido",
      },
    })}
  />
  <ErrorMessage message={errors.correo?.message || apiErrors?.correo} />
</div>

      {/* TODO FALTAN CONTACTO Y DOMICILIO, PENSAR TEMA CONTACTO POR EMAIL DE USUARIO (CREDENCIAL DE INICIO DE SESION) */}

        <div className="col-span-2 flex justify-end gap-4 mt-3">
          {(persona) && (
            <Button
                type="button"
                onClick={() => setActiveTab("empleado")}
            >
                Continuar sin actualizar
            </Button>
          )}

            <ButtonDinamicForms
                initialData={persona}
                isLoading={isLoading}
                register
                onClick={() => setActiveTab("empleado")} 
            />
        </div>

      <div className="col-span-2 flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}

export default PersonaCreateEdit
