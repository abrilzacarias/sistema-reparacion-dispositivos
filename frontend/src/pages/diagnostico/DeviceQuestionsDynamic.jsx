import { useState, useEffect } from 'react';

// Datos mock temporales
const mockQuestions = {
  1: [ // Smartphones
    {
      idTipoDispositivoSegunPregunta: 1,
      preguntaDiagnostico: {
        textoPregunta: "¿El dispositivo enciende?",
        tipoPregunta: "BOOLEAN",
        esObligatoria: true
      }
    },
    {
      idTipoDispositivoSegunPregunta: 2,
      preguntaDiagnostico: {
        textoPregunta: "¿La pantalla se ve correctamente?",
        tipoPregunta: "BOOLEAN",
        esObligatoria: true
      }
    },
    {
      idTipoDispositivoSegunPregunta: 3,
      preguntaDiagnostico: {
        textoPregunta: "Nivel de batería (%)",
        tipoPregunta: "NUMERO",
        esObligatoria: false
      }
    }
  ],
  2: [ // Laptops
    {
      idTipoDispositivoSegunPregunta: 4,
      preguntaDiagnostico: {
        textoPregunta: "¿El equipo arranca?",
        tipoPregunta: "BOOLEAN",
        esObligatoria: true
      }
    },
    {
      idTipoDispositivoSegunPregunta: 5,
      preguntaDiagnostico: {
        textoPregunta: "¿El teclado funciona correctamente?",
        tipoPregunta: "BOOLEAN",
        esObligatoria: true
      }
    },
    {
      idTipoDispositivoSegunPregunta: 6,
      preguntaDiagnostico: {
        textoPregunta: "Descripción del problema",
        tipoPregunta: "TEXTO",
        esObligatoria: false
      }
    }
  ]
};

const DeviceQuestionsDynamic = ({ tipoDispositivo, value = {}, onChange, diagnosticoId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tipoDispositivo) {
      setQuestions([]);
      return;
    }

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // OPCIÓN 1: Usar datos mock (desarrollo)
        console.log('🔍 Using mock data for device type:', tipoDispositivo);
        const mockData = mockQuestions[tipoDispositivo] || [];
        setQuestions(mockData);
        
        // OPCIÓN 2: Usar API real (descomenta cuando tengas el endpoint)
        /*
        const url = `/api/preguntas-diagnostico/por-tipo-dispositivo/${tipoDispositivo}`;
        console.log('🔍 Fetching questions from:', url);
        
        const response = await fetch(url);
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Parsed questions:', data);
        setQuestions(Array.isArray(data) ? data : []);
        */
        
      } catch (err) {
        console.error('❌ Error loading questions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [tipoDispositivo]);

  // Cargar respuestas existentes si estamos editando
  useEffect(() => {
    if (!diagnosticoId || questions.length === 0) return;

    const loadExistingAnswers = async () => {
      try {
        const url = `/api/diagnosticos/${diagnosticoId}/detalles`;
        console.log('🔍 Loading existing answers from:', url);
        
        const response = await fetch(url);
        if (!response.ok) return;

        const detalles = await response.json();
        console.log('📋 Existing details:', detalles);
        
        // Mapear las respuestas existentes
        const existingAnswers = {};
        detalles.forEach((detalle, index) => {
          const questionIndex = questions.findIndex(
            q => q.idTipoDispositivoSegunPregunta === detalle.idTipoDispositivoSegunPregunta
          );
          if (questionIndex !== -1) {
            existingAnswers[questionIndex] = detalle.valorDiagnostico;
          }
        });

        if (Object.keys(existingAnswers).length > 0) {
          onChange(existingAnswers);
        }
      } catch (err) {
        console.error('❌ Error loading existing answers:', err);
      }
    };

    loadExistingAnswers();
  }, [diagnosticoId, questions, onChange]);

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = { ...value, [questionIndex]: answer };
    onChange(newAnswers);
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
            <strong>Error al cargar preguntas:</strong>
            <br />
            {error}
            <br />
            <small className="text-red-600">
              Revisa la consola del navegador para más detalles.
            </small>
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
          No hay preguntas específicas para este tipo de dispositivo.
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
            
            {question.preguntaDiagnostico?.tipoPregunta === 'TEXTO' && (
              <input
                type="text"
                value={value[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                placeholder="Ingrese su respuesta..."
              />
            )}
            
            {question.preguntaDiagnostico?.tipoPregunta === 'NUMERO' && (
              <input
                type="number"
                value={value[index] || ''}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                placeholder="Ingrese un número..."
              />
            )}
            
            {question.preguntaDiagnostico?.tipoPregunta === 'BOOLEAN' && (
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value="true"
                    checked={value[index] === 'true'}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                  Sí
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question_${index}`}
                    value="false"
                    checked={value[index] === 'false'}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                  No
                </label>
              </div>
            )}
            
            {!['TEXTO', 'NUMERO', 'BOOLEAN'].includes(question.preguntaDiagnostico?.tipoPregunta) && (
              <div className="text-sm text-muted-foreground">
                Tipo de pregunta no soportado: {question.preguntaDiagnostico?.tipoPregunta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceQuestionsDynamic;