import { useState, useEffect } from 'react';
import PatternLockInput from '@/components/molecules/PatternLockInput';

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

  // Función para verificar si una pregunta es de seguridad
  const isSecurityQuestion = (question) => {
    const opciones = question.preguntaDiagnostico?.opcionesPregunta;
    return opciones && opciones.some(op => 
      ['PIN', 'Contraseña', 'Patron', 'Ninguno'].some(securityOp => 
        op.toLowerCase().includes(securityOp.toLowerCase())
      )
    );
  };

  // Función mejorada para manejar cambios en respuestas principales
  const handleAnswerChange = (index, answer) => {
    const updated = Array.isArray(value) ? [...value] : [];
    const pregunta = questions[index];
    
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

    // Si es una pregunta de seguridad, manejar la estructura JSON
    if (isSecurityQuestion(pregunta)) {
      let existingAdditionalValue = '';
      
      // Intentar extraer el valor adicional existente
      try {
        const currentValue = updated[index]?.valorDiagnostico;
        if (currentValue) {
          const parsed = JSON.parse(currentValue);
          existingAdditionalValue = parsed.valor || '';
        }
      } catch {
        // Si no es JSON válido, no hay valor adicional previo
      }

      // Crear la nueva estructura con el valor adicional preservado
      const additionalData = {
        tipo: answer,
        valor: existingAdditionalValue
      };

      updated[index] = {
        valorDiagnostico: JSON.stringify(additionalData),
        idDiagnostico: diagnosticoId ?? 0,
        idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
      };
    } else {
      // Para preguntas normales, guardar directamente
      updated[index] = {
        valorDiagnostico: answer,
        idDiagnostico: diagnosticoId ?? 0,
        idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
      };
    }

    console.log('📊 Todas las respuestas actualizadas:', updated);
    onChange(updated);
  };

  // Función para manejar valores de campos adicionales
  const handleAdditionalFieldChange = (questionIndex, fieldType, fieldValue) => {
    const updated = Array.isArray(value) ? [...value] : [];
    const pregunta = questions[questionIndex];
    
    // Obtener el tipo principal actual
    let mainValue = '';
    try {
      const currentValue = updated[questionIndex]?.valorDiagnostico;
      if (currentValue) {
        const parsed = JSON.parse(currentValue);
        mainValue = parsed.tipo || '';
      }
    } catch {
      // Si no es JSON, buscar en las opciones o usar valor directo
      mainValue = updated[questionIndex]?.valorDiagnostico || '';
    }
    
    // Combinar la respuesta principal con el valor del campo adicional
    const additionalData = {
      tipo: mainValue,
      valor: fieldValue
    };
    
    console.log('🔑 Campo adicional cambiado:', {
      pregunta: pregunta.preguntaDiagnostico?.textoPregunta,
      tipo: mainValue,
      fieldType,
      fieldValue
    });

    // Asegurar que el array tenga el tamaño correcto
    while (updated.length <= questionIndex) {
      updated.push({
        valorDiagnostico: '',
        idDiagnostico: diagnosticoId ?? 0,
        idTipoDispositivoSegunPregunta: 0,
      });
    }

    // Actualizar con los datos combinados
    updated[questionIndex] = {
      valorDiagnostico: JSON.stringify(additionalData),
      idDiagnostico: diagnosticoId ?? 0,
      idTipoDispositivoSegunPregunta: pregunta.idTipoDispositivoSegunPregunta,
    };

    onChange(updated);
  };

  // Función para obtener el valor principal (tipo) de una pregunta de seguridad
  const getMainValue = (questionIndex) => {
    const currentValue = value[questionIndex]?.valorDiagnostico;
    if (!currentValue) return '';
    
    try {
      const parsed = JSON.parse(currentValue);
      return parsed.tipo || '';
    } catch {
      return currentValue;
    }
  };

  // Función para obtener el valor adicional de una pregunta de seguridad
  const getAdditionalFieldValue = (questionIndex, fieldType) => {
    const currentValue = value[questionIndex]?.valorDiagnostico;
    if (!currentValue) return '';
    
    try {
      const parsed = JSON.parse(currentValue);
      return parsed.valor || '';
    } catch {
      return '';
    }
  };

  // Función para renderizar campos adicionales según la selección
  const renderAdditionalFields = (question, questionIndex, selectedValue) => {
    if (!selectedValue) return null;

    switch (selectedValue.toLowerCase()) {
      case 'pin':
        return (
          <div className="mt-3 pl-4 border-l-2 border-blue-200 bg-blue-50 p-3 rounded-r">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingrese su PIN:
            </label>
            <input
              type="password"
              value={getAdditionalFieldValue(questionIndex, 'pin')}
              onChange={(e) => handleAdditionalFieldChange(questionIndex, 'pin', e.target.value)}
              placeholder="Ingrese su PIN"
              maxLength="6"
              pattern="[0-9]*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case 'contraseña':
        return (
          <div className="mt-3 pl-4 border-l-2 border-green-200 bg-green-50 p-3 rounded-r">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingrese su contraseña:
            </label>
            <input
              type="password"
              value={getAdditionalFieldValue(questionIndex, 'password')}
              onChange={(e) => handleAdditionalFieldChange(questionIndex, 'password', e.target.value)}
              placeholder="Ingrese su contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        );
            case 'patron':
        return (
          <div className="mt-3 pl-4 border-l-2 border-purple-200 bg-purple-50 p-3 rounded-r">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Configure su patrón:
            </label>
            <PatternLockInput
              value={getAdditionalFieldValue(questionIndex, 'pattern')}
              onChange={(pattern) => handleAdditionalFieldChange(questionIndex, 'pattern', pattern)}
            />
          </div>
        );

      case 'ninguno':
        return (
          <div className="mt-3 pl-4 border-l-2 border-gray-200 bg-gray-50 p-3 rounded-r">
            <p className="text-gray-600 text-sm italic">
              ✓ No se requiere configuración adicional para esta opción.
            </p>
          </div>
        );

      case 'numero':
      case 'número':
        return (
          <div className="mt-3 pl-4 border-l-2 border-blue-200 bg-blue-50 p-3 rounded-r">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingrese un valor numérico:
            </label>
            <input
              type="number"
              value={getAdditionalFieldValue(questionIndex, 'numero')}
              onChange={(e) => handleAdditionalFieldChange(questionIndex, 'numero', e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        );

      case 'ninguno':
        return (
          <div className="mt-3 pl-4 border-l-2 border-gray-200 bg-gray-50 p-3 rounded-r">
            <p className="text-gray-600 text-sm italic">
              ✓ No se requiere configuración adicional para esta opción.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderQuestionInput = (question, index) => {
    const tipo = question.preguntaDiagnostico?.tipoPregunta?.toUpperCase();
    const isSecurityQ = isSecurityQuestion(question);
    
    // Para preguntas de seguridad, usar getMainValue, para otras usar el valor directo
    const displayValue = isSecurityQ 
      ? getMainValue(index)
      : (value[index]?.valorDiagnostico || '');

    switch (tipo) {
      case 'TEXTO':
      case 'TEXT':
        return (
          <input
            type="text"
            value={displayValue}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
            placeholder="Ingrese su respuesta..."
          />
        );

      case 'NUMERO':
      case 'NÚMERO':
      case 'NUMBER':
        return (
          <input
            type="number"
            value={displayValue}
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
                  checked={displayValue === val}
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
        
        return (
          <div>
            {Array.isArray(opciones) && opciones.length > 0 ? (
              <>
                <select
                  value={displayValue}
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
                
                {/* Renderizar campos adicionales solo si es una pregunta de seguridad */}
                {isSecurityQ && renderAdditionalFields(question, index, displayValue)}
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Opciones no configuradas.</div>
            )}
          </div>
        );

      case 'PATRON':
      case 'GESTURE':
        console.log('🎯 Renderizando PatternLockInput para índice:', index);
        console.log('🎯 Valor actual:', displayValue);
        return (
          <PatternLockInput
            value={displayValue}
            onChange={(pattern) => {
              console.log('🔄 Pattern changed:', pattern);
              handleAnswerChange(index, pattern);
            }}
          />
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