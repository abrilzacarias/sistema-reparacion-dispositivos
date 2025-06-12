import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
      fechaDiagnostico: diagnostico?.fechaDiagnostico || new Date().toISOString().split('T')[0],
      descripcion: diagnostico?.descripcion || "",
      idDispositivo: diagnostico?.dispositivo?.idDispositivo || "",
      idEmpleado: diagnostico?.empleado?.idEmpleado || "",
      idTipoDispositivo: diagnostico?.dispositivo?.tipoDispositivo?.idTipoDispositivo || "",
      idMarca: diagnostico?.dispositivo?.marca?.idMarca || "",
      idModelo: diagnostico?.dispositivo?.modelo?.idModelo || "",
      deviceQuestions: {},
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiErrors, setApiErrors] = useState({});

  // Watch para las preguntas dinámicas
  const watchTipoDispositivo = watch("idTipoDispositivo");
  const watchDeviceQuestions = watch("deviceQuestions");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setApiErrors({});
    
    try {
      // Preparar datos del diagnóstico
      const diagnosticoData = {
        fechaDiagnostico: data.fechaDiagnostico,
        descripcion: data.descripcion,
        idDispositivo: data.idDispositivo,
        idEmpleado: data.idEmpleado,
      };

      let savedDiagnostico;
      
      if (diagnostico?.idDiagnostico) {
        // Actualizar diagnóstico existente
        const response = await fetch(`/api/diagnosticos/${diagnostico.idDiagnostico}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(diagnosticoData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al actualizar');
        }
        
        savedDiagnostico = await response.json();
      } else {
        // Crear nuevo diagnóstico
        const response = await fetch('/api/diagnosticos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(diagnosticoData)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al crear');
        }
        
        savedDiagnostico = await response.json();
      }

      // Guardar respuestas de las preguntas dinámicas
      await saveDeviceQuestions(savedDiagnostico.idDiagnostico, data.deviceQuestions);
      
      if (refreshDiagnosticos) refreshDiagnosticos();
      
      // Mostrar mensaje de éxito
      setError(""); // Limpiar errores
      
    } catch (err) {
      console.error('Error saving diagnosis:', err);
      
      if (err.response?.data?.errors) {
        setApiErrors(err.response.data.errors);
      } else {
        setError(err.message || "Ocurrió un error al guardar el diagnóstico");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveDeviceQuestions = async (diagnosticoId, questionsAnswers) => {
    if (!questionsAnswers || Object.keys(questionsAnswers).length === 0) {
      return;
    }

    try {
      // Primero, obtener las preguntas para este tipo de dispositivo
      const questionsResponse = await fetch(`/api/preguntas-diagnostico/por-tipo-dispositivo/${watchTipoDispositivo}`);
      if (!questionsResponse.ok) return;
      
      const questions = await questionsResponse.json();
      
      // Preparar los detalles del diagnóstico
      const detalles = Object.entries(questionsAnswers).map(([index, answer]) => {
        const question = questions[parseInt(index)];
        if (!question) return null;
        
        return {
          idDiagnostico: diagnosticoId,
          idTipoDispositivoSegunPregunta: question.idTipoDispositivoSegunPregunta,
          valorDiagnostico: String(answer) // Convertir a string para la BD
        };
      }).filter(Boolean);

      if (detalles.length === 0) return;

      // Eliminar detalles existentes si estamos editando
      if (diagnostico?.idDiagnostico) {
        await fetch(`/api/diagnosticos/${diagnosticoId}/detalles`, {
          method: 'DELETE'
        });
      }

      // Guardar nuevos detalles
      await fetch('/api/detalles-diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ detalles })
      });

    } catch (err) {
      console.error('Error saving device questions:', err);
      // No lanzar error aquí para no interrumpir el flujo principal
    }
  };

  const handleDeviceQuestionsChange = (newAnswers) => {
    setValue("deviceQuestions", newAnswers, { shouldDirty: true });
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
        <div className="p-6 text-center text-muted-foreground">
          Información de cliente (placeholder)
        </div>
      </TabsContent>
      
      <TabsContent value="diagnostico">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
          
          {/* Información básica del diagnóstico */}
          <div className="grid grid-cols-2 gap-4">

            {/* Técnico */}
            <div>
              <FormSelectSearch
                label="Técnico *"
                endpoint="empleados"
                valueKey="idEmpleado"
                displayKey={e => `${e.persona?.nombre || ''} ${e.persona?.apellido || ''}`}
                value={watch("idEmpleado")}
                setValue={(value) => setValue("idEmpleado", value)}
                {...register("idEmpleado", { required: "Seleccione un técnico" })}
              />
              <ErrorMessage message={errors.idEmpleado?.message || apiErrors?.idEmpleado} />
            </div>
          </div>

          {/* Información del dispositivo */}
          <div className="border rounded-lg p-4 bg-gray-50/50">
            <h3 className="font-medium text-sm text-muted-foreground mb-3 border-b pb-2">
              Información del Dispositivo
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Tipo de Dispositivo */}
              <div className="col-span-2">
                <FormSelectSearch
                  label="Tipo de Dispositivo *"
                  endpoint="tipo-dispositivo"
                  valueKey="idTipoDispositivo"
                  displayKey={d => d.nombreTipoDispositivo}
                  value={watch("idTipoDispositivo")}
                  setValue={(value) => setValue("idTipoDispositivo", value)}
                  {...register("idTipoDispositivo", { required: "Seleccione un tipo de dispositivo" })}
                />
                <ErrorMessage message={errors.idTipoDispositivo?.message || apiErrors?.idTipoDispositivo} />
              </div>

              {/* Marca */}
              <div>
                <FormSelectSearch
                  label="Marca *"
                  endpoint="marcas"
                  valueKey="idMarca"
                  displayKey={d => `${d.descripcionMarcaDispositivo || ''}`}
                  value={watch("idMarca")}
                  setValue={(value) => setValue("idMarca", value)}
                  {...register("idMarca", { required: "Seleccione una marca" })}
                />
                <ErrorMessage message={errors.idMarca?.message || apiErrors?.idMarca} />
              </div>

              {/* Modelo */}
              <div>
                <FormSelectSearch
                  label="Modelo *"
                  endpoint="modelos"
                  valueKey="idModelo"
                  displayKey={d => `${d.descripcionModeloDispositivo || ''}`}
                  value={watch("idModelo")}
                  setValue={(value) => setValue("idModelo", value)}
                  {...register("idModelo", { required: "Seleccione un modelo" })}
                />
                <ErrorMessage message={errors.idModelo?.message || apiErrors?.idModelo} />
              </div>
            </div>
                      {/* Preguntas dinámicas del dispositivo */}
          {watchTipoDispositivo && (
            <div className="border rounded-lg p-4">
              <DeviceQuestionsDynamic
                tipoDispositivo={watchTipoDispositivo}
                value={watchDeviceQuestions}
                onChange={handleDeviceQuestionsChange}
                diagnosticoId={diagnostico?.idDiagnostico}
              />
            </div>
          )}
          </div>

          {/* Descripción general */}
          <div>
            <label className="text-sm font-medium">Descripción del Problema *</label>
            <textarea
              {...register("descripcion", { required: "La descripción es obligatoria" })}
              className="w-full mt-1 rounded-md border px-3 py-2 bg-background text-foreground"
              rows={4}
              placeholder="Describa el problema reportado por el cliente..."
            />
            <ErrorMessage message={errors.descripcion?.message || apiErrors?.descripcion} />
          </div>



          {/* Error general */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <ErrorMessage message={error} />
            </div>
          )}

          {/* Botones de acción */}
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
      
      <TabsContent value="imagenes">
        <div className="p-6 text-center text-muted-foreground">
          Imágenes (placeholder)
        </div>
      </TabsContent>
      
      <TabsContent value="reparacion">
        <div className="p-6 text-center text-muted-foreground">
          Reparación (placeholder)
        </div>
      </TabsContent>
      
      <TabsContent value="pagos">
        <div className="p-6 text-center text-muted-foreground">
          Pagos (placeholder)
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DiagnosticoCreateEdit;