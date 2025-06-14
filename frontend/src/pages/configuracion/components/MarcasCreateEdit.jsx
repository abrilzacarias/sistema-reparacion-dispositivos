import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import {
  ToastMessageCreate,
  ToastMessageEdit,
} from "@/components/atoms/ToastMessage";
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import { OpenContext } from "@/components/organisms/ModalFormTemplate";

const API_URL = import.meta.env.VITE_API_URL;

const MarcasCreateEdit = ({ marca, refreshMarcas }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      descripcionMarcaDispositivo: marca?.descripcionMarcaDispositivo || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const { setOpen } = useContext(OpenContext);

  const onSubmit = async (data) => {
    setError("");
    setApiErrors({});
    setIsLoading(true);

    try {
      const endpoint = marca
        ? `${API_URL}/marcas/${marca.idMarcaDispositivo}/`
        : `${API_URL}/marcas/`;

      const method = marca ? axios.put : axios.post;

      await method(endpoint, data);

      marca ? ToastMessageEdit() : ToastMessageCreate();

      refreshMarcas();
      setOpen(false);
    } catch (err) {
      console.error("Error al guardar marca:", err);
      if (err.status === 500) {
        setError("Error del servidor, por favor intente más tarde.");
        return;
      }
      if (err?.response?.status === 422) {
        setError("Error, intente nuevamente más tarde.");
        return;
      }
      if (err.response?.data) {
        setApiErrors(err.response.data);
        setError("Error al guardar la marca, por favor revise los campos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-2">
        <Label>Descripción de la Marca</Label>
        <Input
          {...register("descripcionMarcaDispositivo", {
            required: "Campo requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        <ErrorMessage
          message={
            errors.descripcionMarcaDispositivo?.message ||
            apiErrors?.descripcionMarcaDispositivo
          }
        />
      </div>

      <div className="col-span-2 flex justify-end mt-3">
        <ButtonDinamicForms
          initialData={marca}
          isLoading={isLoading}
          register
        />
      </div>

      <div className="col-span-2 flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  );
};

export default MarcasCreateEdit;