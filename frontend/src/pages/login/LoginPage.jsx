import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoonIcon, SunIcon, EyeIcon, EyeOffIcon, Loader2, AlertTriangle } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/auth/auth"
import { useAppContext } from "@/hooks/useAppContext"
import { PasswordChangeModal } from "@/components/molecules/PasswordChangeModal"
import RecuperarPassModal from "./RecuperarPassModal"
// Constantes para el manejo de intentos
const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 1 // minutos
const STORAGE_KEY = 'login_attempts'

export default function LoginPage() {
  const API_URL = import.meta.env.VITE_API_URL
  console.log("API_URL desde .env:", API_URL) // Debería mostrar: http://localhost:8000
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode, setIsAuthenticated } = useAppContext()
  const [modalOpen, setModalOpen] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)
  
  // Estados para manejo de intentos
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockedUntil, setBlockedUntil] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)

  // Función para obtener datos de intentos del localStorage
  const getAttemptsData = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { attempts: 0, blockedUntil: null }
    return JSON.parse(stored)
  }

  // Función para guardar datos de intentos
  const saveAttemptsData = (attempts, blockedUntil = null) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      attempts, 
      blockedUntil: blockedUntil ? blockedUntil.getTime() : null 
    }))
  }

  // Función para resetear intentos
  const resetAttempts = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAttemptsLeft(MAX_ATTEMPTS)
    setIsBlocked(false)
    setBlockedUntil(null)
    setTimeRemaining(0)
  }

  // Función para calcular tiempo restante
  const calculateTimeRemaining = (blockedUntil) => {
    const now = new Date()
    const remaining = Math.max(0, Math.ceil((blockedUntil - now) / 1000 / 60))
    return remaining
  }

  // Función para formatear tiempo restante
  const formatTimeRemaining = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}h ${mins}m`
    }
    return `${minutes}m`
  }

  // useEffect para verificar estado al cargar componente
  useEffect(() => {
    const data = getAttemptsData()
    
    if (data.blockedUntil) {
      const blockedUntilDate = new Date(data.blockedUntil)
      const now = new Date()
      
      if (now < blockedUntilDate) {
        setIsBlocked(true)
        setBlockedUntil(blockedUntilDate)
        setTimeRemaining(calculateTimeRemaining(blockedUntilDate))
        setAttemptsLeft(0)
      } else {
        // El bloqueo ha expirado, resetear
        resetAttempts()
      }
    } else {
      setAttemptsLeft(MAX_ATTEMPTS - data.attempts)
    }
  }, [])

  // useEffect para countdown del tiempo restante
  useEffect(() => {
    let interval = null
    
    if (isBlocked && blockedUntil) {
      interval = setInterval(() => {
        const remaining = calculateTimeRemaining(blockedUntil)
        setTimeRemaining(remaining)
        
        if (remaining <= 0) {
          resetAttempts()
          clearInterval(interval)
        }
      }, 60000) // Actualizar cada minuto
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isBlocked, blockedUntil])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleFailedAttempt = () => {
    const data = getAttemptsData()
    const newAttempts = data.attempts + 1
    
    if (newAttempts >= MAX_ATTEMPTS) {
      // Bloquear usuario
      const blockUntil = new Date()
      blockUntil.setMinutes(blockUntil.getMinutes() + LOCKOUT_DURATION)
      
      saveAttemptsData(newAttempts, blockUntil)
      setIsBlocked(true)
      setBlockedUntil(blockUntil)
      setTimeRemaining(LOCKOUT_DURATION)
      setAttemptsLeft(0)
      setError(`Has alcanzado el máximo de intentos. Inténtalo de nuevo en ${LOCKOUT_DURATION} minutos.`)
    } else {
      saveAttemptsData(newAttempts)
      const remaining = MAX_ATTEMPTS - newAttempts
      setAttemptsLeft(remaining)
      setError(`Credenciales incorrectas. Te quedan ${remaining} intento${remaining !== 1 ? 's' : ''}.`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Verificar si está bloqueado
    if (isBlocked) {
      setError(`Cuenta bloqueada. Inténtalo de nuevo en ${formatTimeRemaining(timeRemaining)}.`)
      return
    }

    if (!email || !password) {
      setError("Por favor, completa todos los campos requeridos")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await loginUser(email, password)
      
      // Login exitoso - resetear intentos
      resetAttempts()
      setIsAuthenticated(true)

      console.log(response)
      if (response.user.needs_password_change) {
        setShowPasswordChangeModal(true)
      } else {
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          handleFailedAttempt()
        } else if (error.response.status === 429) {
          setError("Demasiados intentos. Por favor, intenta de nuevo más tarde.")
        } else {
          setError(`Error: ${error.response.data?.detail || "Ha ocurrido un error al iniciar sesión"}`)
        }
      } else if (error.request) {
        setError("No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.")
      } else {
        setError("Ha ocurrido un error inesperado. Por favor, intenta de nuevo.")
      }
      console.error("Error de inicio de sesión:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChangeSuccess = () => {
    setShowPasswordChangeModal(false)
    navigate("/dashboard")
  }

  return (
    <>
      <div className="flex h-screen w-full">
        <div className="hidden md:block w-full md:w-5/12 bg-[#001a40] dark:bg-[#000c20] relative overflow-hidden">
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 500 500" preserveAspectRatio="none">
              <path
                d="M0,100 L100,50 L200,80 L300,20 L400,100 L500,0"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <path
                d="M0,200 L100,150 L200,180 L300,120 L400,200 L500,100"
                fill="none"
                stroke="rgba(0,100,255,0.5)"
                strokeWidth="2"
              />
              <circle cx="100" cy="50" r="3" fill="rgba(255,255,255,0.4)" />
              <circle cx="200" cy="80" r="3" fill="rgba(255,255,255,0.4)" />
              <circle cx="300" cy="20" r="3" fill="rgba(255,255,255,0.4)" />
              <circle cx="200" cy="180" r="3" fill="rgba(0,100,255,0.7)" />
              <circle cx="300" cy="120" r="3" fill="rgba(0,100,255,0.7)" />
              <circle cx="400" cy="200" r="3" fill="rgba(0,100,255,0.7)" />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col justify-between p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="flex justify-end items-center">
            <button
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>

          <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Iniciar sesión</h1>

              {/* Indicador de intentos restantes */}
              {!isBlocked && attemptsLeft < MAX_ATTEMPTS && attemptsLeft > 0 && (
                <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-800">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-300">
                    Te quedan {attemptsLeft} intento{attemptsLeft !== 1 ? 's' : ''} antes del bloqueo temporal.
                  </AlertDescription>
                </Alert>
              )}

              {/* Indicador de bloqueo */}
              {isBlocked && (
                <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-800 dark:text-red-300">
                    Cuenta bloqueada por seguridad.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800">
                  <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">
                  Correo electrónico <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example.email@gmail.com"
                  className="h-12 bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                  required
                  disabled={isLoading || isBlocked}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-300">
                  Contraseña <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresar al menos 8 caracteres"
                    className="h-12 pr-10 bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
                    required
                    disabled={isLoading || isBlocked}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    disabled={isLoading || isBlocked}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isBlocked}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#001a40] hover:bg-[#002a60] dark:bg-[#0066cc] dark:hover:bg-[#0055aa] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || isBlocked}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : isBlocked ? (
                  `Bloqueado (${formatTimeRemaining(timeRemaining)})`
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </form>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>¿Dudas?</p>
            <Link to="/contact" className="text-[#0066cc] dark:text-[#4d94ff] hover:underline">
              Contáctanos y te ayudamos.
            </Link>
          </div>
        </div>
      </div>

      <PasswordChangeModal
        isOpen={showPasswordChangeModal}
        onClose={() => setShowPasswordChangeModal(false)}
        onSuccess={handlePasswordChangeSuccess}
      />

      {modalOpen && !isBlocked && (
        <RecuperarPassModal onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
