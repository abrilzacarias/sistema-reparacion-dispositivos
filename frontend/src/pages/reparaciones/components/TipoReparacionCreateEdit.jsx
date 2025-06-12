import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"

const API_URL = import.meta.env.VITE_API_URL

const TipoReparacionCreateEdit = ({ tipoReparacion, refreshTiposReparacion }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      descripcionTipoReparacion: tipoReparacion?.descripcionTipoReparacion || "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const { open, setOpen } = useContext(OpenContext)

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    try {
      const endpoint = tipoReparacion
        ? `${API_URL}/tipoReparacion/${tipoReparacion.idTipoReparacion}/`
        : `${API_URL}/tipoReparacion/`

      const method = tipoReparacion ? axios.put : axios.post

      await method(endpoint, data)

      tipoReparacion ? ToastMessageEdit() : ToastMessageCreate()
      refreshTiposReparacion?.()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar tipo de reparación:", err)
      if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar. Revise los campos.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4"
    >
      <div className="space-y-2">
        <Label>Descripción del tipo de reparación</Label>
        <Input
          {...register("descripcionTipoReparacion", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        <ErrorMessage message={errors.descripcionTipoReparacion?.message || apiErrors?.descripcionTipoReparacion} />
      </div>

      <div className="flex justify-end mt-3">
        <ButtonDinamicForms isLoading={isLoading} initialData={tipoReparacion} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}

export default TipoReparacionCreateEdit
