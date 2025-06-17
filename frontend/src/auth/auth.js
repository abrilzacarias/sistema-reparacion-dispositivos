import { useAuthStore } from "@/stores/authStore"
import axios from "axios"
import { combinarPermisos } from '@/utils/permisos';

const API_URL = import.meta.env.VITE_API_URL

export const token = localStorage.getItem("token")

async function loginUser(email, password) {
  console.log("🔥 API_URL actual:", API_URL)
  console.log("🔥 Tipo de API_URL:", typeof API_URL)
  
  const params = new URLSearchParams()
  params.append("username", email)
  params.append("password", password)
  
  try {
    // ✅ CORREGIDO: Usar backticks para template literal
    const fullUrl = `${API_URL}/auth/token`
    console.log("🔥 URL completa que se va a usar:", fullUrl)
    
    const response = await axios.post(fullUrl, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    })
    
    const { access_token, token_type, user, permisos, needs_password_change } = response.data
    
    // Guardar token en localStorage
    localStorage.setItem("token", access_token)
    const permisosCombinados = combinarPermisos(permisos);
    
    // Guardar en Zustand
    const { setAuth } = useAuthStore.getState()
    setAuth({
      token: access_token,
      tokenType: token_type,
      user,
      permisos: permisosCombinados,
      needs_password_change
    })
    
    console.log("✅ Login exitoso:", response.data)
    return response.data
    
  } catch (error) {
    console.error("❌ Login error:", error)
    console.log("🔥 URL que se intentó:", error.config?.url)
    
    // Re-lanzar el error completo para que el componente pueda manejarlo
    throw error
  }
}

const registerUser = async (userData) => {
  try {
    // ✅ CORREGIDO: Usar backticks para template literal
    const fullUrl = `${API_URL}/auth/register`
    console.log("🔥 Enviando solicitud de registro a:", fullUrl)
    
    const response = await axios.post(fullUrl, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    console.log("✅ Respuesta de registro:", response.data)
    return response.data
  } catch (error) {
    console.error("❌ Registration error:", error)
    console.log("🔥 URL que se intentó:", error.config?.url)
    throw error
  }
}

export { loginUser, registerUser }