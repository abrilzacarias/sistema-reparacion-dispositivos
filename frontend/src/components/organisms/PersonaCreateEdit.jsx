import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import { Button } from "@/components/ui/button"
import { PhoneInput } from "../ui/phone-input"
import { isValidPhoneNumber } from "react-phone-number-input"
import FormSelectSearch from "@/components/atoms/FormSelectSearch"

const API_URL = import.meta.env.VITE_API_URL

const PersonaCreateEdit = ({ persona, refreshPersonas, setActiveTab, setPersonaId, setSelectedPersona }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
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
      console.log(persona)
      const contactoCorreo = persona.contactos?.find(
        (c) => c.tipoContacto.descripcionTipoContacto.toLowerCase() === "correo" && c.esPrimario,
      )
      const contactoTelefono = persona.contactos?.find(
        (c) => c.tipoContacto.descripcionTipoContacto.toLowerCase() === "telefono" && c.esPrimario,
      )
      const domicilio = persona.domicilios?.[0]

      reset({
        cuit: persona.cuit || "",
        nombre: persona.nombre || "",
        apellido: persona.apellido || "",
        fechaNacimiento: persona.fechaNacimiento || "",
        correo: contactoCorreo?.descripcionContacto || "",
        telefono: contactoTelefono?.descripcionContacto || "",
        // Domicilio fields
        codigoPostal: domicilio?.codigoPostal || "",
        pais: domicilio?.pais || "",
        provincia: domicilio?.provincia || "",
        ciudad: domicilio?.ciudad || "",
        barrio: domicilio?.barrio || "",
        calle: domicilio?.calle || "",
        departamento: domicilio?.departamento || "",
        idtipoDomicilio: domicilio?.idtipoDomicilio || "",
      })
    } else {
      reset({
        cuit: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        correo: "",
        telefono: "",
        // Domicilio fields
        codigoPostal: "",
        pais: "",
        provincia: "",
        ciudad: "",
        barrio: "",
        calle: "",
        departamento: "",
        idtipoDomicilio: "",
      })
    }
  }, [persona, reset])

  const onSubmit = async (data) => {
    setError("")
    setApiErrors({})
    setIsLoading(true)

    const { correo, telefono, ...rest } = data

    const isEdit = !!persona?.idPersona

    let contactos = []

    if (isEdit) {
      console.log("Editando persona:", persona)

      // Buscar contactos existentes
      const contactoCorreoExistente = persona?.contactos?.find(
        (c) => c.tipoContacto.descripcionTipoContacto.toLowerCase() === "correo" && c.esPrimario,
      )
      const contactoTelefonoExistente = persona?.contactos?.find(
        (c) => c.tipoContacto.descripcionTipoContacto.toLowerCase() === "telefono" && c.esPrimario,
      )

      // Contacto de correo
      const contactoCorreo = {
        descripcionContacto: correo,
        idtipoContacto: 1,
        esPrimario: true,
      }

      // Si existe contacto de correo previo, incluir idContacto para actualizar
      if (contactoCorreoExistente?.idContacto) {
        contactoCorreo.idContacto = contactoCorreoExistente.idContacto
        contactoCorreo.idPersona = persona.idPersona
        console.log("Actualizando contacto de correo existente")
      } else {
        console.log("Creando nuevo contacto de correo")
      }

      // Contacto de teléfono
      const contactoTelefono = {
        descripcionContacto: telefono,
        idtipoContacto: 2,
        esPrimario: true,
      }

      // Si existe contacto de teléfono previo, incluir idContacto para actualizar
      if (contactoTelefonoExistente?.idContacto) {
        contactoTelefono.idContacto = contactoTelefonoExistente.idContacto
        contactoTelefono.idPersona = persona.idPersona
        console.log("Actualizando contacto de teléfono existente")
      } else {
        console.log("Creando nuevo contacto de teléfono")
      }

      contactos = [contactoCorreo, contactoTelefono]
    } else {
      // Para creación, siempre crear nuevos contactos
      contactos = [
        {
          descripcionContacto: correo,
          idtipoContacto: 1,
          esPrimario: true,
        },
        {
          descripcionContacto: telefono,
          idtipoContacto: 2,
          esPrimario: true,
        },
      ]
    }

    // Prepare domicilio data
    const domicilio = {
      codigoPostal: data.codigoPostal,
      pais: data.pais,
      provincia: data.provincia,
      ciudad: data.ciudad,
      barrio: data.barrio,
      calle: data.calle,
      departamento: data.departamento,
      idtipoDomicilio: data.idtipoDomicilio,
    }

    // If editing and domicilio exists, include idDomicilio
    if (isEdit && persona?.domicilios?.[0]?.idDomicilio) {
      domicilio.idDomicilio = persona.domicilios[0].idDomicilio
      domicilio.idPersona = persona.idPersona
    }

    const payload = {
      ...rest,
      estadoPersona: persona?.estadoPersona ?? 0,
      contactos: contactos,
      domicilios: [domicilio],
    }

    console.log("Payload completo:", JSON.stringify(payload, null, 2))

    try {
      const endpoint = persona ? `${API_URL}/personas/${persona.idPersona}/` : `${API_URL}/personas/`
      const method = persona ? axios.put : axios.post
      const response = await method(endpoint, payload)

      const idPersonaFinal = persona ? persona.idPersona : response.data.idPersona

      const responsePersonaActualizada = await axios.get(`${API_URL}/personas/${idPersonaFinal}/`)
      if (setSelectedPersona) {
        setSelectedPersona(responsePersonaActualizada.data)
      }

      if (persona) {
        setTimeout(() => {
          setActiveTab("empleado")
        }, 100)
      } else {
        setOpen(false)
        if (setPersonaId) {
          setPersonaId(responsePersonaActualizada.data.idPersona)
        }
      }

      if (!persona && refreshPersonas) {
        setTimeout(() => {
          persona ? ToastMessageEdit() : ToastMessageCreate()
          refreshPersonas()
        }, 300)
      }
    } catch (err) {
      console.error("Error al guardar persona:", err)
      console.error("Response data:", err.response?.data)

      if (err.status === 500) {
        setError("Error del servidor, por favor intente más tarde.")
        return
      }
      if (err?.response?.status === 422) {
        setError("Error de validación. Revise los datos ingresados.")
        console.error("Validation errors:", err.response.data)
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

      <div className="space-y-2">
        <Label>CUIT</Label>
        <Input {...register("cuit", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.cuit?.message || apiErrors?.cuit} />
      </div>

      <div className="space-y-2">
        <Label>Fecha de Nacimiento</Label>
        <Input type="date" {...register("fechaNacimiento", { required: "Campo requerido" })} />
        <ErrorMessage message={errors.fechaNacimiento?.message || apiErrors?.fechaNacimiento} />
      </div>

      <div className="space-y-2">
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

      <div className="form-group">
        <Label htmlFor="telefono" className="text-sm font-medium">
          Número de Teléfono
        </Label>
        <Controller
          name="telefono"
          control={control}
          rules={{
            required: "Campo requerido",
            validate: (value) => isValidPhoneNumber(value) || "Número de teléfono inválido",
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              id="telefono"
              international
              defaultCountry="AR"
              placeholder="Ingrese un número de teléfono"
              className="w-full"
            />
          )}
        />
        <ErrorMessage message={errors?.telefono?.message} />
      </div>

      {/* Domicilio fields */}
      <div className="col-span-2 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Controller
              name="idtipoDomicilio"
              control={control}
              rules={{ required: "Seleccione un tipo de domicilio" }}
              render={({ field }) => (
                <FormSelectSearch
                  label="Tipo de Domicilio"
                  endpoint="tipo-domicilios"
                  value={field.value}
                  setValue={field.onChange}
                  placeholder="Seleccione un tipo..."
                  displayKey="descripciontipoDomicilio"
                  valueKey="idtipoDomicilio"
                />
              )}
            />
            <ErrorMessage message={errors.idtipoDomicilio?.message || apiErrors?.idtipoDomicilio} />
          </div>

          <div className="space-y-2">
            <Label>Código Postal</Label>
            <Input {...register("codigoPostal", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.codigoPostal?.message || apiErrors?.codigoPostal} />
          </div>

          <div className="space-y-2">
            <Label>País</Label>
            <Input {...register("pais", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.pais?.message || apiErrors?.pais} />
          </div>

          <div className="space-y-2">
            <Label>Provincia</Label>
            <Input {...register("provincia", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.provincia?.message || apiErrors?.provincia} />
          </div>

          <div className="space-y-2">
            <Label>Ciudad</Label>
            <Input {...register("ciudad", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.ciudad?.message || apiErrors?.ciudad} />
          </div>

          <div className="space-y-2">
            <Label>Barrio</Label>
            <Input {...register("barrio", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.barrio?.message || apiErrors?.barrio} />
          </div>

          <div className="space-y-2">
            <Label>Calle</Label>
            <Input {...register("calle", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.calle?.message || apiErrors?.calle} />
          </div>

          <div className="space-y-2">
            <Label>Departamento</Label>
            <Input {...register("departamento", { required: "Campo requerido" })} />
            <ErrorMessage message={errors.departamento?.message || apiErrors?.departamento} />
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-end gap-4 mt-3">
        {persona && (
          <Button type="button" variant="ghost" onClick={() => setActiveTab("empleado")}>
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
