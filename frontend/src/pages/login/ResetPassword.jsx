"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react"

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mensaje, setMensaje] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (!token) {
      setMensaje("Token no válido o ausente.")
    }
  }, [token])

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: "weak", color: "bg-red-500", text: "Débil" }
    if (password.length < 8) return { strength: "medium", color: "bg-yellow-500", text: "Media" }
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
      return { strength: "strong", color: "bg-green-500", text: "Fuerte" }
    }
    return { strength: "medium", color: "bg-yellow-500", text: "Media" }
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      setMensaje("Por favor completa ambos campos.")
      return
    }
    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden.")
      return
    }

    setLoading(true)
    setMensaje(null)

    try {
      const response = await fetch("http://localhost:8000/usuarios/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nueva_password: password }),
      })

      if (response.ok) {
        setMensaje("Contraseña actualizada correctamente. Redirigiendo al login...")
        setTimeout(() => {
          navigate("/") // o la ruta que tengas para login
        }, 3000)
      } else {
        const data = await response.json()
        setMensaje(data.detail || "Error al actualizar la contraseña.")
      }
    } catch (error) {
      setMensaje("Error de conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const isSuccess = mensaje && mensaje.includes("correctamente")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Restablecer contraseña</h2>
            <p className="text-gray-600 text-sm">Ingresa tu nueva contraseña para completar el proceso</p>
          </div>

          {/* Alert Messages */}
          {mensaje && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-start space-x-3 ${
                isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <p className={`text-sm font-medium ${isSuccess ? "text-green-800" : "text-red-800"}`}>{mensaje}</p>
            </div>
          )}

          {!token ? (
            <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-700 font-medium">No se proporcionó token para restablecer contraseña.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu nueva contraseña"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Fortaleza de contraseña</span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.strength === "strong"
                            ? "text-green-600"
                            : passwordStrength.strength === "medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width:
                            passwordStrength.strength === "strong"
                              ? "100%"
                              : passwordStrength.strength === "medium"
                                ? "66%"
                                : "33%",
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar nueva contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu nueva contraseña"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">Las contraseñas no coinciden</p>
                )}
                {confirmPassword && password === confirmPassword && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Las contraseñas coinciden
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                disabled={loading || !password || !confirmPassword || password !== confirmPassword}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Guardar nueva contraseña</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Recordaste tu contraseña?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Volver al login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

