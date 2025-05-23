import { NotificationCard } from "@/components/molecules/NotificationCard"
import { StatusBadge } from "@/components/molecules/StatusBadge"
import SummaryCard from "@/components/molecules/SummaryCard"
import { Wrench, Check, AlertCircle } from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-6 bg-back">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-layout-dashboard"
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
        Resumen general
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Reparaciones en curso"
          count={10} //REVISAR
          icon={Wrench}
          iconColor="text-info"
          bgColor="bg-info/20"
        />

        <SummaryCard
          title="Reparaciones listas para entrega"
          count={2} //REVISAR
          icon={Check}
          iconColor="text-success"
          bgColor="bg-success/20"
        >
          <StatusBadge status="success">Listas para entrega</StatusBadge>
        </SummaryCard>

        <SummaryCard
          title="Reparaciones demoradas"
          count={1} //REVISAR
          icon={AlertCircle}
          iconColor="text-destructive"
          bgColor="bg-destructive/20"
        >
          <StatusBadge status="error">Demoradas</StatusBadge>
        </SummaryCard>
      </div>

      <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-bell"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        Últimas notificaciones
      </h2>

      <div className="space-y-4">
        <NotificationCard
          type="warning"
          message="Stock crítico: solo quedan 2 baterías para Moto G8 disponibles."
          onClick={() => console.log("Notificación 1 clickeada")}
        />
        <NotificationCard
          type="info"
          message="Nuevo dispositivo ingresado sin técnico asignado (Reparación #6)."
          onClick={() => console.log("Notificación 2 clickeada")}
        />
        <NotificationCard
          type="error"
          message="Reparación #2 lleva 3 días en espera por repuesto (Pantalla iPhone XR)."
          onClick={() => console.log("Notificación 3 clickeada")}
        />
      </div>

      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors">
          Cargar más
        </button>
      </div>
    </div>
  )
}