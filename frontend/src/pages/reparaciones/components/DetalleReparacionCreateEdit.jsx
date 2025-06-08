// DetalleReparacionCreateEdit.jsx
import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { OpenContext } from "@/components/organisms/ModalFormTemplate";
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import ErrorMessage from "@/components/molecules/ErrorMessage";
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_URL = import.meta.env.VITE_API_URL;

const DetalleReparacionCreateEdit = ({ detalle, idReparacion, refreshDetalles }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      descripcion: detalle?.descripcion || "",
      manoObra: detalle?.manoObra || "",
      precioRepuesto: detalle?.precioRepuesto || "",
      idTipoReparacion: detalle?.tipoReparacion?.idTipoReparacion?.toString() || "",
      idRepuesto: detalle?.repuesto?.idRepuesto?.toString() || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const [tiposReparacion, setTiposReparacion] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const { open, setOpen } = useContext(OpenContext);

  const selectedRepuestoId = watch("idRepuesto");

  useEffect(() => {
    const fetchAuxData = async () => {
      try {
        const [resTipos, resRepuestos] = await Promise.all([
          axios.get(`${API_URL}/tipoReparacion/`),
          axios.get(`${API_URL}/repuestos/`),
        ]);
        setTiposReparacion(resTipos.data.items || []);
        setRepuestos(resRepuestos.data.items || []);
      } catch (err) {
        console.error("Error al cargar tipos o repuestos:", err);
      }
    };
    fetchAuxData();
  }, []);

  useEffect(() => {
    if (selectedRepuestoId) {
      const repuestoSeleccionado = repuestos.find(
        (r) => r.idRepuesto.toString() === selectedRepuestoId
      );
      if (repuestoSeleccionado) {
        setValue("precioRepuesto", repuestoSeleccionado.precio ?? "");
      } else {
        setValue("precioRepuesto", "");
      }
    } else {
      setValue("precioRepuesto", "");
    }
  }, [selectedRepuestoId, repuestos, setValue]);

  const formatErrorMessage = (msg) => {
    if (!msg) return "";
    if (typeof msg === "string") return msg;
    if (Array.isArray(msg)) return msg.join(", ");
    if (typeof msg === "object") return JSON.stringify(msg);
    return String(msg);
  };

  const onSubmit = async (data) => {
    setError("");
    setApiErrors({});
    setIsLoading(true);

    try {
      const payload = {
        descripcion: data.descripcion,
        manoObra: parseFloat(data.manoObra),
        precioRepuesto: parseFloat(data.precioRepuesto),
        idTipoReparacion: parseInt(data.idTipoReparacion),
        idRepuesto: parseInt(data.idRepuesto),
        idReparacion: parseInt(idReparacion),
      };

      console.log("Payload enviado:", payload);

      const endpoint = detalle
        ? `${API_URL}/detalleReparacion/${detalle.idDetalleReparacion}`
        : `${API_URL}/detalleReparacion/`;
      const method = detalle ? axios.put : axios.post;

      await method(endpoint, payload);

      detalle ? ToastMessageEdit() : ToastMessageCreate();

      if (refreshDetalles) {
        await refreshDetalles();
      }

      setOpen(false);
    } catch (err) {
      console.error("Error al guardar detalle de reparación:", err);
      if (err.response?.data) {
        setApiErrors(err.response.data);
        setError("Error al guardar. Revise los campos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Input
          {...register("descripcion", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
            maxLength: { value: 200, message: "Máximo 200 caracteres" },
          })}
        />
        <ErrorMessage message={errors.descripcion?.message || apiErrors?.descripcion} />
      </div>

      {/* Repuesto y Precio del Repuesto */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Repuesto</Label>
          <Select
            onValueChange={(value) => setValue("idRepuesto", value)}
            value={watch("idRepuesto") || ""}
            defaultValue={detalle?.repuesto?.idRepuesto?.toString() || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un repuesto" />
            </SelectTrigger>
            <SelectContent>
              {repuestos.map((rep) => (
                <SelectItem key={rep.idRepuesto} value={rep.idRepuesto.toString()}>
                  {rep.nombreRepuesto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage message={apiErrors?.idRepuesto} />
        </div>

        <div className="space-y-2">
          <Label>Precio del Repuesto</Label>
          <Input
            type="number"
            step="0.01"
            {...register("precioRepuesto")}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
          <ErrorMessage message={errors.precioRepuesto?.message || apiErrors?.precioRepuesto} />
        </div>
      </div>

      {/* Mano de Obra y Tipo de Reparación lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Mano de Obra</Label>
          <Input
            type="number"
            step="0.01"
            {...register("manoObra", {
              required: "Campo requerido",
              min: { value: 0, message: "No puede ser negativo" },
            })}
          />
          <ErrorMessage message={errors.manoObra?.message || apiErrors?.manoObra} />
        </div>

        <div className="space-y-2">
          <Label>Tipo de Reparación</Label>
          <Select
            onValueChange={(value) => setValue("idTipoReparacion", value)}
            value={watch("idTipoReparacion") || ""}
            defaultValue={detalle?.tipoReparacion?.idTipoReparacion?.toString() || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposReparacion.map((tipo) => (
                <SelectItem key={tipo.idTipoReparacion} value={tipo.idTipoReparacion.toString()}>
                  {tipo.descripcionTipoReparacion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage message={apiErrors?.idTipoReparacion} />
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <ButtonDinamicForms isLoading={isLoading} initialData={detalle} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={formatErrorMessage(apiErrors?.detail || error)} />
      </div>
    </form>
  );
};

export default DetalleReparacionCreateEdit;


