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

const RepuestosCreateEdit = ({
  repuesto,
  refreshRepuestos,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombreRepuesto: repuesto?.nombreRepuesto || "",
      precio: repuesto?.precio || "",
      cantidadRepuesto: repuesto?.cantidadRepuesto || "",
      idMarcaDispositivo: repuesto?.marca.idMarcaDispositivo || "",
      idTipoRepuesto: repuesto?.tipo.idTipoRepuesto || "",
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
      const endpoint = repuesto
        ? `${API_URL}/repuestos/${repuesto.idRepuesto}/`
        : `${API_URL}/repuestos/`

      const method = repuesto ? axios.put : axios.post

      await method(endpoint, data)

      if (repuesto) {
        ToastMessageEdit()
      } else {
        ToastMessageCreate()
      }

      refreshRepuestos()
      setOpen(false)
    } catch (err) {
      console.error("Error al guardar repuesto:", err)
      //TODO MANEJAR ERRORES DE MEJOR MANERA EN EL BACKEND
      if (err.status === 500) {
        setError('Error del servidor, por favor intente más tarde.')
        return
      }
      if (err?.response?.status === 422) {
        setError("Error, intente nuevamente más tarde.")
        return
      }
      if (err.response?.data) {
        setApiErrors(err.response.data)
        setError('Error al guardar el repuesto, por favor revise los campos.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      <div className="col-span-2 space-y-2">
        <Label>Nombre del repuesto</Label>
        <Input
          {...register("nombreRepuesto", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        <ErrorMessage
          message={errors.nombreRepuesto?.message || apiErrors?.nombreRepuesto}
        />
      </div>

      <div className="space-y-2">
        <Label>Precio</Label>
        <Input
          type="number"
          step="0.01"
          {...register("precio", {
            required: "Campo requerido",
            min: { value: 0, message: "Debe ser mayor a 0" },
          })}
        />
        <ErrorMessage message={errors.precio?.message || apiErrors?.precio} />
      </div>

      <div className="space-y-2">
        <Label>Cantidad</Label>
        <Input
          type="number"
          {...register("cantidadRepuesto", {
            required: "Campo requerido",
            min: { value: 1, message: "Debe ser al menos 1" },
          })}
        />
        <ErrorMessage
          message={errors.cantidadRepuesto?.message || apiErrors?.cantidadRepuesto}
        />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idMarcaDispositivo"
          control={control}
          rules={{ required: "Seleccione una marca" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Marca del dispositivo"
              endpoint="marcas"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione una marca..."
              displayKey="descripcionMarcaDispositivo"
              valueKey="idMarcaDispositivo"
            />
          )}
        />
        <ErrorMessage message={errors.idMarcaDispositivo?.message || apiErrors?.idMarcaDispositivo} />
      </div>

      <div className="col-span-2 space-y-2">
        <Controller
          name="idTipoRepuesto"
          control={control}
          rules={{ required: "Seleccione un tipo de repuesto" }}
          render={({ field }) => (
            <FormSelectSearch
              label="Tipo de repuesto"
              endpoint="tipos-repuesto"
              value={field.value}
              setValue={field.onChange}
              placeholder="Seleccione un tipo de repuesto..."
              displayKey="descripcionTipoRepuesto"
              valueKey="idTipoRepuesto"
            />
          )}
        />
        <ErrorMessage message={errors.idTipoRepuesto?.message || apiErrors?.idTipoRepuesto} />
      </div>

      <div className="col-span-2 flex justify-end mt-3">
        <ButtonDinamicForms initialData={repuesto} isLoading={isLoading} register />
      </div>

      <div className="col-span-2 flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  )
}

export default RepuestosCreateEdit
