import { Navigate } from "react-router-dom"
import { useAppContext } from "./hooks/useAppContext"
import { tienePermiso } from "./utils/permisos"


export function ProtectedRoute({ children, modulo, funcion }) {
  const { isAuth } = useAppContext()
  const autorizado = modulo && funcion ? tienePermiso(modulo, funcion) : true

  return isAuth && autorizado ? children : <Navigate to="/" replace />
}