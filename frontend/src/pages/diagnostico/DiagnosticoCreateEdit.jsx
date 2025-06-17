import { useEffect } from "react"; // asegurate de importar esto si no lo tenés
import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";   // <--- Importar axios aquí
import { Button } from "@/components/ui/button";
import ButtonDinamicForms from "@/components/atoms/ButtonDinamicForms";
import ErrorMessage from "@/components/atoms/ErrorMessage";
import FormSelectSearch from "@/components/atoms/FormSelectSearch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DeviceQuestionsDynamic from "./DeviceQuestionsDynamic";
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate";
import TipoDispositivoCreateEdit from "./components/TipoDispositivoCreateEdit";
import DispositivoCreateEdit from "../configuracion/components/DispositivoCreateEdit";
import MarcasCreateEdit from "../configuracion/components/MarcasCreateEdit";
import ModelosCreateEdit from "../configuracion/components/ModelosCreateEdit"
import { Plus } from "lucide-react";
import { ToastMessageCreate } from "@/components/atoms/ToastMessage";
import { useNavigate } from "react-router-dom";

// Función para obtener marcas
const fetchMarcas = async () => {
  const response = await fetch("http://localhost:8000/marcas");
  if (!response.ok) {
    throw new Error("Error fetching marcas");
  }
  return response.json();
};

const fetchModelos = async () => {
  const response = await fetch("http://localhost:8000/modelos");
  if (!response.ok) {
    throw new Error("Error fetching modelos");
  }
  return response.json();
};

const DiagnosticoCreateEdit = ({ diagnostico, refreshDiagnosticos }) => {
  const isEditMode = !!diagnostico;
  const navigate = useNavigate();

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
      descripcionDiagnostico: isEditMode ? diagnostico.descripcionDiagnostico : "",
      idDispositivo: isEditMode ? diagnostico.dispositivo?.idDispositivo : "",
      idEmpleado: isEditMode ? diagnostico.empleado?.idEmpleado : "",
      idCliente: isEditMode ? diagnostico.dispositivo?.cliente?.idCliente : "",
      idTipoDispositivo: isEditMode ? diagnostico.dispositivo?.tipoDispositivo?.idTipoDispositivo : "",
      idMarcaDispositivo: isEditMode ? diagnostico.dispositivo?.marca?.idMarcaDispositivo : "",
      idModeloDispositivo: isEditMode ? diagnostico.dispositivo?.modelo?.idModeloDispositivo : "",
      deviceQuestions: [],
    },
  });

  // Primero declaramos idTipoDispositivo y demás para usarlos abajo
  const idTipoDispositivo = watch("idTipoDispositivo");
  const [idMarcaDispositivo, setIdMarcaDispositivo] = useState("");
  const watchDeviceQuestions = watch("deviceQuestions");

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});

  const {
    data: marcas,
    isLoading: isLoadingMarcas,
    error: errorMarcas,
    refetch: refetchMarcas,
  } = useQuery({
    queryKey: ["marcas"],
    queryFn: fetchMarcas,
    enabled: true,
  });

// Query para marcas según tipo de dispositivo
const {
  data: marcasPorTipo,
  isLoading: isLoadingMarcasPorTipo,
  error: errorMarcasPorTipo,
} = useQuery({
  queryKey: ["marcasPorTipo", idTipoDispositivo],
  queryFn: () =>
    axios
      .get(`http://localhost:8000/marcas/marcas-por-tipo/${idTipoDispositivo}`)
      .then((res) => {
        console.log("📦 Marcas por tipo recibidas (idTipoDispositivo:", idTipoDispositivo, "):", res.data);
        return res.data;
      }),
  enabled: !!idTipoDispositivo,
});


  const fetchModelosPorMarca = async (idMarcaDispositivo) => {
    try {
      const res = await axios.get(`/modelos/modelos-por-marca/${idMarcaDispositivo}`);
      console.log("fetchModelosPorMarca - datos recibidos:", res.data);
      return res.data;
    } catch (error) {
      console.error("fetchModelosPorMarca - error:", error);
      throw error;
    }
  };

  // Query para modelos según marca seleccionada
  const {
    data: modelosPorTipoYMarca,
    isLoading: isLoadingModelos,
    error: errorModelos,
    refetch: refetchModelos,
  } = useQuery({
    queryKey: ["modelosPorTipoyMarca", idTipoDispositivo, idMarcaDispositivo],
    queryFn: () =>
      axios
        .get(`http://localhost:8000/modelos/modelos-por-tipo-y-marca/`, {
          params: {
            id_tipo: idTipoDispositivo,
            id_marca: idMarcaDispositivo,
          },
        })
        .then((res) => {
          console.log("📦 Modelos recibidos:", res.data);
          return res.data;
        }),
    enabled: !!idTipoDispositivo && !!idMarcaDispositivo,
  });


  
    // 🔍 Logs para depuración
  useEffect(() => {
    if (marcas) {
      console.log("📦 Todas las marcas recibidas:", marcas);
    }
  }, [marcas]);
useEffect(() => {
  if (idMarcaDispositivo) {
    setValue("idMarcaDispositivo", idMarcaDispositivo);
  }
}, [idMarcaDispositivo, setValue]);
  useEffect(() => {
    if (marcasPorTipo) {
      console.log("📦 Marcas por tipo recibidas (idTipoDispositivo:", idTipoDispositivo, "):", marcasPorTipo);
    }
  }, [marcasPorTipo, idTipoDispositivo]);
  console.log(marcasPorTipo)
  useEffect(() => {
    if (modelosPorTipoYMarca) {
      console.log("📦 Modelos por marca recibidos (idMarcaDispositivo:", idMarcaDispositivo, "):", modelosPorTipoYMarca);
    }
  }, [modelosPorTipoYMarca, idMarcaDispositivo]);

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
      if (!data.descripcionDiagnostico.trim()) validationErrors.descripcionDiagnostico = "Descripción es requerida";
      console.log("🔍 Datos recibidos para validación:", data);
      // En modo edición, validamos técnico y descripción
      if (!isEditMode) {
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

      // Preparar datos del diagnóstico
      let diagnosticoData;
      
      if (isEditMode) {
        // En modo edición incluimos la descripción
        diagnosticoData = {
          fechaDiagnostico: diagnostico.fechaDiagnostico,
          descripcionDiagnostico: data.descripcionDiagnostico,
          idDispositivo: diagnostico.dispositivo?.idDispositivo,
          idEmpleado: data.idEmpleado,
        };
      } else {
        // Lógica completa para creación
        const idDiagnostico = 0;
        const detalles = data.deviceQuestions.map((respuesta, index) => {
          const pregunta = questions[index];
          if (!pregunta || !respuesta) return null;
          
          return {
            idDiagnostico: idDiagnostico, 
            idDetalleDiagnostico: 0,
            valorDiagnostico: String(respuesta.valorDiagnostico || ""),
            idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
            tipoDispositivoSegunPregunta: {
              idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
              idPreguntaDiagnostico: pregunta.idPreguntaDiagnostico,
              idTipoDispositivo: idTipoDispositivo, // ✅ AGREGAR ESTE CAMPO QUE FALTA
              preguntaDiagnostico: {
                idPreguntaDiagnostico: pregunta.preguntaDiagnostico.idPreguntaDiagnostico,
                textoPregunta: pregunta.preguntaDiagnostico.textoPregunta,
                tipoPregunta: pregunta.preguntaDiagnostico.tipoPregunta,
                opcionesPregunta: pregunta.preguntaDiagnostico.opcionesPregunta || [],
                esObligatoria: pregunta.preguntaDiagnostico.esObligatoria,
                descripcionPreguntaDiagnostico: pregunta.preguntaDiagnostico.textoPregunta, // ✅ AGREGAR ESTE CAMPO
                idTipoDatoPreguntaDiagnostico: pregunta.preguntaDiagnostico.tipoPregunta === "BOOLEANO" ? 1 : 2 // ✅ AGREGAR ESTE CAMPO
              }
            }
          };
        }).filter(Boolean);

        diagnosticoData = {
          fechaDiagnostico: data.fechaDiagnostico,
          descripcionDiagnostico: data.descripcionDiagnostico,
          idDispositivo: dispositivoId,
          idEmpleado: data.idEmpleado,
          detalleDiagnostico: detalles.map(d => ({
            idDiagnostico: d.idDiagnostico || 0,
            idDetalleDiagnostico: d.idDetalleDiagnostico || 0,
            valorDiagnostico: d.valorDiagnostico,
            idTipoDispositivoSegunPregunta: d.idTipoDispositivoSegunPregunta,
            tipoDispositivoSegunPregunta: d.tipoDispositivoSegunPregunta,
          })),
          detalles: detalles.map(d => ({
            idDiagnostico: d.idDiagnostico || 0,
            idDetalleDiagnostico: d.idDetalleDiagnostico || 0,
            valorDiagnostico: d.valorDiagnostico,
            idTipoDispositivoSegunPregunta: d.idTipoDispositivoSegunPregunta,
            tipoDispositivoSegunPregunta: d.tipoDispositivoSegunPregunta,
          })),
        };
      }

      console.log("🧪 Enviando:", JSON.stringify(diagnosticoData, null, 2));

      // Set the correct URL based on API documentation
      let url;
      let method;
      
      if (isEditMode) {
        // Use the exact endpoint from API documentation: PUT /diagnostico/{idDiagnostico}
        url = `http://localhost:8000/diagnostico/${diagnostico.idDiagnostico}`;
        method = "PUT";
        console.log(`📝 Edit mode: Using API documented endpoint: ${url}`);
      } else {
        // For creation, keep the original endpoint
        url = "http://localhost:8000/diagnostico/diagnostico";
        method = "POST";
        console.log(`🆕 Create mode: Using endpoint: ${url}`);
      }

      console.log(`📡 Enviando ${method} a:`, url);
      
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(diagnosticoData),
      });

      console.log(`📊 Response status: ${response.status}`);
      console.log(`📊 Response headers:`, response.headers);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.text();
          console.log("🔍 Error response body:", errorData);
          
          // Try to parse as JSON first
          try {
            const jsonError = JSON.parse(errorData);
            errorMessage = jsonError.detail || jsonError.message || errorMessage;
          } catch {
            // If not JSON, use the text as is
            errorMessage = errorData || errorMessage;
          }
        } catch (e) {
          console.error("Error reading response:", e);
        }
        
        // Provide specific error messages for common HTTP status codes
        if (response.status === 404) {
          if (isEditMode) {
            errorMessage = `El diagnóstico con ID ${diagnostico.idDiagnostico} no fue encontrado. Posiblemente fue eliminado o el endpoint de actualización no existe.`;
          } else {
            errorMessage = "El endpoint para crear diagnósticos no fue encontrado.";
          }
        } else if (response.status === 400) {
          errorMessage = `Datos inválidos: ${errorMessage}`;
        } else if (response.status === 500) {
          errorMessage = "Error interno del servidor. Verifique los logs del backend.";
        }
        
        throw new Error(errorMessage);
      }

      // Success handling
      if (refreshDiagnosticos) refreshDiagnosticos();
      if (!isEditMode) {
        reset();
        setQuestions([]);
      }
      setError("");

      ToastMessageCreate();
      navigate("/diagnosticos");
      
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      {/* En modo edición: mostrar técnico y descripción */}
      {isEditMode ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del Diagnóstico *
              </label>
              <textarea
                {...register("descripcionDiagnostico", { 
                  required: "La descripción es requerida",
                  minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" }
                })}
                className="w-full p-3 border border-gray-300 rounded-md resize-vertical min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese una descripción detallada del diagnóstico realizado..."
                rows={4}
              />
              <ErrorMessage message={errors.descripcionDiagnostico?.message || apiErrors?.descripcionDiagnostico} />
            </div>
          </div>
        </div>
      ) : (
        /* En modo creación: mostrar todos los campos */
        <>
          <div className="grid grid-cols-2 w-full gap-4">
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
                    <DispositivoCreateEdit />
                  </ModalFormTemplate>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <FormSelectSearch
                      label="Marca *"
                      data={marcasPorTipo}
                      valueKey="idMarcaDispositivo"
                      displayKey={(d) => d.descripcionMarcaDispositivo}
                      value={idMarcaDispositivo}
                      setValue={setIdMarcaDispositivo}
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

              <div className="col-span-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <FormSelectSearch
                      label="Modelo *"
                      data={modelosPorTipoYMarca} // 👈 en vez de endpoint
                      valueKey="idModeloDispositivo"
                      displayKey={(d) => d.descripcionModeloDispositivo || ""}
                      value={watch("idModeloDispositivo")}
                      setValue={(value) => setValue("idModeloDispositivo", value)}
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

            {idTipoDispositivo && (
              <div className="border rounded-lg p-4 mt-4">
                <DeviceQuestionsDynamic
                  tipoDispositivo={idTipoDispositivo}
                  value={watchDeviceQuestions}
                  onChange={handleDeviceQuestionsChange}
                  diagnosticoId={diagnostico?.idDiagnostico}
                  onQuestionsLoaded={handleQuestionsLoaded}
                />
              </div>
            )}
          </div>

          {/* Campo de descripción para modo creación - Al final después de toda la información del dispositivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción del Diagnóstico *
            </label>
            <textarea
              {...register("descripcionDiagnostico", { 
                required: "La descripción es requerida",
                minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" }
              })}
              className="w-full p-3 border border-gray-300 rounded-md resize-vertical min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingrese una descripción detallada del diagnóstico realizado..."
              rows={4}
            />
            <ErrorMessage message={errors.descripcionDiagnostico?.message || apiErrors?.descripcionDiagnostico} />
          </div>
        </>
      )}

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
          {isEditMode ? "Cancelar" : "Limpiar"}
        </Button>
        <ButtonDinamicForms 
          initialData={diagnostico} 
          isLoading={isLoading} 
          register 
        />
      </div>
    </form>
  );
};

export default DiagnosticoCreateEdit;