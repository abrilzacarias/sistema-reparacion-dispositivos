import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, X } from "lucide-react"
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery"

const PuestoLaboralMultiSelect = ({ value = [], onChange, placeholder = "Seleccione puestos..." }) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: puestosData,
    isLoading,
    isError,
    refetch,
  } = usePaginatedQuery({
    key: "puestos-laborales",
    endpoint: "puestos-laborales",
    enabled: open,
  })

  const puestos = Array.isArray(puestosData) ? puestosData : []

  const filteredPuestos = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return puestos.filter((p) =>
      p?.nombrepuestoLaboral?.toLowerCase().includes(term)
    )
  }, [puestos, searchTerm])

  const handleToggle = (id) => {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])
  }

  const handleClearAll = (e) => {
    e.stopPropagation()
    onChange([])
  }

  const handleRemove = (id) => {
    onChange(value.filter((v) => v !== id))
  }

  const selectedPuestos = useMemo(
    () => puestos.filter((p) => value.includes(p?.idpuestoLaboral)),
    [puestos, value]
  )

  return (
    <div className="space-y-2">
      <Label htmlFor="multi-select">Puestos Laborales</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="multi-select"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate flex-1">
              {selectedPuestos.length > 0
                ? `${selectedPuestos.length} puesto${selectedPuestos.length !== 1 ? "s" : ""} seleccionado${selectedPuestos.length !== 1 ? "s" : ""}`
                : placeholder}
            </span>
            <span className="flex items-center gap-1">
              {selectedPuestos.length > 0 && (
                <X
                  className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer"
                  onClick={handleClearAll}
                />
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <div className="p-3 space-y-3">
            <div className="text-sm text-muted-foreground flex justify-between">
              <span>
                {value.length} seleccionado{value.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar puestos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9"
              />
            </div>

            <ScrollArea className="h-[200px] w-full">
              {isLoading ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  Cargando puestos...
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center py-4 space-y-2 text-sm text-red-500">
                  <span>Error al cargar puestos</span>
                  <Button variant="outline" size="sm" onClick={refetch}>
                    Reintentar
                  </Button>
                </div>
              ) : filteredPuestos.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  {searchTerm ? "No se encontraron puestos" : "No hay puestos disponibles"}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredPuestos.map((p) => (
                    <div
                      key={p?.idpuestoLaboral}
                      className="flex items-center p-2 rounded-sm hover:bg-accent cursor-pointer space-x-2"
                      onClick={() => handleToggle(p?.idpuestoLaboral)}
                    >
                      <Checkbox
                        checked={value.includes(p?.idpuestoLaboral)}
                        onChange={() => handleToggle(p?.idpuestoLaboral)}
                      />
                      <Label className="flex-1 cursor-pointer text-sm">
                        {p?.nombrepuestoLaboral}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {value.length > 0 && (
              <div className="flex justify-between pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700"
                >
                  Limpiar todo
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Listo
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50 dark:bg-secondary min-h-[40px] items-center">
            {selectedPuestos.length > 0 ? (
                selectedPuestos.map((p) => (
                <Badge
                    key={p.idpuestoLaboral}
                    variant="secondary"
                    className="text-xs flex items-center gap-1 pr-1 pl-2 py-1"
                >
                    <span className="truncate">{p.nombrepuestoLaboral}</span>
                    <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(false)
                        handleRemove(p.idpuestoLaboral)
                    }}
                    className="ml-1 hover:text-red-800 focus:outline-none"
                    >
                    <X className="h-3 w-3" />
                    </button>
                </Badge>
                ))
            ) : (
                <span className="text-xs text-muted-foreground">No hay puestos seleccionados</span>
            )}
            </div>
    </div>
  )
}

export default PuestoLaboralMultiSelect
