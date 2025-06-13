import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export function PasswordChangeModal({ isOpen, onClose, onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  })
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const validatePassword = (password) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    }

    setPasswordValidations(validations)
    setIsPasswordValid(Object.values(validations).every(Boolean))

    return validations
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!isPasswordValid) {
      setError("La nueva contraseña no cumple con todos los requisitos")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${API_URL}/auth/change-password`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      if (response.status === 200) {
        onSuccess()
      }
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail)
      } else {
        setError("Error al cambiar la contraseña")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError("")
    setPasswordValidations({
      length: false,
      uppercase: false,
      number: false,
      special: false,
    })
    setIsPasswordValid(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Contraseña</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña Actual</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  const value = e.target.value
                  setNewPassword(value)
                  validatePassword(value)
                }}
                required
                className={newPassword ? (isPasswordValid ? "border-green-500" : "border-amber-500") : ""}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={
                  confirmPassword ? (newPassword === confirmPassword ? "border-green-500" : "border-red-500") : ""
                }
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
            {confirmPassword && (
              <div className={`text-sm mt-1 ${newPassword === confirmPassword ? "text-green-600" : "text-red-500"}`}>
                {newPassword === confirmPassword ? "✓ Las contraseñas coinciden" : "✗ Las contraseñas no coinciden"}
              </div>
            )}
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-md border border-gray-200">
            <p className="text-gray-700 font-medium">La contraseña debe cumplir con:</p>
            <ul className="space-y-1">
              <li className={`flex items-center ${passwordValidations.length ? "text-green-600" : "text-gray-500"}`}>
                <span className={`mr-2 text-xs ${passwordValidations.length ? "text-green-600" : "text-gray-400"}`}>
                  {passwordValidations.length ? "✓" : "○"}
                </span>
                Al menos 8 caracteres
              </li>
              <li className={`flex items-center ${passwordValidations.uppercase ? "text-green-600" : "text-gray-500"}`}>
                <span className={`mr-2 text-xs ${passwordValidations.uppercase ? "text-green-600" : "text-gray-400"}`}>
                  {passwordValidations.uppercase ? "✓" : "○"}
                </span>
                Al menos una letra mayúscula
              </li>
              <li className={`flex items-center ${passwordValidations.number ? "text-green-600" : "text-gray-500"}`}>
                <span className={`mr-2 text-xs ${passwordValidations.number ? "text-green-600" : "text-gray-400"}`}>
                  {passwordValidations.number ? "✓" : "○"}
                </span>
                Al menos un número
              </li>
              <li className={`flex items-center ${passwordValidations.special ? "text-green-600" : "text-gray-500"}`}>
                <span className={`mr-2 text-xs ${passwordValidations.special ? "text-green-600" : "text-gray-400"}`}>
                  {passwordValidations.special ? "✓" : "○"}
                </span>
                Al menos un carácter especial
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !isPasswordValid || newPassword !== confirmPassword}
          >
            {isLoading ? "Cambiando contraseña..." : "Cambiar Contraseña"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
