// Preguntas específicas por tipo de dispositivo para el diagnóstico
export const DEVICE_QUESTIONS = {
  celular: [
    "¿El celular enciende normalmente?",
    "¿La pantalla funciona (se ve y responde al tacto)?",
    "¿Se carga correctamente?",
    "¿Podés hacer y recibir llamadas/mensajes?",
    "¿Notaste calentamiento excesivo o apagados inesperados?",
  ],
  pc: [
    "¿La PC enciende y muestra imagen en el monitor?",
    "¿Arranca el sistema operativo normalmente?",
    "¿Los periféricos (teclado, mouse, monitor) funcionan?",
    "¿Hace ruidos anormales al encender?",
    "¿Se apaga, reinicia o se congela durante el uso?",
  ],
  notebook: [
    "¿Enciende normalmente al presionar el botón de encendido?",
    "¿Funciona la pantalla (hay imagen)?",
    "¿Carga correctamente la batería?",
    "¿Se calienta demasiado o hace ruidos?",
    "¿Se apaga solo o no responde en algún momento?",
  ],
  consola: [
    "¿La consola enciende y muestra imagen en la TV?",
    "¿Reconoce los controles o mandos?",
    "¿Carga juegos (desde disco o digital)?",
    "¿Conecta correctamente a internet/red?",
    "¿Se calienta o apaga durante el uso?",
  ],
  parlante: [
    "¿Enciende correctamente?",
    "¿Se escucha sonido al reproducir?",
    "¿Conecta bien por Bluetooth o cable?",
    "¿Cargaste el parlante o funciona a batería?",
    "¿Hay distorsiones o cortes en el audio?",
  ],
  tablet: [
    "¿La tablet enciende?",
    "¿La pantalla responde al tacto?",
    "¿Carga correctamente?",
    "¿Conecta a WiFi o red celular sin problemas?",
    "¿Se comporta de forma lenta o inestable?",
  ],
  lavarropas: [
    "¿Enciende y responde a los botones?",
    "¿Hace el ciclo completo (lava, enjuaga, centrifuga)?",
    "¿Hace ruidos extraños o golpes durante el uso?",
    "¿Perdió agua o no desagua?",
    "¿Se traba la puerta o no abre?",
  ],
  reloj: [
    "¿El reloj enciende o funciona?",
    "¿La pantalla muestra información (en modelos digitales)?",
    "¿Carga correctamente?",
    "¿Conecta con el celular si es smartwatch?",
    "¿Las funciones básicas (hora, alarma, sensores) están activas?",
  ],
};
