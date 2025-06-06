import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  console.log("🔍 DetalleReparacionCreateEdit montado con props:", { 
    detalle, 
    idReparacion, 
    refreshDetalles: !!refreshDetalles 
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      descripcion: detalle?.descripcion || "",
      manoObra: detalle?.manoObra || "",
      precioRepuesto: detalle?.precioRepuesto || "",
      idTipoReparacion: detalle?.tipoReparacion?.idTipoReparacion || "",
      idRepuesto: detalle?.repuesto?.idRepuesto || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});
  const [tiposReparacion, setTiposReparacion] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const { open, setOpen } = useContext(OpenContext);

  console.log("🔍 Contexto del modal:", { open, setOpen: !!setOpen });

  useEffect(() => {
    const fetchAuxData = async () => {
      try {
        console.log("🔍 Cargando tipos de reparación y repuestos...");
        const [resTipos, resRepuestos] = await Promise.all([
          axios.get(`${API_URL}/tipoReparacion/`),
          axios.get(`${API_URL}/repuestos/`),
        ]);

        setTiposReparacion(resTipos.data.items || []);
        setRepuestos(resRepuestos.data.items || []);

        console.log("✅ Datos auxiliares cargados:", { 
          tipos: resTipos.data?.length, 
          repuestos: resRepuestos.data?.length 
        });
      } catch (err) {
        console.error("❌ Error al cargar tipos o repuestos:", err);
      }
    };
    fetchAuxData();
  }, []);

  const onSubmit = async (data) => {
    console.log("🔍 Iniciando submit con datos:", data);
    
    setError("");
    setApiErrors({});
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        idReparacion,
      };

      console.log("🔍 Payload a enviar:", payload);

      const endpoint = detalle
        ? `${API_URL}/detalleReparacion/${detalle.idDetalleReparacion}/`
        : `${API_URL}/detalleReparacion/`;
      const method = detalle ? axios.put : axios.post;

      console.log("🔍 Enviando request a:", endpoint);
      const response = await method(endpoint, payload);
      console.log("✅ Respuesta del servidor:", response.data);

      detalle ? ToastMessageEdit() : ToastMessageCreate();
      
      console.log("🔍 Ejecutando refreshDetalles...");
      if (refreshDetalles) {
        await refreshDetalles();
        console.log("✅ refreshDetalles ejecutado");
      } else {
        console.log("⚠️ refreshDetalles no está definido");
      }
      
      console.log("🔍 Cerrando modal...");
      setOpen(false);
      console.log("✅ Modal cerrado");
      
    } catch (err) {
      console.error("❌ Error al guardar detalle de reparación:", err);
      console.error("❌ Response data:", err.response?.data);
      if (err.response?.data) {
        setApiErrors(err.response.data);
        setError("Error al guardar. Revise los campos.");
      }
    } finally {
      setIsLoading(false);
      console.log("🔍 Loading finalizado");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Input {...register("descripcion", {
          required: "Campo requerido",
          minLength: { value: 3, message: "Mínimo 3 caracteres" },
          maxLength: { value: 200, message: "Máximo 200 caracteres" },
        })} />
        <ErrorMessage message={errors.descripcion?.message || apiErrors?.descripcion} />
      </div>

      <div className="space-y-2">
        <Label>Mano de Obra</Label>
        <Input type="number" step="0.01" {...register("manoObra", {
          required: "Campo requerido",
          min: { value: 0, message: "No puede ser negativo" },
        })} />
        <ErrorMessage message={errors.manoObra?.message || apiErrors?.manoObra} />
      </div>

      <div className="space-y-2">
        <Label>Precio del Repuesto</Label>
        <Input type="number" step="0.01" {...register("precioRepuesto", {
          required: "Campo requerido",
          min: { value: 0, message: "No puede ser negativo" },
        })} />
        <ErrorMessage message={errors.precioRepuesto?.message || apiErrors?.precioRepuesto} />
      </div>

      <div className="space-y-2">
        <Label>Tipo de Reparación</Label>
        <Select
          onValueChange={(value) => setValue("idTipoReparacion", value)}
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

      <div className="space-y-2">
        <Label>Repuesto</Label>
        <Select
          onValueChange={(value) => setValue("idRepuesto", value)}
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

      <div className="flex justify-end mt-3">
        <ButtonDinamicForms isLoading={isLoading} initialData={detalle} register />
      </div>

      <div className="flex justify-end">
        <ErrorMessage message={apiErrors?.detail || error} />
      </div>
    </form>
  );
};

export default DetalleReparacionCreateEdit;