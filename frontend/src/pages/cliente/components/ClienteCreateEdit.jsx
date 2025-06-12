"use client"

import { useEffect, useContext, useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { ToastMessageCreate, ToastMessageEdit } from "@/components/atoms/ToastMessage"
import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import ErrorMessage from "@/components/molecules/ErrorMessage"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Loader2, Save, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

const ClienteCreateEdit = ({ cliente, refreshClientes, personaId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      observaciones: cliente?.observaciones || "",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setOpen } = useContext(OpenContext)

  useEffect(() => {
    reset({
      observaciones: cliente?.observaciones || "",
    })
  }, [cliente, reset])

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError("")

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

      if (cliente) {
        // Editar cliente existente
        await axios.put(`${API_URL}/clientes/${cliente.idCliente}`, data)
        ToastMessageEdit()
      } else {
        // Crear nuevo cliente
        await axios.post(`${API_URL}/clientes`, { ...data, idPersona: personaId })
        ToastMessageCreate()
      }

      refreshClientes()
      setOpen(false)
    } catch (error) {
      console.error("Error al guardar cliente:", error)
      console.log("Detalles del error:", error.response?.data)
      setError("Error al guardar el cliente. Por favor intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {cliente ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              Editar información del cliente
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Registrar nuevo cliente
            </>
          )}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label htmlFor="observaciones" className="text-sm font-medium">
                Observaciones
              </Label>
              <div className="mt-1.5">
                <textarea
                  id="observaciones"
                  {...register("observaciones")}
                  placeholder="Ingrese observaciones sobre el cliente..."
                  rows={5}
                  className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all",
                    errors.observaciones ? "border-red-500 focus-visible:ring-red-500" : "",
                  )}
                />
                {errors.observaciones && <ErrorMessage message={errors.observaciones.message} />}
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-2 pb-4 px-6 bg-muted/10">
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading} className="gap-2">
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !isDirty}
            className={cn("gap-2", cliente ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700")}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {cliente ? "Guardar cambios" : "Crear cliente"}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default ClienteCreateEdit



