import { Button } from "@/components/ui/button";
import { CredenzaClose, CredenzaFooter } from "@/components/ui/credenza";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { ToastMessage } from "../atoms/ToastMessage";
import { OpenContext } from "@/components/organisms/ModalFormTemplate"

const API_URL = import.meta.env.VITE_API_URL

const ModalDeactivateItem = ({ endpoint, refetch, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpen } = useContext(OpenContext)

  const handleAction = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`${API_URL}/${endpoint}/${id}`);

      ToastMessage({
        title: "Recurso eliminado correctamente",
        state: "success",
      });

      refetch();
      setOpen(false);
    } catch (error) {
      console.error(
        "Error al realizar la acción:",
        error.response ? error.response.data : error.message
      );

      ToastMessage({
        title: "Error",
        description:
          error.response && error.response.status === 500
            ? "Ocurrió un problema inesperado. Contacta con el equipo de soporte."
            : "Hubo un problema al realizar la acción.",
        state: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CredenzaFooter>
      <div className="flex items-center justify-center w-full gap-4 sm:justify-center">
        <CredenzaClose asChild>
          <Button
            variant="ghost"
            className="border rounded-full border-red-500 w-auto cursor-pointer bg-transparent text-red-500 hover:bg-transparent hover:border-none hover:text-red-500"
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </CredenzaClose>
        <Button
          variant="custom"
          onClick={handleAction}
          disabled={isLoading}
          className="rounded-full"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
        </Button>
      </div>
    </CredenzaFooter>
  );
};

export default ModalDeactivateItem;
