import React, { useEffect, useContext } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"

const ClienteCreateEdit = ({ cliente, refreshClientes, personaId }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      observaciones: cliente?.observaciones || "",
    },
  })

  const { setOpen } = useContext(OpenContext)

  useEffect(() => {
    reset({
      observaciones: cliente?.observaciones || "",
    })
  }, [cliente, reset])

  const onSubmit = async (data) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
      if (cliente) {
        await axios.put(`${API_URL}/clientes/${cliente.idCliente}`, data)
        ToastMessageEdit()
      } else {
        await axios.post(`${API_URL}/clientes`, { ...data, idPersona: personaId })
        ToastMessageCreate()
      }
      refreshClientes()
      setOpen(false) // ✅ Cerrar el modal
    } catch (error) {
      console.error("Error al guardar cliente:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Observaciones</label>
        <textarea {...register("observaciones")} />
      </div>
      <button type="submit">{cliente ? "Guardar cambios" : "Crear cliente"}</button>
    </form>
  )
}

export default ClienteCreateEdit


