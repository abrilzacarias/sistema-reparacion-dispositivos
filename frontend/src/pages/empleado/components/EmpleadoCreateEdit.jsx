import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import PuestoLaboralMultiSelect from "./PuestoLaboralMultiSelect"

const API_URL = import.meta.env.VITE_API_URL

const EmpleadoCreateEdit = ({ empleado, refreshEmpleados, idPersona, personaEmail }) => {
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
      idpuestoLaboral: empleado?.puestos?.map((p) => p.idpuestoLaboral) || [], // Cambio para array
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const { open, setOpen } = useContext(OpenContext)

  const crearUsuarioAutomatico = async (email) => {
    try {
      console.log("Creando usuario automático con email:", email)
      const response = await axios.post(`${API_URL}/usuarios`, {
        email: email,
      })
      console.log("Usuario creado:", response.data)
      return response.data.idUsuario
    } catch (err) {
      console.error("Error al crear usuario automático:", err)
      throw new Error("Error al crear el usuario automáticamente")
    }
  }

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    try {
      let idUsuario = data.idUsuario

      if (!empleado && personaEmail) {
        console.log("Creando usuario automático para nuevo empleado")
        idUsuario = await crearUsuarioAutomatico(personaEmail)
      }

      const empleadoPayload = {
        fechaContratacion: data.fechaContratacion,
        fechaFinalizacion: data.fechaFinalizacion,
        idUsuario: idUsuario,
        puestosLaborales: data.idpuestoLaboral,
        idPersona,
      }

      console.log("Payload del empleado:", empleadoPayload)

      const endpoint = empleado ? `${API_URL}/empleados/${empleado.idEmpleado}/` : `${API_URL}/empleados/`
      const method = empleado ? axios.put : axios.post

      await method(endpoint, empleadoPayload)

      empleado ? ToastMessageEdit() : ToastMessageCreate()
      refreshEmpleados()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar empleado:", err)
      if (err.status === 500) {
        setError("Error del servidor, por favor intente más tarde.")
      } else if (err?.response?.status === 422) {
        setError("Error, intente nuevamente más tarde.")
      } else if (err.response?.data) {
        setApiErrors(err.response.data)
        setError("Error al guardar el empleado, por favor revise los campos.")
      } else {
        setError(err.message || "Error desconocido")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 mt-4">
      {!empleado && personaEmail && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-blue-700">
              <strong>AVISO:</strong> Se creará un usuario con el correo electrónico{" "}
              <span className="font-mono bg-blue-100 px-1 rounded">{personaEmail}</span> y se enviarán las credenciales
              de acceso por correo.
            </p>
          </div>
        </div>
      )}
  
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
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
            name="idpuestoLaboral"
            control={control}
            rules={{
              required: "Seleccione al menos un puesto laboral",
              validate: (value) => value.length > 0 || "Debe seleccionar al menos un puesto laboral",
            }}
            render={({ field }) => (
              <PuestoLaboralMultiSelect
                value={field.value}
                onChange={field.onChange}
                placeholder="Seleccione puestos laborales..."
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
  </div>
  )
}

export default EmpleadoCreateEdit
