import { useState, useEffect } from 'react';

const DeviceQuestionsDynamic = ({ tipoDispositivo, value = {}, onChange, diagnosticoId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar preguntas según tipo de dispositivo
  useEffect(() => {
    if (!tipoDispositivo) {
      setQuestions([]);
      onChange({});
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

          setQuestions(questionsWithDetails.filter(Boolean));
        } else {
          setQuestions(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [tipoDispositivo, onChange]);

  // Cargar respuestas existentes si diagnosticoId existe
  useEffect(() => {
    if (!diagnosticoId || questions.length === 0) return;

    const loadExistingAnswers = async () => {
      try {
        const response = await fetch(`/api/diagnosticos/${diagnosticoId}/detalles`);
        if (!response.ok) return;

        const detalles = await response.json();
        const existingAnswers = {};
        detalles.forEach((detalle) => {
          const index = questions.findIndex(
            q => q.idTipoDispositivoSegunPregunta === detalle.idTipoDispositivoSegunPregunta
          );
          if (index !== -1) {
            existingAnswers[index] = detalle.valorDiagnostico;
          }
        });
        onChange(existingAnswers);
      } catch (err) {
        console.error('❌ Error loading existing answers:', err);
      }
    };

    loadExistingAnswers();
  }, [diagnosticoId, questions, onChange]);

  const handleAnswerChange = (index, answer) => {
    onChange({ ...value, [index]: answer });
  };

  const renderQuestionInput = (question, index) => {
    const tipo = question.preguntaDiagnostico?.tipoPregunta?.toUpperCase();

    switch (tipo) {
      case 'TEXTO':
      case 'TEXT':
        return (
          <input
            type="text"
            value={value[index] || ''}
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
            value={value[index] || ''}
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
                  checked={value[index] === val}
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
            value={value[index] || ''}
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
              {question.preguntaDiagnostico?.esObligatoria && (
                <span className="text-red-500"> *</span>
              )}
            </label>

            {renderQuestionInput(question, index)}

            {/* Debug info: opcional */}
            {/* <details className="text-xs text-gray-500">
              <summary>Debug</summary>
              <pre>{JSON.stringify(question, null, 2)}</pre>
            </details> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceQuestionsDynamic;
