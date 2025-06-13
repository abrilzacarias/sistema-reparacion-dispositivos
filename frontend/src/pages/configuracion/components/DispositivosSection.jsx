import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, MoreHorizontal, ChevronDown, ChevronRight } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModalFormTemplate from "@/components/organisms/ModalFormTemplate"

export default function DispositivosSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDispositivo, setSelectedDispositivo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedDevices, setExpandedDevices] = useState(new Set())

  const {
    data: dispositivos,
    refetch,
    isLoading,
    isError,
  } = usePaginatedQuery({
    key: "tipo-dispositivo-segun-pregunta",
    endpoint: "tipo-dispositivo-segun-pregunta"
  })

  // Log para ver qué data llega y estados
  console.log("Dispositivos raw:", dispositivos)
  console.log("Loading:", isLoading, "Error:", isError)

  // Agrupar dispositivos por tipo y contar preguntas
  const groupedDispositivos = Array.isArray(dispositivos) 
    ? dispositivos.reduce((acc, item) => {
        const tipoId = item.tipoDispositivo?.idTipoDispositivo || 'unknown'
        const tipoNombre = item.tipoDispositivo?.nombreTipoDispositivo || 'Sin nombre'
        
        if (!acc[tipoId]) {
          acc[tipoId] = {
            tipoDispositivo: item.tipoDispositivo,
            preguntas: [],
            totalPreguntas: 0
          }
        }
        
        if (item.preguntaDiagnostico?.descripcionPreguntaDiagnostico) {
          acc[tipoId].preguntas.push(item.preguntaDiagnostico.descripcionPreguntaDiagnostico)
          acc[tipoId].totalPreguntas++
        }
        
        return acc
      }, {})
    : {}

  // Convertir a array y filtrar
  const filteredDispositivos = Object.entries(groupedDispositivos)
    .map(([tipoId, data]) => ({
      id: tipoId,
      ...data
    }))
    .filter((grupo) => {
      const matchesTipo = grupo.tipoDispositivo?.nombreTipoDispositivo?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPreguntas = grupo.preguntas.some(p => 
        p.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return matchesTipo || matchesPreguntas
    })

  // Log adicional para debugging
  console.log("📊 Dispositivos agrupados:", groupedDispositivos)
  console.log("📊 Dispositivos filtrados:", filteredDispositivos)
  console.log("Search term:", searchTerm)

  const handleEdit = (dispositivo) => {
    console.log("Editar dispositivo:", dispositivo)
    setSelectedDispositivo(dispositivo)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    console.log("Crear nuevo dispositivo")
    setSelectedDispositivo(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (dispositivo) => {
    if (
      confirm(
        `¿Está seguro de eliminar el dispositivo tipo "${dispositivo.tipoDispositivo?.nombreTipoDispositivo}"?`
      )
    ) {
      console.log("Eliminar dispositivo:", dispositivo)
      // Aquí iría la lógica para borrar y luego refetch()
    }
  }

  const toggleExpand = (deviceId) => {
    const newExpanded = new Set(expandedDevices)
    if (newExpanded.has(deviceId)) {
      newExpanded.delete(deviceId)
    } else {
      newExpanded.add(deviceId)
    }
    setExpandedDevices(newExpanded)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar dispositivos..."
            value={searchTerm}
            onChange={(e) => {
              console.log("Buscar:", e.target.value)
              setSearchTerm(e.target.value)
            }}
            className="pl-8"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Dispositivo
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8">
            Cargando dispositivos...
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Error al cargar dispositivos
          </div>
        ) : filteredDispositivos.length === 0 ? (
          <div className="text-center py-8">
            No se encontraron dispositivos
          </div>
        ) : (
          <>
            {/* Header de la tabla */}
            <div className="bg-gray-50 border-b px-6 py-3">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-600 uppercase tracking-wide">
                <div className="col-span-4">Tipo de Dispositivo</div>
                <div className="col-span-6">Preguntas Diagnóstico</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>
            </div>

            {/* Contenido de la tabla */}
            <div className="divide-y">
              {filteredDispositivos.map((grupo) => {
                const isExpanded = expandedDevices.has(grupo.id)
                const preguntasVisibles = isExpanded ? grupo.preguntas : grupo.preguntas.slice(0, 3)
                const preguntasOcultas = grupo.totalPreguntas - preguntasVisibles.length

                console.log("🎯 Renderizando grupo:", grupo)
                
                return (
                  <div key={grupo.id} className="bg-white">
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-12 gap-4 items-start">
                        {/* Tipo de Dispositivo */}
                        <div className="col-span-4">
                          <div className="font-medium text-lg">
                            {grupo.tipoDispositivo?.nombreTipoDispositivo || "Sin nombre"}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            ID: {grupo.tipoDispositivo?.idTipoDispositivo || "N/A"}
                          </div>
                        </div>

                        {/* Preguntas */}
                        <div className="col-span-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                                {grupo.totalPreguntas} {grupo.totalPreguntas === 1 ? 'pregunta' : 'preguntas'}
                              </Badge>
                            </div>
                            
                            {grupo.preguntas.length > 0 ? (
                              <>
                                <ul className="space-y-2">
                                  {preguntasVisibles.map((pregunta, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-700">{pregunta}</span>
                                    </li>
                                  ))}
                                </ul>

                                {preguntasOcultas > 0 && (
                                  <div className="pt-2">
                                    <button
                                      onClick={() => toggleExpand(grupo.id)}
                                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      {isExpanded ? (
                                        <>
                                          <ChevronDown className="h-4 w-4" />
                                          Mostrar menos
                                        </>
                                      ) : (
                                        <>
                                          <ChevronRight className="h-4 w-4" />
                                          ... y {preguntasOcultas} más
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="text-gray-500 italic">
                                No hay preguntas asociadas
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="col-span-2 flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(grupo)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(grupo)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      <ModalFormTemplate
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={selectedDispositivo ? "Editar Dispositivo" : "Crear Dispositivo"}
        description={selectedDispositivo ? "Modifica los datos del dispositivo" : "Completa los datos del nuevo dispositivo"}
      >
        {/* <DispositivoCreateEdit dispositivo={selectedDispositivo} refreshDispositivos={refetch} /> */}
      </ModalFormTemplate>
    </div>
  )
}