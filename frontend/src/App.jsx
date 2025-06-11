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
import PerfilesPage from "./pages/perfiles/PerfilesPage"
import AddPerfilPage from "./pages/perfiles/AddPerfilPage"
// import MarcasPage from "./pages/marcas/MarcasPage"

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnosticos" element={<DiagnosticoPage />} />
          <Route path="/empleados" element={<EmpleadoPage />} /> 
          <Route path="/perfiles" element={<PerfilesPage />} />
          <Route path="/perfiles/nuevo" element={<AddPerfilPage />} />
          <Route path="/reparaciones" element={<ReparacionesPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/repuestos" element={<RepuestosPage />} />
          <Route path="/configuracion" element={<div>Página de Configuración</div>} />
          <Route path="/reparaciones" element={<ReparacionesPage />} />
          {/* <Route path="/marcas" element={<MarcasPage/>} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  )
}

export default App