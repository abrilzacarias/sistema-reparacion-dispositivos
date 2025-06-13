import {
  LayoutGrid,
  LogOut,
  Package,
  Settings,
  Stethoscope,
  UserCircle,
  UserRound,
  Users,
  Wrench,
  Hexagon,
  Menu as MenuIcon,
  X as CloseIcon,
  AlertTriangle
} from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"
import SidebarMenuItem from "@/components/molecules/SidebarMenuItem"
import { useAppContext } from "../../../hooks/useAppContext"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import {
  alertIconVariants,
  buttonVariants,
  childVariants,
  containerVariants,
} from "@/lib/variantsErrorApi";

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate();
  const { setIsAuthenticated, sidebarExpanded, darkMode } = useAppContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
  }

  const menuItems = [
    { path: "/dashboard", label: "Inicio", icon: LayoutGrid },
    { path: "/diagnosticos", label: "Diagnóstico", icon: Stethoscope },
    { path: "/perfiles", label: "Perfiles", icon: Users },
    { path: "/empleados", label: "Empleados", icon: UserCircle },
    { path: "/reparaciones", label: "Reparaciones", icon: Wrench },
    { path: "/clientes", label: "Clientes", icon: UserRound },
    { path: "/repuestos", label: "Repuestos", icon: Package },
    // { path: "/configuracion", label: "Configuración", icon: Settings }
  ]

  // Función para cerrar sidebar en mobile
  const handleNavigate = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  // Sidebar content (reusable for desktop and mobile)
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`p-4 flex justify-center`}>
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 object-contain hover:animate-flip cursor-pointer"
        />
      </div>
      {/* Menú de navegación usando SidebarMenuItem (molécula) */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path
            return (
              <li key={path}>
                <SidebarMenuItem
                  icon={icon}
                  label={sidebarExpanded || mobileOpen ? label : ""}
                  path={path}
                  color={
                    isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  }
                  bg={
                    isActive ? "bg-sidebar-primary" : "hover:bg-sidebar-accent"
                  }
                  onNavigate={handleNavigate}
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
            <button
              onClick={() => { navigate('/configuracion'); handleNavigate(); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors 
              text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
              ${!sidebarExpanded && !mobileOpen ? "justify-center" : ""}`}
              title={!sidebarExpanded && !mobileOpen ? "Configuración" : ""}
            >
              <Settings className="h-5 w-5" />
              {(sidebarExpanded || mobileOpen) && <span>Configuración</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowLogoutModal(true)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors 
              text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
              ${!sidebarExpanded && !mobileOpen ? "justify-center" : ""}`}
              title={!sidebarExpanded && !mobileOpen ? "Cerrar sesión" : ""}
            >
              <LogOut className="h-5 w-5" />
              {(sidebarExpanded || mobileOpen) && <span>Cerrar sesión</span>}
            </button>
          </li>
        </ul>
      </div>
    </>
  )

  return (
    <>
      {/* Botón hamburguesa solo en mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-lg border border-gray-200"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      {/* Sidebar mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col shadow-lg animate-slide-in"
          >
            <button
              className="absolute top-4 right-4 z-50 bg-white rounded-full p-1 border border-gray-200"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
            {sidebarContent}
          </aside>
        </>
      )}
      {/* Sidebar desktop */}
      <aside
        className={`hidden md:flex h-screen flex-col transition-[width] duration-300 ease-in-out ${sidebarExpanded ? "w-60" : "w-20"} transition-colors duration-300 ${
          darkMode
            ? "bg-sidebar border-r border-sidebar-border text-sidebar-foreground"
            : "bg-sidebar border-r border-sidebar-border text-sidebar-foreground"
        }`}
      >
        {sidebarContent}
      </aside>
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center p-8 bg-red-50 border border-red-200 shadow-lg rounded-lg max-w-md dark:bg-red-900/10 dark:border-transparent"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className="flex justify-center mb-4" variants={childVariants}>
                <motion.div
                  className="p-4 bg-red-100 rounded-full border-2 border-red-400 dark:bg-red-800 dark:border-red-700"
                  variants={alertIconVariants}
                  animate={["visible", "pulse"]}
                >
                  <AlertTriangle size={32} className="text-red-600 dark:text-red-300" />
                </motion.div>
              </motion.div>
              <motion.h3 className="text-xl font-bold text-red-800 dark:text-white" variants={childVariants}>
                ¿Cerrar sesión?
              </motion.h3>
              <motion.p className="mt-3 text-red-600 dark:text-red-400" variants={childVariants}>
                Se cerrará tu sesión actual y deberás volver a iniciar sesión para acceder al sistema.
              </motion.p>
              <motion.div className="mt-6 flex gap-3 justify-center" variants={childVariants}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 rounded-lg font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition-colors"
                  onClick={() => { handleLogout(); setShowLogoutModal(false); handleNavigate(); }}
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}