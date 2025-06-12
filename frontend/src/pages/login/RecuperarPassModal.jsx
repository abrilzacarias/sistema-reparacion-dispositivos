"use client"

import { useState } from "react"
import { Mail, CheckCircle, AlertCircle, Loader2, X } from "lucide-react"

function RecuperarPassModal({ onClose }) {
  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState(null)
  const [tipoMensaje, setTipoMensaje] = useState(null)
  const [loading, setLoading] = useState(false)

  const enviarRecuperacion = async () => {
    if (!email) {
      setMensaje("Por favor, ingresa un correo válido.")
      setTipoMensaje("error")
      return
    }
    setLoading(true)
    setMensaje(null)
    setTipoMensaje(null)

    try {
      const response = await fetch("http://localhost:8000/usuarios/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMensaje("Correo de recuperación enviado. Revisa tu bandeja.")
        setTipoMensaje("exito")
      } else {
        setMensaje("Error al enviar el correo. Intenta nuevamente.")
        setTipoMensaje("error")
      }
    } catch (error) {
      setMensaje("Error de conexión. Intenta nuevamente.")
      setTipoMensaje("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recuperar contraseña</h2>
            <p className="text-gray-600 text-sm">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {mensaje && (
              <div
                className={`p-4 rounded-lg border flex items-start space-x-3 ${
                  tipoMensaje === "exito" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                {tipoMensaje === "exito" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <p className={`text-sm font-medium ${tipoMensaje === "exito" ? "text-green-800" : "text-red-800"}`}>
                  {mensaje}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={enviarRecuperacion}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              disabled={loading || !email.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Enviar enlace</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecuperarPassModal


