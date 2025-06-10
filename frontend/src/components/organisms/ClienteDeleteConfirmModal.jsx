import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash, Loader2 } from "lucide-react";

const ClienteDeleteConfirmModal = ({ cliente, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const confirmado = window.confirm(
      `¿Estás segura/o de eliminar al cliente ${cliente?.persona?.nombre || "sin nombre"}?`
    );
    if (!confirmado) return;

    setIsLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    try {
      await axios.delete(`${API_URL}/clientes/${cliente.idCliente}`);
      alert("Cliente eliminado correctamente.");
      refetch();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("Error al eliminar el cliente. Intenta nuevamente.");
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

export default ClienteDeleteConfirmModal;