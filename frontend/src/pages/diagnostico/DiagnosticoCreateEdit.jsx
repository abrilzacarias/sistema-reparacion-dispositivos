import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import FormSelectSearch from "@/components/atoms/FormSelectSearch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DeviceQuestionsDynamic from "./DeviceQuestionsDynamic";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import TipoDispositivoCreateEdit from "./components/TipoDispositivoCreateEdit";
import MarcasCreateEdit from "../configuracion/components/MarcasCreateEdit";
import ModelosCreateEdit from "../configuracion/components/ModelosCreateEdit"
import { Plus } from "lucide-react";

// Función para obtener marcas
const fetchMarcas = async () => {
  const response = await fetch("http://localhost:8000/marcas");
  if (!response.ok) {
    throw new Error("Error fetching marcas");
  }
  return response.json();
};

// ← AGREGAR FUNCIÓN PARA OBTENER MODELOS
const fetchModelos = async () => {
  const response = await fetch("http://localhost:8000/modelos");
  if (!response.ok) {
    throw new Error("Error fetching modelos");
  }
  return response.json();
};

const DiagnosticoCreateEdit = ({ diagnostico, refreshDiagnosticos }) => {
  const isEditMode = !!diagnostico;

  // TanStack Query para marcas
  const {
    data: marcas,
    refetch: refetchMarcas,
    isLoading: isLoadingMarcas,
  } = useQuery({
    queryKey: ["marcas"],
    queryFn: fetchMarcas,
  });

  // ← AGREGAR QUERY PARA MODELOS
  const {
    data: modelos,
    refetch: refetchModelos,
    isLoading: isLoadingModelos,
  } = useQuery({
    queryKey: ["modelos"],
    queryFn: fetchModelos,
  });

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
      fechaDiagnostico: isEditMode ? diagnostico.fechaDiagnostico : new Date().toISOString().split("T")[0],
      descripcion: isEditMode ? diagnostico.descripcion : "",
      idDispositivo: isEditMode ? diagnostico.dispositivo?.idDispositivo : "",
      idEmpleado: isEditMode ? diagnostico.empleado?.idEmpleado : "",
      idCliente: isEditMode ? diagnostico.dispositivo?.cliente?.idCliente : "",
      idTipoDispositivo: isEditMode ? diagnostico.dispositivo?.tipoDispositivo?.idTipoDispositivo : "",
      idMarcaDispositivo: isEditMode ? diagnostico.dispositivo?.marca?.idMarca : "",
      idModeloDispositivo: isEditMode ? diagnostico.dispositivo?.modelo?.idModelo : "",
      deviceQuestions: [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});

  const watchTipoDispositivo = watch("idTipoDispositivo");
  const watchDeviceQuestions = watch("deviceQuestions");
  
  const [questions, setQuestions] = useState([]);

  const handleQuestionsLoaded = (loadedQuestions) => {
    console.log("🔄 Preguntas recibidas en padre:", loadedQuestions);
    setQuestions(loadedQuestions);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setApiErrors({});
    
    try {
      const validationErrors = {};
      if (!data.idEmpleado) validationErrors.idEmpleado = "Técnico es requerido";
      if (!data.idTipoDispositivo) validationErrors.idTipoDispositivo = "Tipo de dispositivo es requerido";
      if (!data.idMarcaDispositivo) validationErrors.idMarcaDispositivo = "Marca es requerida";
      if (!data.idModeloDispositivo) validationErrors.idModeloDispositivo = "Modelo es requerido";
      if (!data.idCliente) validationErrors.idCliente = "Cliente es requerido";
      if (!data.fechaDiagnostico) validationErrors.fechaDiagnostico = "Fecha es requerida";

      if (questions.length > 0) {
        if (!data.deviceQuestions || !Array.isArray(data.deviceQuestions)) {
          validationErrors.deviceQuestions = "No hay respuestas válidas para procesar";
        } else if (data.deviceQuestions.length !== questions.length) {
          validationErrors.deviceQuestions = `Se esperaban ${questions.length} respuestas, pero se recibieron ${data.deviceQuestions.length}`;
        }
      }

      if (Object.keys(validationErrors).length > 0) {
        setApiErrors(validationErrors);
        setError("Por favor complete todos los campos requeridos");
        return;
      }

      let dispositivoId = data.idDispositivo;

      if (!isEditMode) {
        const dispositivoData = {
          idModeloDispositivo: data.idModeloDispositivo,
          idTipoDispositivo: data.idTipoDispositivo,
          idCliente: data.idCliente,
        };

        console.log("🛠️ Creando dispositivo:", dispositivoData);
        const dispositivoRes = await fetch("http://localhost:8000/dispositivo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dispositivoData),
        });

        if (!dispositivoRes.ok) {
          const resText = await dispositivoRes.text();
          throw new Error(`Error creando dispositivo: ${resText}`);
        }

        const dispositivoResData = await dispositivoRes.json();
        dispositivoId = dispositivoResData.idDispositivo;
        console.log("✅ Dispositivo creado con ID:", dispositivoId);
      }

      const idDiagnostico = isEditMode ? diagnostico.idDiagnostico : 0;

      const detalles = data.deviceQuestions.map((respuesta, index) => {
        const pregunta = questions[index];
        if (!pregunta || !respuesta) return null;
        return {
          idDiagnostico: idDiagnostico, 
          idDetalleDiagnostico: 0,
          valorDiagnostico: String(respuesta.valorDiagnostico || ""),
          idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
        };
      }).filter(Boolean);

      const diagnosticoData = {
        fechaDiagnostico: data.fechaDiagnostico,
        descripcion: data.descripcion,
        idDispositivo: dispositivoId,
        idEmpleado: data.idEmpleado,
        detalleDiagnostico: detalles.map(d => ({
          idDiagnostico: d.idDiagnostico || 0,
          idDetalleDiagnostico: d.idDetalleDiagnostico || 0,
          valorDiagnostico: d.valorDiagnostico,
          idTipoDispositivoSegunPregunta: d.idTipoDispositivoSegunPregunta,
        })),
        detalles: detalles.map(d => ({
          idDiagnostico: d.idDiagnostico || 0,
          idDetalleDiagnostico: d.idDetalleDiagnostico || 0,
          valorDiagnostico: d.valorDiagnostico,
          idTipoDispositivoSegunPregunta: d.idTipoDispositivoSegunPregunta,
        })),
      };

      console.log("🧪 Enviando:", JSON.stringify(diagnosticoData, null, 2));

      const url = isEditMode
        ? `http://localhost:8000/diagnostico/diagnostico/${diagnostico.idDiagnostico}`
        : "http://localhost:8000/diagnostico/diagnostico";

      const method = isEditMode ? "PUT" : "POST";

      console.log(`📡 Enviando ${method} a:`, url);
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diagnosticoData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error al guardar diagnóstico: ${errorData}`);
      }

      console.log("✅ Diagnóstico guardado con éxito");
      if (refreshDiagnosticos) refreshDiagnosticos();
      if (!isEditMode) {
        reset();
        setQuestions([]);
      }
      setError("");

    } catch (err) {
      console.error("❌ Error general:", err);
      setError(err.message || "Ocurrió un error al guardar el diagnóstico");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceQuestionsChange = (newAnswers) => {
    console.log("🔄 Actualizando respuestas en formulario:", newAnswers);
    setValue("deviceQuestions", newAnswers, { shouldDirty: true });
  };

  return (
    <Tabs defaultValue="diagnostico" className="w-full">
      <TabsList className="mb-6 w-full">
        <TabsTrigger value="cliente" className="flex-1 rounded-md rounded-r-none">Cliente</TabsTrigger>
        <TabsTrigger value="diagnostico" className="flex-1 rounded-md rounded-l-none">Diagnóstico</TabsTrigger>
      </TabsList>

      <TabsContent value="cliente">
        <div className="p-6 text-center text-muted-foreground">
          Información de cliente (placeholder)
        </div>
      </TabsContent>

      <TabsContent value="diagnostico">
        {console.log("🔍 Valores del formulario:", {
          idEmpleado: watch("idEmpleado"),
          idTipoDispositivo: watch("idTipoDispositivo"),
          idMarcaDispositivo: watch("idMarcaDispositivo"),
          idModeloDispositivo: watch("idModeloDispositivo"),
          fechaDiagnostico: watch("fechaDiagnostico"),
          descripcion: watch("descripcion"),
          deviceQuestions: watch("deviceQuestions")
        })}
        
        {/* Panel de debug visual */}
{/*
  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
    <strong>🐛 Debug - Estado actual:</strong>
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div>Empleado: <code>{watch("idEmpleado") || "sin seleccionar"}</code></div>
      <div>Tipo Dispositivo: <code>{watch("idTipoDispositivo") || "sin seleccionar"}</code></div>
      <div>Preguntas cargadas: <code>{questions.length}</code></div>
      <div>Respuestas: <code>{Array.isArray(watch("deviceQuestions")) ? watch("deviceQuestions").length : 0}</code></div>
      <div>Modo: <code>{isEditMode ? 'Edición' : 'Creación'}</code></div>
      <div>ID Diagnóstico: <code>{diagnostico?.idDiagnostico || 'N/A'}</code></div>
    </div>
  </div>
*/}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormSelectSearch
                label="Técnico *"
                endpoint="empleados"
                valueKey="idEmpleado"
                displayKey={(e) => `${e.persona?.nombre || ""} ${e.persona?.apellido || ""}`}
                value={watch("idEmpleado")}
                setValue={(value) => setValue("idEmpleado", value)}
                {...register("idEmpleado", { required: "Seleccione un técnico" })}
              />
              <ErrorMessage message={errors.idEmpleado?.message || apiErrors?.idEmpleado} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormSelectSearch
                label="Cliente *"
                endpoint="clientes"
                valueKey="idCliente"
                displayKey={(e) => `${e.persona?.nombre || ""} ${e.persona?.apellido || ""}`}
                value={watch("idCliente")}
                setValue={(value) => setValue("idCliente", value)}
                {...register("idCliente", { required: "Seleccione un cliente" })}
              />
              <ErrorMessage message={errors.idCliente?.message || apiErrors?.idCliente} />
            </div>
          </div>          

          <div className="border rounded-lg p-4 bg-gray-50/50">
            <h3 className="font-medium text-sm text-muted-foreground mb-3 border-b pb-2">
              Información del Dispositivo
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <FormSelectSearch
                      label="Tipo de Dispositivo *"
                      endpoint="tipo-dispositivo"
                      valueKey="idTipoDispositivo"
                      displayKey={(d) => d.nombreTipoDispositivo}
                      value={watch("idTipoDispositivo")}
                      setValue={(value) => setValue("idTipoDispositivo", value)}
                      {...register("idTipoDispositivo", { required: "Seleccione un tipo de dispositivo" })}
                    />
                    <ErrorMessage
                      message={errors.idTipoDispositivo?.message || apiErrors?.idTipoDispositivo}
                    />
                  </div>
                  <ModalFormTemplate
                    title="Nuevo tipo de dispositivo"
                    description="Agregar un nuevo tipo de dispositivo"
                    variant="default"
                    icon={Plus}
                    className="p-2 m-0 cursor-pointer"
                    contentClassName="max-w-8xl h-auto max-w-4xl max-h-[90vh] overflow-y-auto"
                  >
                    <TipoDispositivoCreateEdit />
                  </ModalFormTemplate>
                </div>
              </div>

              {/* ← MODIFICAR ESTA SECCIÓN PARA MARCA */}
              <div className="col-span-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <FormSelectSearch
                      label="Marca *"
                      endpoint="marcas"
                      valueKey="idMarcaDispositivo"
                      displayKey={(d) => d.descripcionMarcaDispositivo || ""}
                      value={watch("idMarcaDispositivo")}
                      setValue={(value) => setValue("idMarcaDispositivo", value)}
                      {...register("idMarcaDispositivo", { required: "Seleccione una marca" })}
                    />
                    <ErrorMessage message={errors.idMarcaDispositivo?.message || apiErrors?.idMarcaDispositivo} />
                  </div>
                  <ModalFormTemplate
                    icon={Plus}
                    title="Agregar Marca"
                    description="Complete los campos para agregar una nueva marca de dispositivo."
                    variant="default"
                    className="p-2 m-0 cursor-pointer"
                  >
                    <MarcasCreateEdit refreshMarcas={refetchMarcas} />
                  </ModalFormTemplate>
                </div>
              </div>

              {/* ← MODIFICAR ESTA SECCIÓN PARA MODELO */}
              <div className="col-span-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <FormSelectSearch
                      label="Modelo *"
                      endpoint="modelos"
                      valueKey="idModeloDispositivo"
                      displayKey={(d) => d.descripcionModeloDispositivo || ""}
                      value={watch("idModeloDispositivo")}
                      setValue={(value) => setValue("idModeloDispositivo", value)}
                      {...register("idModeloDispositivo", { required: "Seleccione un modelo" })}
                    />
                    <ErrorMessage message={errors.idModeloDispositivo?.message || apiErrors?.idModeloDispositivo} />
                  </div>
                  <ModalFormTemplate
                    icon={Plus}
                    title="Agregar Modelo"
                    description="Complete los campos para agregar un nuevo modelo de dispositivo."
                    variant="default"
                    className="p-2 m-0 cursor-pointer"
                  >
                    <ModelosCreateEdit refreshModelos={refetchModelos} />
                  </ModalFormTemplate>
                </div>
              </div>
            </div>

            {watchTipoDispositivo && (
              <div className="border rounded-lg p-4 mt-4">
                <DeviceQuestionsDynamic
                  tipoDispositivo={watchTipoDispositivo}
                  value={watchDeviceQuestions}
                  onChange={handleDeviceQuestionsChange}
                  diagnosticoId={diagnostico?.idDiagnostico}
                  onQuestionsLoaded={handleQuestionsLoaded}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <ErrorMessage message={error} />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isLoading}
            >
              Limpiar
            </Button>
            <ButtonDinamicForms 
              initialData={diagnostico} 
              isLoading={isLoading} 
              register 
            />
          </div>
        </form>
      </TabsContent>

    </Tabs>
  );
};

export default DiagnosticoCreateEdit;