import { OpenContext } from "@/components/organisms/ModalFormTemplate"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { AlertCircle, Layers, Search, X } from "lucide-react"
import { useContext, useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

export default function ModuloEdit({ modulo, funciones, refreshModulos }) {
  const [seleccionadas, setSeleccionadas] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { open, setOpen } = useContext(OpenContext)

  useEffect(() => {
    const idsAsociadas = modulo.funciones.map((f) => f.idfuncionSistema)
    setSeleccionadas(idsAsociadas)
  }, [modulo])

  // Filtrar funciones basado en el término de búsqueda
  const funcionesFiltradas = funciones.filter((func) =>
    func.descripcionFuncionSistema.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleToggle = (id) => {
    setSeleccionadas((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      setIsLoading(true)

      await axios.put(`${API_URL}/modulos-funcion/modulo/${modulo.idmoduloSistema}/funciones`, {
        funciones_ids: seleccionadas,
      })

      refreshModulos()
      setOpen(false)
    } catch (err) {
      console.error(err)
      setError("Error al actualizar funciones del módulo")
    } finally {
      setIsLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  if (!modulo || !Array.isArray(funciones)) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600"></div>
          <Layers className="absolute inset-0 m-auto h-4 w-4 text-blue-600" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Cargando módulo o funciones...</p>
      </div>
    )
  }

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
      <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Editar Módulo: {modulo.descripcionModuloSistema}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-base font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              Funciones asociadas
            </Label>
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {seleccionadas.length} de {funciones.length} seleccionadas
            </span>
          </div>

          {/* Campo de búsqueda */}
          <div className="relative mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="Buscar funciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </button>
            )}
          </div>

          {/* resultados de búsqueda */}
          {searchTerm && (
            <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
              {funcionesFiltradas.length === 0 ? (
                <span className="text-amber-600 dark:text-amber-400">
                  No se encontraron funciones que coincidan con "{searchTerm}"
                </span>
              ) : (
                <span>
                  Mostrando {funcionesFiltradas.length} de {funciones.length} funciones
                </span>
              )}
            </div>
          )}

          <div className="border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <ScrollArea className="h-72 p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {funcionesFiltradas.length === 0 && searchTerm ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">No se encontraron funciones</p>
                    <p className="text-xs">Intenta con otros términos de búsqueda</p>
                  </div>
                ) : (
                  funcionesFiltradas.map((func) => (
                    <label
                      key={func.idfuncionSistema}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                        seleccionadas.includes(func.idfuncionSistema)
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 shadow-sm"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Checkbox
                        checked={seleccionadas.includes(func.idfuncionSistema)}
                        onCheckedChange={() => handleToggle(func.idfuncionSistema)}
                        className="h-4 w-4"
                      />
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {searchTerm ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: func.descripcionFuncionSistema.replace(
                                  new RegExp(`(${searchTerm})`, "gi"),
                                  '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>',
                                ),
                              }}
                            />
                          ) : (
                            func.descripcionFuncionSistema
                          )}
                        </span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end space-x-3 border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"></div>
                <span>Guardando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                Guardar Cambios
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
