import { useForm, Controller } from "react-hook-form"
import { useContext, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ErrorMessage from "@/components/atoms/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import FormSelectSearch from "@/components/atoms/FormSelectSearch"
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"

const API_URL = import.meta.env.VITE_API_URL

const ReparacionesCreateEdit = ({ reparacion, refreshReparaciones, idDiagnostico }) => {
  // Función para obtener el estado más reciente de la reparación
  const getEstadoActual = (reparacion) => {
    if (!reparacion?.registroEstadoReparacion || reparacion.registroEstadoReparacion.length === 0) {
      return ""
    }
    
    // Ordenar por fecha más reciente y devolver el idEstadoReparacion
    const estadoMasReciente = reparacion.registroEstadoReparacion
      .sort((a, b) => new Date(b.fechaHoraRegistroEstadoReparacion) - new Date(a.fechaHoraRegistroEstadoReparacion))[0]
    
    return estadoMasReciente.idEstadoReparacion
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      //numeroReparacion: reparacion?.numeroReparacion || "",
      fechaIngreso: reparacion?.fechaIngreso || new Date().toISOString().split("T")[0], // hoy
      fechaEgreso: reparacion?.fechaEgreso || "",
      //montoTotalReparacion: reparacion?.montoTotalReparacion || "",
      // Si viene idDiagnostico como prop, lo usa; si no, usa el de la reparación
      idDiagnostico: idDiagnostico || reparacion?.idDiagnostico || "",
      idEmpleado: reparacion?.idEmpleado || "",
      // Obtener el estado actual de la reparación si existe
      idEstadoReparacion: reparacion ? getEstadoActual(reparacion) : "",
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
        //numeroReparacion: data.numeroReparacion,
        fechaIngreso: data.fechaIngreso,
        fechaEgreso: data.fechaEgreso || null,
        //montoTotalReparacion: data.montoTotalReparacion,
        idDiagnostico: data.idDiagnostico,
        idEmpleado: data.idEmpleado,
      }

      const endpoint = reparacion
        ? `${API_URL}/reparaciones/${reparacion.idReparacion}/`
        : `${API_URL}/reparaciones/`

      const method = reparacion ? axios.put : axios.post
      const response = await method(endpoint, reparacionData)
      const reparacionResponse = response.data

      // Solo crear registro de estado si cambió o es una nueva reparación
      const estadoActual = reparacion ? getEstadoActual(reparacion) : null
      const estadoSeleccionado = parseInt(data.idEstadoReparacion)
      
      if (!reparacion || estadoActual !== estadoSeleccionado) {
        await axios.post(`${API_URL}/registro-estado-reparacion/`, {
          idReparacion: reparacionResponse.idReparacion,
          idEstadoReparacion: data.idEstadoReparacion,
          idEmpleado: data.idEmpleado,
        })
      }

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
                `${diagnostico.dispositivo?.modeloDispositivo?.descripcionModeloDispositivo} de ${diagnostico.dispositivo?.cliente?.persona?.nombre || "Sin nombre"}`
              }
              valueKey="idDiagnostico"
              disabled={!!idDiagnostico} // Deshabilitar si viene preseleccionado
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


