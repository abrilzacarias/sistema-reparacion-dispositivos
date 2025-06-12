import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash, Loader2 } from "lucide-react";

const MarcasDeleteConfirmModal = ({ marca, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const confirmado = window.confirm(
      `¿Estás segura/o de eliminar la marca "${marca.descripcionMarcaDispositivo}"?`
    );
    if (!confirmado) return;

    setIsLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    try {
      await axios.delete(`${API_URL}/marcas/${marca.idMarcaDispositivo}`);
      alert("Marca eliminada correctamente.");
      refetch();
    } catch (error) {
      console.error("Error al eliminar marca:", error);
      console.log("Detalle del error:", error?.response?.data);
      alert(
        error?.response?.data?.detail === "Marca no encontrada"
          ? "La marca no existe o ya fue eliminada."
          : error?.response?.data?.detail ||
            "No se pudo eliminar la marca. Intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-red-600 hover:text-red-800"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" /> Eliminando...
        </>
      ) : (
        <>
          <Trash className="mr-2 size-4" /> Eliminar
        </>
      )}
    </Button>
  );
};

export default MarcasDeleteConfirmModal;
