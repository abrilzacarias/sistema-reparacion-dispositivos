import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import FormSelectSearch from "@/components/atoms/FormSelectSearch"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import ErrorMessage from "@/components/atoms/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import MultiSelectSearch from "./MultiSelectSearch"

const API_URL = import.meta.env.VITE_API_URL

const EmpleadoCreateEdit = ({ empleado, refreshEmpleados, idPersona, personaEmail, setPersonaId, setSelectedPersona }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fechaContratacion: empleado?.fechaContratacion || "",
      idUsuario: empleado?.usuario?.idUsuario || "",
      idpuestoLaboral: empleado?.puesto?.idpuestoLaboral || "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [apiErrors, setApiErrors] = useState({})
  const [perfilesSeleccionados, setPerfilesSeleccionados] = useState([])

  console.log(perfilesSeleccionados)

  const { open, setOpen } = useContext(OpenContext)

  const crearUsuarioAutomatico = async (email) => {
    setError("")
    setApiErrors({})
    try {
      const response = await axios.post(`${API_URL}/usuarios/auto`, {
        email: email,
      })
      console.log("Usuario creado:", response.data)
      return response.data.idUsuario
    } catch (err) {
      console.error("Error al crear usuario:", err)
      throw new Error(err.response.data.detail)
    }
  }

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    try {
      let idUsuario = data.idUsuario

      if (!empleado && personaEmail) {
        idUsuario = await crearUsuarioAutomatico(personaEmail)
        console.log('creand usuario')
        
      }


      const empleadoPayload = {
        fechaContratacion: data.fechaContratacion,
        idUsuario: idUsuario,
        idpuestoLaboral: data.idpuestoLaboral,
        idPersona,
        perfiles: perfilesSeleccionados
      }

      console.log("Payload del empleado:", empleadoPayload)

      const endpoint = empleado ? `${API_URL}/empleados/${empleado.idEmpleado}/` : `${API_URL}/empleados/`
      console.log(endpoint)
      const method = empleado ? axios.put : axios.post

      await method(endpoint, empleadoPayload)

      empleado ? ToastMessageEdit() : ToastMessageCreate()
      refreshEmpleados()
      setPersonaId(null)
      setSelectedPersona(null)
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
            <p className="text-sm text-blue-700">
              <strong>AVISO:</strong> Se creará un usuario {" "}
              <span className="font-mono bg-blue-100 px-1 rounded">{personaEmail}</span> y se enviarán las credenciales
              de acceso por correo electrónico.
            </p>
          </div>
        </div>
      )}
  
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-2">
        <Label>Fecha de Contratación</Label>
        <Input type="date" {...register("fechaContratacion", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.fechaContratacion?.message || apiErrors?.fechaContratacion} />
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

      <div className="col-span-2 space-y-2">
        <MultiSelectSearch
          label="Perfiles"
          endpoint="perfiles"
          value={perfilesSeleccionados}
          onChange={setPerfilesSeleccionados}
          placeholder="Seleccione perfiles..."
          displayKey="nombrePerfil"
          valueKey="idPerfil"
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
