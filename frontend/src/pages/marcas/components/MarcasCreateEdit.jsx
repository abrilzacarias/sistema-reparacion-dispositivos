import { useForm } from "react-hook-form";
import axios from "axios";

const MarcasCreateEdit = ({ marca, refreshMarcas, onClose }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      descripcionMarcaDispositivo: marca?.descripcionMarcaDispositivo || "",
    },
  });

  const onSubmit = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      if (marca) {
        await axios.put(`${API_URL}/marcas/${marca.idMarcaDispositivo}`, data);
        alert("✅ Marca modificada correctamente.");
      } else {
        await axios.post(`${API_URL}/marcas`, data);
        alert("✅ Marca creada correctamente.");
      }

      refreshMarcas();   // Actualiza la lista
      onClose?.();       // Cierra el modal
      reset();           // Limpia el formulario

    } catch (error) {
      let msg = "❌ Error inesperado.";

      if (error.response?.data?.detail) {
        msg = `❌ ${error.response.data.detail}`;
      }

      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Descripción de la Marca</label>
        <input
          {...register("descripcionMarcaDispositivo", {
            required: true,
            maxLength: 100,
          })}
          className="input"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {marca ? "Guardar cambios" : "Crear marca"}
      </button>
    </form>
  );
};

export default MarcasCreateEdit;
