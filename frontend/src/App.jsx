import { Routes, Route, Navigate } from "react-router-dom"
import { AppContextProvider } from "./context/AppContextProvider"
import { ProtectedRoute } from "./ProtectedRoute"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import LoginPage from "./pages/login/LoginPage"
import { Dashboard } from "./pages/admin/Dashboard"
import EmpleadoPage from "./pages/empleado/EmpleadoPage"

function App() {
  return (
    <div className="min-h-screen bg-red-500 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Todas estas rutas heredarán el layout con sidebar y topbar */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/diagnostico" element={<DiagnosticoPage />} />
          <Route path="/reparaciones" element={<ReparacionesPage />} /> */}
          {/* Puedes añadir más rutas aquí y todas usarán el mismo layout */}
          <Route path="/roles" element={<div>Página de Roles</div>} />
          <Route path="/empleados" element={<EmpleadoPage />} />
          <Route path="/clientes" element={<div>Página de Clientes</div>} />
          <Route path="/repuestos" element={<div>Página de Repuestos</div>} />
          <Route path="/gastos" element={<div>Página de Gastos Operativos</div>} />
          <Route path="/configuracion" element={<div>Página de Configuración</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  )
}

function AppWithContext() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

export default AppWithContext
