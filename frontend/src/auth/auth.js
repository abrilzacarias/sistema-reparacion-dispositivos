import { useAuthStore } from "@/stores/authStore"
import axios from "axios"
import { combinarPermisos } from '@/utils/permisos';

const API_URL = import.meta.env.VITE_API_URL

export const token = localStorage.getItem("token")

async function loginUser(email, password) {
  const params = new URLSearchParams()
  params.append("username", email)
  params.append("password", password)
  
  try {
    const response = await axios.post(`${API_URL}/auth/token`, params, {
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
    
    console.log(response.data)
    return response.data
    
  } catch (error) {
    console.error("Login error:", error)
    
    // Re-lanzar el error completo para que el componente pueda manejarlo
    // incluyendo el código de estado y la respuesta del servidor
    throw error
  }
}

const registerUser = async (userData) => {
  try {
    console.log("Enviando solicitud de registro a:", `${API_URL}/auth/register`)
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    console.log("Respuesta de registro:", response.data)
    return response.data
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

export { loginUser, registerUser }
