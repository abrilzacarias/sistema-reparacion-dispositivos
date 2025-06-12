import { useState, useEffect } from 'react';

const DeviceQuestionsDynamic = ({ tipoDispositivo, value = [], onChange, diagnosticoId, onQuestionsLoaded }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar preguntas según tipo de dispositivo
  useEffect(() => {
    if (!tipoDispositivo) {
      setQuestions([]);
      onChange([]);
      return;
    }

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `http://localhost:8000/tipo-dispositivo-segun-pregunta/por-tipo-dispositivo/${tipoDispositivo}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

        const data = await response.json();
        console.log('📋 Datos cargados del API:', data);

        let processedQuestions = [];

        if (data.length > 0 && !data[0].preguntaDiagnostico) {
          const questionsWithDetails = await Promise.all(
            data.map(async (item) => {
              try {
                const res = await fetch(`http://localhost:8000/preguntasDiagnostico/${item.idPreguntaDiagnostico}`);
                if (!res.ok) return null;
                const q = await res.json();
                return {
                  idTipoDispositivoSegunPregunta: item.idTipoDispositivoSegunPregunta,
                  idPreguntaDiagnostico: item.idPreguntaDiagnostico,
                  preguntaDiagnostico: {
                    idPreguntaDiagnostico: q.idPreguntaDiagnostico,
                    textoPregunta: q.descripcionPreguntaDiagnostico,
                    tipoPregunta: q.tipoDatoPreguntaDiagnostico?.descripcionTipoDatoPreguntaDiagnostico?.toUpperCase(),
                    opcionesPregunta: q.opcionesPregunta ?? [],
                    esObligatoria: q.esObligatoria ?? true,
                  },
                };
              } catch {
                return null;
              }
            })
          );

          processedQuestions = questionsWithDetails.filter(Boolean);
          console.log('❓ Preguntas procesadas:', processedQuestions);
        } else {
          console.log('❓ Preguntas directas:', data);
          processedQuestions = data;
        }

        setQuestions(processedQuestions);

      } catch (err) {
        console.error('❌ Error cargando preguntas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [tipoDispositivo]);

  // Cargar respuestas existentes si diagnosticoId existe
  useEffect(() => {
    if (!diagnosticoId || questions.length === 0) return;

    const loadExistingAnswers = async () => {
      try {
        const response = await fetch(`/api/diagnosticos/${diagnosticoId}/detalles`);
        if (!response.ok) return;

        const detalles = await response.json();
        console.log('🔄 Respuestas existentes cargadas:', detalles);
        
        const answers = questions.map((q) => {
          const encontrado = detalles.find(
            (d) => d.idTipoDispositivoSegunPregunta === q.idTipoDispositivoSegunPregunta
          );
          return encontrado
            ? {
                valorDiagnostico: encontrado.valorDiagnostico,
                idDiagnostico: diagnosticoId,
                idTipoDispositivoSegunPregunta: encontrado.idTipoDispositivoSegunPregunta,
              }
            : {
                valorDiagnostico: '',
                idDiagnostico: diagnosticoId,
                idTipoDispositivoSegunPregunta: q.idTipoDispositivoSegunPregunta,
              };
        });

        console.log('💾 Respuestas mapeadas:', answers);
        onChange(answers);
      } catch (err) {
        console.error('❌ Error loading existing answers:', err);
      }
    };

    loadExistingAnswers();
  }, [diagnosticoId, questions]);

  // Notificar al padre cuando las preguntas cambien
  useEffect(() => {
    if (onQuestionsLoaded) {
      console.log("📡 Notificando preguntas cargadas al padre:", questions);
      onQuestionsLoaded(questions);
    }
  }, [questions]);

  // Inicializar respuestas vacías cuando se cargan las preguntas por primera vez
  useEffect(() => {
    if (questions.length > 0 && (!value || value.length === 0) && !diagnosticoId) {
      const initialAnswers = questions.map((q) => ({
        valorDiagnostico: '',
        idDiagnostico: 0,
        idTipoDispositivoSegunPregunta: q.idTipoDispositivoSegunPregunta,
      }));
      
      console.log('🔄 Inicializando respuestas vacías:', initialAnswers);
      onChange(initialAnswers);
    }
  }, [questions, diagnosticoId]);

  const handleAnswerChange = (index, answer) => {
    // Asegurar que value sea array
    const updated = Array.isArray(value) ? [...value] : [];
    const pregunta = questions[index];
    
    // LOG PRINCIPAL: Ver qué pregunta se está respondiendo
    console.log('✅ RESPUESTA CAMBIADA:');
    console.log('  📝 Pregunta:', pregunta.preguntaDiagnostico?.textoPregunta);
    console.log('  🆔 ID Pregunta:', pregunta.idPreguntaDiagnostico);
    console.log('  📍 Índice:', index);
    console.log('  💬 Respuesta:', answer);
    console.log('  🔗 ID Relación:', pregunta.idTipoDispositivoSegunPregunta);

    // Asegurar que el array tenga el tamaño correcto
    while (updated.length <= index) {
      updated.push({
        valorDiagnostico: '',
        idDiagnostico: diagnosticoId ?? 0,
        idTipoDispositivoSegunPregunta: 0,
      });
    }

    updated[index] = {
      valorDiagnostico: answer,
      idDiagnostico: diagnosticoId ?? 0,
      idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
    };

    console.log('📊 Todas las respuestas actualizadas:', updated);
    onChange(updated);
  };

  const renderQuestionInput = (question, index) => {
    const tipo = question.preguntaDiagnostico?.tipoPregunta?.toUpperCase();

    switch (tipo) {
      case 'TEXTO':
      case 'TEXT':
        return (
          <input
            type="text"
            value={value[index]?.valorDiagnostico || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
            placeholder="Ingrese su respuesta..."
          />
        );

      case 'NUMERO':
      case 'NUMBER':
        return (
          <input
            type="number"
            value={value[index]?.valorDiagnostico || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
            placeholder="Ingrese un número..."
          />
        );

      case 'BOOLEAN':
      case 'BOOL':
      case 'BOOLEANO':
        return (
          <div className="flex gap-4">
            {['true', 'false'].map((val) => (
              <label key={val} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question_${index}`}
                  value={val}
                  checked={value[index]?.valorDiagnostico === val}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                {val === 'true' ? 'Sí' : 'No'}
              </label>
            ))}
          </div>
        );

      case 'OPCION':
      case 'MULTIPLE':
        const opciones = question.preguntaDiagnostico?.opcionesPregunta;
        return Array.isArray(opciones) && opciones.length > 0 ? (
          <select
            value={value[index]?.valorDiagnostico || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
          >
            <option value="">Seleccione una opción...</option>
            {opciones.map((opcion, idx) => (
              <option key={idx} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        ) : (
          <div className="text-sm text-muted-foreground">Opciones no configuradas.</div>
        );

      default:
        return (
          <div className="text-sm text-muted-foreground">
            Tipo de pregunta no soportado: {tipo || 'undefined'}
          </div>
        );
    }
  };

  // LOG cuando cambian las props principales (solo para debug)
  useEffect(() => {
    console.log('🔄 Props cambiadas:');
    console.log('  🖥️ Tipo Dispositivo:', tipoDispositivo);
    console.log('  🆔 Diagnóstico ID:', diagnosticoId);
    console.log('  📋 Value actual:', value);
    console.log('  ❓ Preguntas cargadas:', questions.length);
  }, [tipoDispositivo, diagnosticoId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Diagnóstico Específico del Dispositivo
        </h3>
        <div className="text-sm text-muted-foreground">Cargando preguntas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Diagnóstico Específico del Dispositivo
        </h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground">
          Diagnóstico Específico del Dispositivo
        </h3>
        <div className="text-sm text-muted-foreground">
          No hay preguntas configuradas para este tipo de dispositivo.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-muted-foreground border-b pb-2">
        Diagnóstico Específico del Dispositivo
      </h3>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.idTipoDispositivoSegunPregunta} className="space-y-2">
            <label className="text-sm font-medium">
              {question.preguntaDiagnostico?.textoPregunta || 'Pregunta sin texto'}
              {question.preguntaDiagnostico?.esObligatoria && <span className="text-red-500"> *</span>}
            </label>

            {renderQuestionInput(question, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceQuestionsDynamic;