import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardLayout } from "./components/organisms/layout/DashboardLayout";
import LoginPage from "./pages/login/LoginPage";
import { Dashboard } from "./pages/admin/Dashboard";
import EmpleadoPage from "./pages/empleado/EmpleadoPage";
import RepuestosPage from "./pages/repuestos/RepuestosPage";
import DiagnosticoPage from "./pages/diagnostico/DiagnosticoPage";
import ReparacionesPage from "./pages/reparaciones/ReparacionesPage";
import ClientePage from "./pages/cliente/ClientePage";
import PerfilesPage from "./pages/perfiles/PerfilesPage";
import PerfilFormPage from "./pages/perfiles/PerfilFormPage";
//import MarcasPage from "./pages/marcas/MarcasPage"
import ResetPassword from "./pages/login/ResetPassword";
import DiagnosticoFormPage from "./pages/diagnostico/DiagnosticoFormPage";
import ConfigPage from "./pages/configuracion/ConfigPage";
import Index from "./pages/index/Index";


function App() {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuarios/reset-password" element={<ResetPassword />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/diagnosticos" element={<DiagnosticoPage />} />
          <Route path="/diagnosticos/nuevo" element={<DiagnosticoFormPage />} />
          <Route path="/empleados" element={<EmpleadoPage />} />
          <Route
            path="/perfiles"
            element={
              <ProtectedRoute modulo="Perfiles" funcion="Visualizar Perfiles">
                <PerfilesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfiles/nuevo"
            element={
              <ProtectedRoute modulo="Perfiles" funcion="Agregar Perfiles">
                <PerfilFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfiles/editar"
            element={
              <ProtectedRoute modulo="Perfiles" funcion="Modificar Perfiles">
                <PerfilFormPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/empleados"
            element={
              <ProtectedRoute modulo="Empleados" funcion="Visualizar Empleado">
                <EmpleadoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reparaciones"
            element={
              <ProtectedRoute
                modulo="Reparaciones"
                funcion="Visualizar Reparación"
              >
                <ReparacionesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute modulo="Clientes" funcion="Visualizar Cliente">
                <ClientePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/repuestos"
            element={
              <ProtectedRoute modulo="Repuestos" funcion="Visualizar Repuesto">
                <RepuestosPage />
              </ProtectedRoute>
            }
          />

          <Route path="/configuracion" element={<ConfigPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;