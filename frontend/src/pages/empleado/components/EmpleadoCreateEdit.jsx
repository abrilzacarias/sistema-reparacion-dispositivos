import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import FormSelectSearch from "@/components/atoms/FormSelectSearch"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"

const API_URL = import.meta.env.VITE_API_URL

const EmpleadoCreateEdit = ({
  empleado,
  refreshEmpleados,
  idPersona,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fechaContratacion: empleado?.fechaContratacion || "",
      fechaFinalizacion: empleado?.fechaFinalizacion || "",
      idUsuario: empleado?.usuario?.idUsuario || "",
      idpuestoLaboral: empleado?.puesto?.idpuestoLaboral || "",
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

    const payload = {
      ...data,
      idPersona,
    }

    try {
      const endpoint = empleado
        ? `${API_URL}/empleados/${empleado.idEmpleado}/`
        : `${API_URL}/empleados/`

      const method = empleado ? axios.put : axios.post

      await method(endpoint, payload)

      empleado ? ToastMessageEdit() : ToastMessageCreate()

      refreshEmpleados()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar empleado:", err)
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
        setError("Error al guardar el empleado, por favor revise los campos.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-4">
      <div className="space-y-2">
        <Label>Fecha de Contratación</Label>
        <Input type="date" {...register("fechaContratacion", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.fechaContratacion?.message || apiErrors?.fechaContratacion} />
      </div>

      <div className="space-y-2">
        <Label>Fecha de Finalización</Label>
        <Input type="date" {...register("fechaFinalizacion")} />
        <ErrorMessage message={errors.fechaFinalizacion?.message || apiErrors?.fechaFinalizacion} />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idUsuario"
          control={control}
          rules={{ required: "Seleccione un usuario" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Usuario"
              endpoint="usuarios"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un usuario..."
              displayKey="username"
              valueKey="idUsuario"
            />
          )}
        />
        <ErrorMessage message={errors.idUsuario?.message || apiErrors?.idUsuario} />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idpuestoLaboral"
          control={control}
          rules={{ required: "Seleccione un puesto laboral" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Puesto Laboral"
              endpoint="puestos-laborales"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un puesto..."
              displayKey="nombrepuestoLaboral"
              valueKey="idpuestoLaboral"
            />
          )}
        />
        <ErrorMessage message={errors.idpuestoLaboral?.message || apiErrors?.idpuestoLaboral} />
      </div>

      <div className="col-span-2 flex justify-end mt-3">
        <ButtonDinamicForms initialData={empleado} isLoading={isLoading} register />
      </div>

      <div className="col-span-2 flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}

export default EmpleadoCreateEdit
