import React from "react";
import { DEVICE_QUESTIONS } from "./diagnosticoDeviceQuestions";

/**
 * Mapea los nombres "tipoDispositivo" a las keys del objeto DEVICE_QUESTIONS
 */
const getDeviceKey = (tipoDispositivo) => {
  if (!tipoDispositivo) return null;
  const map = {
    celular: ["celular", "móvil", "phone", "smartphone"],
    pc: ["pc", "escritorio", "desktop"],
    notebook: ["notebook", "laptop"],
    consola: ["consola", "console", "videojuego", "playstation", "xbox", "nintendo"],
    parlante: ["parlante", "speaker"],
    tablet: ["tablet", "tableta"],
    lavarropas: ["lavarropas", "washing"],
    reloj: ["reloj", "watch", "smartwatch"],
  };
  const tipo = tipoDispositivo.toLowerCase();
  for (const key in map) {
    if (map[key].some((word) => tipo.includes(word))) return key;
  }
  return null;
};

export default function DeviceQuestionsDynamic({ tipoDispositivo, value, onChange }) {
  const deviceKey = getDeviceKey(tipoDispositivo);
  const questions = deviceKey ? DEVICE_QUESTIONS[deviceKey] : [];

  if (!deviceKey || !questions.length) return null;

  return (
    <div className="col-span-2 mb-2">
      <div className="font-semibold mb-2 text-sm text-muted-foreground">Preguntas específicas para el diagnóstico</div>
      <div className="grid gap-2">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-3">
            <label className="flex-1 text-sm">{q}</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name={`device_question_${i}`}
                value="si"
                checked={value?.[i] === true}
                onChange={() => onChange({ ...value, [i]: true })}
                className="accent-green-500"
              />
              <span className="text-xs">Sí</span>
              <input
                type="radio"
                name={`device_question_${i}`}
                value="no"
                checked={value?.[i] === false}
                onChange={() => onChange({ ...value, [i]: false })}
                className="accent-red-500"
              />
              <span className="text-xs">No</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
