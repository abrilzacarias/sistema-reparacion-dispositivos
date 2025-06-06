import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"
import { useAppContext } from "../../../hooks/useAppContext"

export function DashboardLayout() {
  const { darkMode } = useAppContext()

  const userString = localStorage.getItem("user")
  const user = userString ? JSON.parse(userString) : { name: "Administrador" }

  return (
    <div className={`flex h-screen bg-background transition-colors duration-300`}>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar userName={user.name} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
