import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export function useRepairStatusSummary() {
  return useQuery({
    queryKey: ["repairStatusSummary"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/reparaciones/summary-status`);
      if (!res.ok) throw new Error("Error al obtener el resumen de estados de reparaciones");
      return res.json();
    },
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });
}
