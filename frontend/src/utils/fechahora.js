// Función para formatear fecha y hora (usando la hora tal como viene de la BD)
export const formatearFechaHora = (fechaSQL) => {
  if (!fechaSQL) return "-";

  const fecha = new Date(fechaSQL); // no agregar "Z"

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
