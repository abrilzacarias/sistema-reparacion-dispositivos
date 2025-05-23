import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL

//TODO IMPLEMENTAR EL TOKEN EN EL HEADER DE LAS PETICIONES
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

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token)
      localStorage.setItem("tokenType", response.data.token_type)
    }

    return response.data
  } catch (error) {
    console.error("Login error:", error)
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
      } else {
        throw new Error(`Error: ${error.response.data.detail || "Ha ocurrido un error al iniciar sesión"}`)
      }
    } else if (error.request) {
      throw new Error("No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.")
    } else {
      throw new Error("Ha ocurrido un error inesperado. Por favor, intenta de nuevo.")
    }
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
