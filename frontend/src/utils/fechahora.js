// Función para formatear fecha y hora (sin conversión de zona horaria)
export const formatearFechaHora = (fechaSQL) => {
  if (!fechaSQL) return "-";

  const fecha = new Date(fechaSQL + "Z");

  if (isNaN(fecha.getTime())) return "-";

  return fecha.toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};