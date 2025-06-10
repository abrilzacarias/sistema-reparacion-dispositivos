import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const ClienteCreateEdit = ({ cliente, onClose, refreshClientes, personaId }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      observaciones: cliente?.observaciones || "",
      // otros campos si los tienes
    },
  });

  useEffect(() => {
    reset({
      observaciones: cliente?.observaciones || "",
      // resetear otros campos según cliente
    });
  }, [cliente, reset]);

  const onSubmit = async (data) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      if (cliente) {
        // Modo edición
        await axios.put(`${API_URL}/clientes/${cliente.idCliente}`, data);
      } else {
        // Modo creación
        await axios.post(`${API_URL}/clientes`, { ...data, idPersona: personaId });
      }
      refreshClientes();
      onClose();
    } catch (error) {
      console.error("Error al guardar cliente:", error);
      // mostrar error a usuario si quieres
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Observaciones</label>
        <textarea {...register("observaciones")} />
      </div>
      <button type="submit">{cliente ? "Guardar cambios" : "Crear cliente"}</button>
    </form>
  );
};

export default ClienteCreateEdit;
