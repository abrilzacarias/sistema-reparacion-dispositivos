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

const MultiSelectSearch = ({
  label = "Seleccionar",
  endpoint,
  value = [],
  onChange,
  placeholder = "Seleccione opciones...",
  displayKey,
  valueKey,
}) => {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: itemsData,
    isLoading,
    isError,
    refetch,
  } = usePaginatedQuery({
    key: endpoint,
    endpoint,
    enabled: open,
  })

  const items = Array.isArray(itemsData) ? itemsData : []

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return items.filter((item) =>
      item?.[displayKey]?.toLowerCase().includes(term)
    )
  }, [items, searchTerm, displayKey])

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

  const selectedItems = useMemo(
    () => items.filter((item) => value.includes(item?.[valueKey])),
    [items, value, valueKey]
  )

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between text-left font-normal">
            <span className="truncate flex-1">
              {selectedItems.length > 0
                ? `${selectedItems.length} seleccionad${selectedItems.length !== 1 ? "os" : "o"}`
                : placeholder}
            </span>
            <span className="flex items-center gap-1">
              {selectedItems.length > 0 && (
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
                {value.length} seleccionad{value.length !== 1 ? "os" : "o"}
              </span>
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Buscar ${label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9"
              />
            </div>

            <ScrollArea className="h-[200px] w-full">
              {isLoading ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  Cargando...
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center py-4 space-y-2 text-sm text-red-500">
                  <span>Error al cargar datos</span>
                  <Button variant="outline" size="sm" onClick={refetch}>
                    Reintentar
                  </Button>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  {searchTerm ? "No se encontraron resultados" : "No hay datos disponibles"}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item) => (
                    <div
                      key={item?.[valueKey]}
                      className="flex items-center p-2 rounded-sm hover:bg-accent cursor-pointer space-x-2"
                      onClick={() => handleToggle(item?.[valueKey])}
                    >
                      <Checkbox
                        checked={value.includes(item?.[valueKey])}
                        onChange={() => handleToggle(item?.[valueKey])}
                      />
                      <Label className="flex-1 cursor-pointer text-sm">
                        {item?.[displayKey]}
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
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <Badge
              key={item?.[valueKey]}
              variant="secondary"
              className="text-xs flex items-center gap-1 pr-1 pl-2 py-1"
            >
              <span className="truncate">{item?.[displayKey]}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                  handleRemove(item?.[valueKey])
                }}
                className="ml-1 hover:text-red-800 focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">No hay elementos seleccionados</span>
        )}
      </div>
    </div>
  )
}

export default MultiSelectSearch
