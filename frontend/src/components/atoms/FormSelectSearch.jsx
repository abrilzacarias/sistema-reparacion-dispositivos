import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import useFetchAll from "@/hooks/useFetchAll"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"

const FormSelectSearch = ({
  label,
  endpoint,
  queryParams = {},        // parámetros opcionales
  data: externalData,      // datos externos opcionales
  value,
  setValue,
  displayKey = "name",
  valueKey = "id",
  placeholder = "Seleccione una opción...",
}) => {
  // Filtrar queryParams para no enviar valores undefined, null o vacíos
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  )

  // Solo usa el hook si NO se pasan datos externos
  const { data: internalData, loading, error } = useFetchAll(
    endpoint,
    [],
    filteredParams
  )

  // Usa datos externos si se pasaron, si no, datos internos
  const data = externalData ?? internalData

  const [open, setOpen] = useState(false)

  console.log(`[FormSelectSearch] Error:`, error)

  const getValue = (item) =>
    typeof valueKey === "function" ? valueKey(item) : item[valueKey]

  const selectedItem = data?.find(
    (item) => String(getValue(item)) === String(value)
  )

  return (
    <div className="flex gap-2 capitalize flex-col justify-center m-auto">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="flex items-center outline-noney justify-between mx-auto"
          asChild
        >
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full">
            <p className="w-auto text-md">
              {!selectedItem
                ? placeholder
                : typeof displayKey === "function"
                ? displayKey(selectedItem)
                : selectedItem[displayKey]}
            </p>

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
            <CommandList>
              {loading && !externalData ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-full rounded-md" />
                  </div>
                ))
              ) : error && !externalData ? (
                <CommandEmpty>
                  Error al cargar los datos. Por favor, intente nuevamente.
                </CommandEmpty>
              ) : !data?.length ? (
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {data?.map((item) => (
                    <CommandItem
                      key={getValue(item)}
                      value={
                        typeof displayKey === "function"
                          ? displayKey(item)
                          : item[displayKey]
                      }
                      onSelect={() => {
                        if (typeof setValue === "function") {
                          setValue(getValue(item))
                        } else {
                          console.error(
                            "setValue function is not provided to FormSelectSearch"
                          )
                        }
                        setTimeout(() => setOpen(false), 100)
                      }}
                    >
                      {typeof displayKey === "function"
                        ? displayKey(item)
                        : item[displayKey]}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === getValue(item) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default FormSelectSearch
