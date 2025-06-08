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
      // Eliminamos idEstadoReparacion de los defaultValues de reparacion
      idEstadoReparacion: "", // Este campo es solo para crear el registro
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

    // Validación extra para idEmpleado
    if (!data.idEmpleado) {
      setError("Debe seleccionar un empleado para registrar el estado.")
      setIsLoading(false)
      return
    }

    // Validación para estado de reparación
    if (!data.idEstadoReparacion) {
      setError("Debe seleccionar un estado de reparación.")
      setIsLoading(false)
      return
    }

    try {
      // Preparar datos para la reparación (sin idEstadoReparacion)
      const reparacionData = {
        numeroReparacion: data.numeroReparacion,
        fechaIngreso: data.fechaIngreso,
        fechaEgreso: data.fechaEgreso,
        montoTotalReparacion: data.montoTotalReparacion,
        idDiagnostico: data.idDiagnostico,
        idEmpleado: data.idEmpleado,
      }

      const endpoint = reparacion
        ? `${API_URL}/reparaciones/${reparacion.idReparacion}/`
        : `${API_URL}/reparaciones/`

      const method = reparacion ? axios.put : axios.post
      const response = await method(endpoint, reparacionData)
      const reparacionResponse = response.data

      // Crear el registro de estado de reparación
      await axios.post(`${API_URL}/registro-estado-reparacion/`, {
        idReparacion: reparacionResponse.idReparacion,
        idEstadoReparacion: data.idEstadoReparacion,
        idEmpleado: data.idEmpleado,
      })

      reparacion ? ToastMessageEdit() : ToastMessageCreate()
      refreshReparaciones()
      setOpen(false)
    } catch (err) {
      console.error("Error completo:", err)
      if (err.response?.status === 422) {
        setError("Error de validación, revise los datos ingresados.")
      } else if (err.response?.status === 400) {
        setError("Datos incorrectos, revise los campos.")
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
      {/* Campos existentes */}
      <div className="space-y-2">
        <Label>Número de reparación</Label>
        <Input
          type="number"
          {...register("numeroReparacion", { required: "Campo requerido" })}
        />
        <ErrorMessage message={errors.numeroReparacion?.message || apiErrors?.numeroReparacion} />
      </div>

      <div className="space-y-2">
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
              displayKey={(diagnostico) =>
                `${diagnostico.dispositivo?.descripcionDispositivo} de ${diagnostico.dispositivo?.cliente?.persona?.nombre || "Sin nombre"}`
              }
              valueKey="idDiagnostico"
            />
          )}
        />
        <ErrorMessage message={errors.idDiagnostico?.message || apiErrors?.idDiagnostico} />
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="space-y-2">
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
                displayKey={(empleado) =>
                  `${empleado.persona?.nombre || "Sin nombre"} ${empleado.persona?.apellido || "Sin apellido"}`
                }
                valueKey="idEmpleado"
              />
            )}
          />
          <ErrorMessage message={errors.idEmpleado?.message || apiErrors?.idEmpleado} />
        </div>

        <div className="space-y-2">
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


