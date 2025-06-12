import {
  LayoutGrid,
  LogOut,
  Package,
  Settings,
  Stethoscope,
  UserCircle,
  UserRound,
  Users,
  Wrench
} from "lucide-react"
import { useState } from "react"
import { useLocation } from "react-router-dom"
 
import SidebarMenuItem from "@/components/molecules/SidebarMenuItem"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "../../../hooks/useAppContext"

export function Sidebar() {
  const location = useLocation()
  const { setIsAuthenticated, sidebarExpanded, darkMode } = useAppContext()
  const [role, setRole] = useState("Administrador")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  const menuItems = [
    { path: "/dashboard", label: "Inicio", icon: <LayoutGrid className="h-5 w-5" /> },
    { path: "/diagnosticos", label: "Diagnóstico", icon: <Stethoscope className="h-5 w-5" /> },
    { path: "/perfiles", label: "Perfiles", icon: <Users className="h-5 w-5" /> },
    { path: "/empleados", label: "Empleados", icon: <UserCircle className="h-5 w-5" /> },
    { path: "/reparaciones", label: "Reparaciones", icon: <Wrench className="h-5 w-5" /> },
    { path: "/clientes", label: "Clientes", icon: <UserRound className="h-5 w-5" /> },
    { path: "/repuestos", label: "Repuestos", icon: <Package className="h-5 w-5" /> },
    { path: "/marcas", label: "Marcas", icon: <Settings className="h-5 w-5" /> }
    // { path: "/configuracion", label: "Configuración", icon: <Settings className="h-5 w-5" /> }
  ]

  return (
    <div
      className={`h-screen flex flex-col transition-[width] duration-300 ease-in-out ${sidebarExpanded ? "w-60" : "w-16"} transition-colors duration-300 ${
        darkMode
          ? "bg-sidebar border-r border-sidebar-border text-sidebar-foreground"
          : "bg-sidebar border-r border-sidebar-border text-sidebar-foreground"
      }`}
    >
      {/* Logo */}
      <div className={`p-4 flex justify-center`}>
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 bg-sidebar-primary rounded-md transform rotate-6"></div>
          <div className="absolute inset-0 bg-sidebar-primary rounded-md transform -rotate-3 flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">T</span>
          </div>
        </div>
      </div>

      {/* Selector de rol - solo visible cuando está expandido */}
      {sidebarExpanded && (
        <div className="px-4 py-2">
          <p className="text-sm mb-1 text-sidebar-foreground/70">Cambiar de rol</p>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full bg-sidebar border-sidebar-border text-sidebar-foreground">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Administrador">Administrador</SelectItem>
              <SelectItem value="Técnico">Técnico</SelectItem>
              <SelectItem value="Recepcionista">Recepcionista</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Menú de navegación usando SidebarMenuItem (molécula) */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path
            return (
              <li key={path}>
                <SidebarMenuItem
                  icon={icon}
                  label={sidebarExpanded ? label : ""}
                  path={path}
                  color={
                    isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }
                  bg={
                    isActive ? "bg-sidebar-primary" : "hover:bg-sidebar-accent"
                  }
                />
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Pie del sidebar */}
      <div className="p-4 border-t border-sidebar-border">
        <ul className="space-y-1">
          <li>
            <SidebarMenuItem
              icon={<Settings className="h-5 w-5" />}
              label={sidebarExpanded ? "Configuración" : ""}
              path="/configuracion"
              color="text-sidebar-foreground hover:text-sidebar-accent-foreground"
              bg="hover:bg-sidebar-accent"
            />
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors 
              text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
              ${!sidebarExpanded && "justify-center"}`}
              title={!sidebarExpanded ? "Cerrar sesión" : ""}
            >
              <LogOut className="h-5 w-5" />
              {sidebarExpanded && <span>Cerrar sesión</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}