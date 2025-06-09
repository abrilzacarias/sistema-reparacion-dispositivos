// utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Mapea los textos completos o parciales a tipos de notificación
export function tipoToNotificationType(tipo) {
  if (!tipo) return "info";

  const lowerTipo = tipo.toLowerCase();

  if (lowerTipo.includes("baja empleado")) return "error";
  if (lowerTipo.includes("nuevo diagnóstico")) return "warning";
  if (lowerTipo.includes("reparación ingresada")) return "info";
  if (lowerTipo.includes("alta empleado")) return "success"; // si alguna vez agregás esto

  return "info"; // Fallback
}