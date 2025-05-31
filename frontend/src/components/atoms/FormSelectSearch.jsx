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
  value,
  setValue,
  displayKey = "name",
  valueKey = "id",
  placeholder = "Seleccione una opción...",
}) => {
  const { data, loading } = useFetchAll(endpoint)
  const [open, setOpen] = useState(false)

  const selectedItem = data?.find((item) => item[valueKey] === value)

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
              {!selectedItem ? placeholder : selectedItem[displayKey]}
            </p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
            <CommandList>
              {!loading && data?.length === 0 && (
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              )}
              <CommandGroup>
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                  ))
                ) : (
                  data?.map((item) => (
                    <CommandItem
                      key={item[valueKey]}
                      value={item[displayKey]}
                      onSelect={(e) => {
                        setValue(item[valueKey])
                        setTimeout(() => setOpen(false), 100)
                      }}
                    >
                      {item[displayKey]}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item[valueKey]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default FormSelectSearch
