import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import {
  ToastMessageCreate,
  ToastMessageEdit,
} from "@/components/atoms/ToastMessage";
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import { OpenContext } from "@/components/organisms/ModalFormTemplate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";

const API_URL = import.meta.env.VITE_API_URL;

const ModelosCreateEdit = ({ modelo, refreshModelos }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      descripcionModeloDispositivo: modelo?.descripcionModeloDispositivo || "",
      idMarcaDispositivo:
        modelo?.idMarcaDispositivo?.toString() ||
        modelo?.marcaDispositivo?.idMarcaDispositivo?.toString() ||
        "",
      idTipoDispositivo:
        modelo?.idTipoDispositivo?.toString() ||
        modelo?.tipoDispositivo?.idTipoDispositivo?.toString() ||
        "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const { setOpen } = useContext(OpenContext);

  // Traer marcas
  const {
    data: marcas = [],
    isLoading: marcasLoading,
    isError: marcasError,
  } = usePaginatedQuery({
    key: "marcas",
    endpoint: "marcas",
    enablePagination: false,
  });

  // Traer tipos de dispositivo
  const {
    data: tiposDispositivo = [],
    isLoading: tiposLoading,
    isError: tiposError,
  } = usePaginatedQuery({
    key: "tiposDispositivo",
    endpoint: "tipo-dispositivo",
    enablePagination: false,
  });

  const onSubmit = async (data) => {
    setError("");
    setApiErrors({});
    setIsLoading(true);

    try {
      const endpoint = modelo
        ? `${API_URL}/modelos/${modelo.idModeloDispositivo}/`
        : `${API_URL}/modelos/`;

      const method = modelo ? axios.put : axios.post;

      await method(endpoint, data);

      modelo ? ToastMessageEdit() : ToastMessageCreate();

      refreshModelos();

      setOpen(false);
    } catch (err) {
      console.error("Error al guardar modelo:", err);
      if (err?.status === 500) {
        setError("Error del servidor, por favor intente más tarde.");
        return;
      }
      if (err?.response?.status === 422) {
        setError("Error, intente nuevamente más tarde.");
        return;
      }
      if (err?.response?.data) {
        setApiErrors(err.response.data);
        setError("Error al guardar el modelo, por favor revise los campos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      {/* Descripción */}
      <div className="col-span-2 space-y-2">
        <Label>Descripción del Modelo</Label>
        <Input
          {...register("descripcionModeloDispositivo", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        <ErrorMessage
          message={
            errors.descripcionModeloDispositivo?.message ||
            apiErrors?.descripcionModeloDispositivo
          }
        />
      </div>

      {/* Marca */}
      <div className="col-span-1 space-y-2">
        <Label>Marca</Label>
        <Controller
          control={control}
          name="idMarcaDispositivo"
          rules={{ required: "Campo requerido" }}
          defaultValue={
            modelo?.idMarcaDispositivo?.toString() ||
            modelo?.marcaDispositivo?.idMarcaDispositivo?.toString() ||
            ""
          }
          render={({ field }) => (
            <Select
              value={field.value || ""}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una marca" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(marcas) &&
                  marcas.map((marca) => (
                    <SelectItem
                      key={marca.idMarcaDispositivo}
                      value={marca.idMarcaDispositivo.toString()}
                    >
                      {marca.descripcionMarcaDispositivo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        <ErrorMessage
          message={errors.idMarcaDispositivo?.message || apiErrors?.idMarcaDispositivo}
        />
      </div>
      {/* Tipo de dispositivo */}
      <div className="col-span-1 space-y-2">
        <Label>Tipo de Dispositivo</Label>
        <Controller
          control={control}
          name="idTipoDispositivo"
          rules={{ required: "Campo requerido" }}
          defaultValue={
            modelo?.idTipoDispositivo?.toString() ||
            modelo?.tipoDispositivo?.idTipoDispositivo?.toString() ||
            ""
          }
          render={({ field }) => (
            <Select
              value={field.value || ""}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un tipo" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(tiposDispositivo) &&
                  tiposDispositivo.map((tipo) => (
                    <SelectItem
                      key={tipo.idTipoDispositivo}
                      value={tipo.idTipoDispositivo.toString()}
                    >
                      {tipo.nombreTipoDispositivo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
        <ErrorMessage
          message={errors.idTipoDispositivo?.message || apiErrors?.idTipoDispositivo}
        />
      </div>

      {/* Botones y errores */}
      <div className="col-span-2 flex justify-end mt-3">
        <ButtonDinamicForms initialData={modelo} isLoading={isLoading} register />
      </div>

      <div className="col-span-2 flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  );
};

export default ModelosCreateEdit;
