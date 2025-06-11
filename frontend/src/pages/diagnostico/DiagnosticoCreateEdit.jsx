import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import FormSelectSearch from "@/components/atoms/FormSelectSearch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DeviceQuestionsDynamic from "./DeviceQuestionsDynamic";

const DiagnosticoCreateEdit = ({ diagnostico, refreshDiagnosticos }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fechaDiagnostico: diagnostico?.fechaDiagnostico || "",
      descripcion: diagnostico?.descripcion || "",
      idDispositivo: diagnostico?.dispositivo?.idDispositivo || "",
      idEmpleado: diagnostico?.empleado?.idEmpleado || "",
      deviceQuestions: {},
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});

  // Obtener el dispositivo seleccionado para mostrar preguntas
  const dispositivos = watch("idDispositivo");
  const allDispositivos = watch();
  // Suponiendo que el endpoint de dispositivos trae tipoDispositivo en el objeto
  // Si no, habría que hacer un fetch extra
  const selectedDispositivo = allDispositivos?.dispositivos?.find?.(
    d => String(d.idDispositivo) === String(dispositivos)
  );
  const watchTipoDispositivo = selectedDispositivo?.tipoDispositivo?.nombreTipoDispositivo || "";
  const watchDeviceQuestions = watch("deviceQuestions");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setApiErrors({});
    try {
      // Aquí deberías hacer el POST o PUT según corresponda
      // await axios.post(...)
      if (refreshDiagnosticos) refreshDiagnosticos();
    } catch (err) {
      setError("Ocurrió un error al guardar el diagnóstico");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="diagnostico" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="cliente">Cliente</TabsTrigger>
        <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
        <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
        <TabsTrigger value="reparacion">Reparación</TabsTrigger>
        <TabsTrigger value="pagos">Pagos</TabsTrigger>
      </TabsList>
      <TabsContent value="cliente">
        <div className="p-6 text-center text-muted-foreground">Información de cliente (placeholder)</div>
      </TabsContent>
      <TabsContent value="diagnostico">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2">
            <label className="text-sm font-medium">Fecha de diagnóstico *</label>
            <input
              type="date"
              {...register("fechaDiagnostico", { required: "La fecha es obligatoria" })}
              className="w-full mt-1 rounded-md border px-3 py-2 bg-background text-foreground"
            />
            <ErrorMessage message={errors.fechaDiagnostico?.message || apiErrors?.fechaDiagnostico} />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium">Descripción *</label>
            <textarea
              {...register("descripcion", { required: "La descripción es obligatoria" })}
              className="w-full mt-1 rounded-md border px-3 py-2 bg-background text-foreground"
              rows={3}
            />
            <ErrorMessage message={errors.descripcion?.message || apiErrors?.descripcion} />
          </div>
          <div>
            <FormSelectSearch
              label="Dispositivo *"
              endpoint="dispositivos"
              valueKey="idDispositivo"
              displayKey={d => `${d.marcaDispositivo?.descripcionMarcaDispositivo || ''} ${d.modeloDispositivo || ''}`}
              {...register("idDispositivo", { required: "Seleccione un dispositivo" })}
            />
            <ErrorMessage message={errors.idDispositivo?.message || apiErrors?.idDispositivo} />
          </div>
          <div>
            <FormSelectSearch
              label="Técnico *"
              endpoint="empleados"
              valueKey="idEmpleado"
              displayKey={e => `${e.persona?.nombre || ''} ${e.persona?.apellido || ''}`}
              {...register("idEmpleado", { required: "Seleccione un técnico" })}
            />
            <ErrorMessage message={errors.idEmpleado?.message || apiErrors?.idEmpleado} />
          </div>

          {/* Preguntas dinámicas según el tipo de dispositivo */}
          <DeviceQuestionsDynamic
            tipoDispositivo={watchTipoDispositivo}
            value={watchDeviceQuestions}
            onChange={val => setValue("deviceQuestions", val)}
          />
          <div className="col-span-2 flex justify-end mt-3">
            <ButtonDinamicForms initialData={diagnostico} isLoading={isLoading} register />
          </div>
          <div className="col-span-2 flex justify-end">
            <ErrorMessage message={apiErrors?.detail || error} />
          </div>
        </form>
      </TabsContent>
      <TabsContent value="imagenes">
        <div className="p-6 text-center text-muted-foreground">Imágenes (placeholder)</div>
      </TabsContent>
      <TabsContent value="reparacion">
        <div className="p-6 text-center text-muted-foreground">Reparación (placeholder)</div>
      </TabsContent>
      <TabsContent value="pagos">
        <div className="p-6 text-center text-muted-foreground">Pagos (placeholder)</div>
      </TabsContent>
    </Tabs>
  );
};

export default DiagnosticoCreateEdit;
