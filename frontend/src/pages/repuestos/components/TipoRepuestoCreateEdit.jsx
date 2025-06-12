import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/atoms/ErrorMessage"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"

const API_URL = import.meta.env.VITE_API_URL

const TipoRepuestoCreateEdit = ({ tipoRepuesto, refreshTiposRepuesto }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      descripcionTipoRepuesto: tipoRepuesto?.descripcionTipoRepuesto || "",
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
      const endpoint = tipoRepuesto
        ? `${API_URL}/tipos-repuesto/${tipoRepuesto.idTipoRepuesto}/`
        : `${API_URL}/tipos-repuesto/`

      const method = tipoRepuesto ? axios.put : axios.post

      await method(endpoint, data)

      tipoRepuesto ? ToastMessageEdit() : ToastMessageCreate()
      refreshTiposRepuesto?.()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar tipo de repuesto:", err)
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
        <Label>Descripción del tipo de repuesto</Label>
        <Input
          {...register("descripcionTipoRepuesto", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        <ErrorMessage message={errors.descripcionTipoRepuesto?.message || apiErrors?.descripcionTipoRepuesto} />
      </div>

      <div className="flex justify-end mt-3">
        <ButtonDinamicForms isLoading={isLoading} initialData={tipoRepuesto} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}

export default TipoRepuestoCreateEdit
