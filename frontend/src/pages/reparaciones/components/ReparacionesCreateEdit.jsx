import { useForm, Controller } from "react-hook-form"
import { useContext, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import FormSelectSearch from "@/components/atoms/FormSelectSearch"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"

const API_URL = import.meta.env.VITE_API_URL

const ReparacionesCreateEdit = ({ reparacion, refreshReparaciones }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      numeroReparacion: reparacion?.numeroReparacion || "",
      fechaIngreso: reparacion?.fechaIngreso || "",
      fechaEgreso: reparacion?.fechaEgreso || "",
      montoTotalReparacion: reparacion?.montoTotalReparacion || "",
      idDiagnostico: reparacion?.idDiagnostico || "",
      idEmpleado: reparacion?.idEmpleado || "",
      idEstadoReparacion: reparacion?.idEstadoReparacion || "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const { setOpen } = useContext(OpenContext)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError("")
    setApiErrors({})

    try {
      const endpoint = reparacion
        ? `${API_URL}/reparaciones/${reparacion.idReparacion}/`
        : `${API_URL}/reparaciones/`

      const method = reparacion ? axios.put : axios.post
      await method(endpoint, data)

      reparacion ? ToastMessageEdit() : ToastMessageCreate()

      refreshReparaciones()
      setOpen(false)
    } catch (err) {
      console.error(err)
      if (err.response?.status === 422) {
        setError("Error, intente nuevamente más tarde.")
      } else if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar la reparación, revise los campos.")
      } else {
        setError("Error del servidor.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <div className="space-y-2 col-span-2">
        <Label>Número de reparación</Label>
        <Input
          type="number"
          {...register("numeroReparacion", { required: "Campo requerido" })}
        />
        <ErrorMessage message={errors.numeroReparacion?.message || apiErrors?.numeroReparacion} />
      </div>

      <div className="space-y-2">
        <Label>Fecha de ingreso</Label>
        <Input
          type="date"
          {...register("fechaIngreso", { required: "Campo requerido" })}
        />
        <ErrorMessage message={errors.fechaIngreso?.message || apiErrors?.fechaIngreso} />
      </div>

      <div className="space-y-2">
        <Label>Fecha de egreso</Label>
        <Input type="date" {...register("fechaEgreso")} />
        <ErrorMessage message={errors.fechaEgreso?.message || apiErrors?.fechaEgreso} />
      </div>

      <div className="space-y-2 col-span-2">
        <Label>Monto total</Label>
        <Input
          type="number"
          step="0.01"
          {...register("montoTotalReparacion", {
            required: "Campo requerido",
            min: { value: 0, message: "Debe ser mayor a 0" },
          })}
        />
        <ErrorMessage message={errors.montoTotalReparacion?.message || apiErrors?.montoTotalReparacion} />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idDiagnostico"
          control={control}
          rules={{ required: "Seleccione un diagnóstico" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Diagnóstico"
              endpoint="diagnostico/"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un diagnóstico..."
              displayKey="descripcionDiagnostico"
              valueKey="idDiagnostico"
            />
          )}
        />
        <ErrorMessage message={errors.idDiagnostico?.message || apiErrors?.idDiagnostico} />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idEmpleado"
          control={control}
          rules={{ required: "Seleccione un empleado" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Empleado"
              endpoint="empleados/"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un empleado..."
              displayKey={(item) => `${item.nombreEmpleado} ${item.apellidoEmpleado}`}
              valueKey="idEmpleado"
            />
          )}
        />
        <ErrorMessage message={errors.idEmpleado?.message || apiErrors?.idEmpleado} />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idEstadoReparacion"
          control={control}
          rules={{ required: "Seleccione un estado" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Estado de reparación"
              endpoint="estado-reparacion/"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un estado..."
              displayKey="descripcionEstadoReparacion"
              valueKey="idEstadoReparacion"
            />
          )}
        />
        <ErrorMessage message={errors.idEstadoReparacion?.message || apiErrors?.idEstadoReparacion} />
      </div>

      <div className="col-span-2 flex justify-end mt-3">
        <ButtonDinamicForms initialData={reparacion} isLoading={isLoading} register />
      </div>

      <div className="col-span-2">
        <ErrorMessage message={error} />
      </div>
    </form>
  )
}

export default ReparacionesCreateEdit
