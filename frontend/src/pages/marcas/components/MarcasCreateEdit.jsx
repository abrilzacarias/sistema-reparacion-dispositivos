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
      } else {
        await axios.post(`${API_URL}/marcas`, data);
      }
      refreshMarcas();
      onClose?.();
    } catch (error) {
      console.error("Error al guardar marca:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Descripción de la Marca</label>
        <input
          {...register("descripcionMarcaDispositivo")}
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