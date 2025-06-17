import { DataTable } from "@/components/datatable/DataTable";
import { getColumnsNotifications } from "@/components/datatable/columns/getColumnsNotifications";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"; 
import { StatusBadge } from "@/components/molecules/StatusBadge"
import SummaryCard from "@/components/molecules/SummaryCard"
import { Wrench, Check, AlertCircle } from "lucide-react"
import { useRepairStatusSummary } from "@/hooks/useRepairStatusSummary"

export function Dashboard() {
  const {
    data: notifications,
    refetch: refetchNotifications,
    fetchNextPage: fetchNextNotificationsPage,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    isFetching: isFetchingNotifications,
    hasNextPage: hasNextNotificationsPage,
    total: totalNotifications,
  } = usePaginatedQuery({
    key: "dashboardNotifications",
    endpoint: "notificaciones/notificaciones",
    pageSize: 5,          
  });

  const {
    data: statusSummary,
    isLoading: isLoadingSummary,
    isError: isErrorSummary,
    refetch: refetchSummary
  } = useRepairStatusSummary();

  const estadoMap = {
    "En Curso": "En curso",
    "Listas para entrega": "Listas para entrega",
    "Pendiente": "Pendiente",
    "Presupuestado": "Pendiente",
    "Finalizado": "Listas para entrega" 
  };

  function getFrontendSummary(statusSummary) {
    const summary = {};
    for (const [key, value] of Object.entries(statusSummary || {})) {
      const mappedKey = estadoMap[key] || key;
      summary[mappedKey] = (summary[mappedKey] || 0) + value;
    }
    return summary;
  }

  const estados = {
    "En curso": {
      title: "Reparaciones en curso",
      icon: Wrench,
      variant: "info",
    },
    "Listas para entrega": {
      title: "Reparaciones listas para entrega",
      icon: Check,
      variant: "success",
    },
    "Pendiente": {
      title: "Reparaciones pendientes",
      icon: AlertCircle,
      variant: "destructive",
    },
  };

  function getCardProps(estado) {
    return estados[estado] || {
      title: estado,
      icon: AlertCircle,
      variant: "default",
    };
  }

  return (
    <div className="space-y-6 bg-back">
      <section
        className="w-full"
        aria-label="Resumen de reparaciones"
        role="region"
      >
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

          {isLoadingSummary ? (
            <>
              <SummaryCard 
                title="Reparaciones en curso" 
                count={"..."} 
                icon={Wrench} 
                variant="info"
                tabIndex={0}
                className={`p-4 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                role="region"
                aria-label="Reparaciones en curso"
              >
                <StatusBadge status="success">En curso</StatusBadge>
              </SummaryCard>  
              <SummaryCard 
                title="Reparaciones listas para entrega" 
                count={"..."} 
                icon={Check} 
                variant="success"
                tabIndex={0}
                className={`p-4 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                role="region"
                aria-label="Reparaciones listas para entrega"
              >
                <StatusBadge status="success">Listas para entrega</StatusBadge>
              </SummaryCard>  
              <SummaryCard 
                title="Reparaciones pendientes" 
                count={"..."} 
                icon={AlertCircle} 
                variant="destructive"
                tabIndex={0}
                className={`p-4 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                role="region"
                aria-label="Reparaciones pendientes"
              >
                <StatusBadge status="success">Pendientes</StatusBadge>
              </SummaryCard>  
            </>
          ) : (
             Object.entries(estados).map(([estadoKey, props]) => {
              const summary = getFrontendSummary(statusSummary);
              return (
                <SummaryCard
                  key={estadoKey}
                  title={props.title}
                  count={summary[estadoKey] ?? 0}
                  icon={props.icon}
                  variant={props.variant}
                  tabIndex={0}
                  className={`p-4 rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                  role="region"
                  aria-label={props.title}
                >
                  {estadoKey === "En curso" && <StatusBadge status="info">En curso</StatusBadge>}
                  {estadoKey === "Listas para entrega" && <StatusBadge status="success">Listas para entrega</StatusBadge>}
                  {estadoKey === "Pendiente" && <StatusBadge status="destructive">Pendientes</StatusBadge>}
                </SummaryCard>
              );
            })
          )}
        </div>
      </section>

      <section
         className="bg-sky-50 dark:bg-slate-900 p-4 sm:p-6 rounded-lg shadow-md mt-8"
         aria-label="Últimas notificaciones"
         role="region"
       >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-sky-800 dark:text-slate-100">
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
              className="lucide lucide-bell stroke-sky-800 dark:stroke-slate-100"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            Últimas notificaciones
          </h2>
          <p className="text-sm text-sky-600 dark:text-slate-300 mt-1 ml-8">Un vistazo rápido a las alertas y eventos más recientes del sistema.</p>
        </div>
        <DataTable
          columns={getColumnsNotifications()}
          data={notifications ?? []}
          isLoading={isLoadingNotifications}
          isError={isErrorNotifications}
          isFetching={isFetchingNotifications}
          fetchNextPage={fetchNextNotificationsPage} 
          hasNextPage={hasNextNotificationsPage} 
          refetch={refetchNotifications}   
          totalUsers={totalNotifications} 
          searchTarget="mensaje"  
          placeholder="Buscar notificaciones..."
        />
      </section>
    </div>
  )
}