import { Bell, Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppContext } from "../../../hooks/useAppContext"
import logo from "@/assets/logo.png"

export function TopBar({ userName = "Administrador" }) {
  const { darkMode, toggleDarkMode, sidebarExpanded, toggleSidebar } = useAppContext()

  return (
    <div
      className={`h-16 flex items-center justify-between px-6 transition-colors duration-300 ${
        darkMode
          ? "bg-backgroundbar border-b border-gray-800 text-white"
          : "bg-white border-b border-gray-200 text-gray-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          {sidebarExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <h1 className="text-lg font-medium">Bienvenido, {userName}</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className={darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}
