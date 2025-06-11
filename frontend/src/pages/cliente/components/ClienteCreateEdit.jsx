import React, { useEffect, useContext, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
//import { Textarea } from "@/components/ui/textarea"
import ErrorMessage from "@/components/molecules/ErrorMessage"

const ClienteCreateEdit = ({ cliente, refreshClientes, personaId }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      observaciones: cliente?.observaciones || "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setOpen } = useContext(OpenContext)

  useEffect(() => {
    reset({
      observaciones: cliente?.observaciones || "",
    })
  }, [cliente, reset])

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError("")
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
      
      if (cliente) {
        // Editar cliente existente
        await axios.put(`${API_URL}/clientes/${cliente.idCliente}`, data)
        ToastMessageEdit()
      } else {
        // Crear nuevo cliente
        await axios.post(`${API_URL}/clientes`, { ...data, idPersona: personaId })
        ToastMessageCreate()
      }
      
      refreshClientes()
      setOpen(false)
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      console.log("Detalles del error:", error.response?.data)
      setError("Error al guardar el cliente. Por favor intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="observaciones">Observaciones</Label>
        <textarea 
          id="observaciones"
          {...register("observaciones")} 
          placeholder="Ingrese observaciones sobre el cliente..."
          rows={4}
        />
        <ErrorMessage message={errors.observaciones?.message} />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setOpen(false)}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : (cliente ? "Guardar cambios" : "Crear cliente")}
        </Button>
      </div>
      
      {error && (
        <div className="flex justify-center">
          <ErrorMessage message={error} />
          
        </div>
      )}
    </form>
  )
}

export default ClienteCreateEdit

