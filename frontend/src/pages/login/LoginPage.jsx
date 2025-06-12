import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoonIcon, SunIcon, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser } from "@/auth/auth"
import { useAppContext } from "@/hooks/useAppContext"
import { PasswordChangeModal } from "@/components/molecules/PasswordChangeModal"
import RecuperarPassModal from "./RecuperarPassModal"

export default function LoginPage() {
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode, setIsAuthenticated } = useAppContext()
  const [modalOpen, setModalOpen] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      setIsAuthenticated(true)

      console.log(response)
      //TODO HACER LAS VALIDACIONES DINAMICAS
      if (response.user.needs_password_change) {
        setShowPasswordChangeModal(true)
      } else {
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
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
                  disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            <div className="text-right">
              {/* Cambié Link por button para abrir modal */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#001a40] hover:bg-[#002a60] dark:bg-[#0066cc] dark:hover:bg-[#0055aa]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
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

      {modalOpen && (
        <RecuperarPassModal onClose={() => setModalOpen(false)} />
      )}
    </>
      
  )
}
