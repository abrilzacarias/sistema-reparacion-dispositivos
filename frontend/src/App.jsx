import { Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { DashboardLayout } from "./components/organisms/layout/DashboardLayout"
import LoginPage from "./pages/login/LoginPage"
import { Dashboard } from "./pages/admin/Dashboard"
import EmpleadoPage from "./pages/empleado/EmpleadoPage"
import RepuestosPage from "./pages/repuestos/RepuestosPage"
import DiagnosticoPage from './pages/diagnostico/DiagnosticoPage';
import ReparacionesPage from "./pages/reparaciones/ReparacionesPage"
import ClientePage from "./pages/cliente/ClientePage"

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
          <Route path="/diagnosticos" element={<DiagnosticoPage />} />
          <Route path="/roles" element={<div>Página de Roles</div>} />
          <Route path="/empleados" element={<EmpleadoPage />} />
          <Route path="/clientes" element={<ClientePage/>} />
          <Route path="/repuestos" element={<RepuestosPage />} />
          <Route path="/configuracion" element={<div>Página de Configuración</div>} />
          <Route path="/reparaciones" element={<ReparacionesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  )
}

export default App
