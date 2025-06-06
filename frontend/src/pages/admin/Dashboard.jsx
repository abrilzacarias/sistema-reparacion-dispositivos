import { DataTable } from "@/components/datatable/DataTable";
import { getColumnsNotifications } from "@/components/datatable/columns/getColumnsNotifications";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"; 
import { StatusBadge } from "@/components/molecules/StatusBadge"
import SummaryCard from "@/components/molecules/SummaryCard"
import { Wrench, Check, AlertCircle } from "lucide-react"

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
    endpoint: "notifications",   
    pageSize: 5,          
  });
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
          variant="info"
        />

        <SummaryCard
          title="Reparaciones listas para entrega"
          count={2} //REVISAR
          icon={Check}
          variant="success"
        >
          <StatusBadge status="success">Listas para entrega</StatusBadge>
        </SummaryCard>

        <SummaryCard
          title="Reparaciones demoradas"
          count={1} //REVISAR
          icon={AlertCircle}
          variant="destructive"
        >
          <StatusBadge status="error">Demoradas</StatusBadge>
        </SummaryCard>
      </div>

      {/* Styled Notifications Section Start */}
      <div className="bg-sky-50 dark:bg-slate-900 p-4 sm:p-6 rounded-lg shadow-md mt-8">
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
          columns={getColumnsNotifications()} // Columns definition for notifications
          data={notifications ?? []} // Data from usePaginatedQuery
          isLoading={isLoadingNotifications}
          isError={isErrorNotifications}
          isFetching={isFetchingNotifications}
          fetchNextPage={fetchNextNotificationsPage} // For pagination (load more)
          hasNextPage={hasNextNotificationsPage}     // To enable/disable load more
          refetch={refetchNotifications}           // To allow manual refetch if needed
          totalUsers={totalNotifications}      // Pass total for header and pagination logic
          searchTarget="message"               // Enable search by notification message
          placeholder="Buscar notificaciones..." // Custom placeholder for the search input
        />
      </div>
      {/* Styled Notifications Section End */}
    </div>
  )
}